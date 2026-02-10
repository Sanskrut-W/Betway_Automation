// global/utils/locators/excel.ts
import * as XLSX from 'xlsx';
import fetch from 'node-fetch';
import * as fs from 'fs';
import * as os from 'os';
import * as path from 'path';
import { execSync } from 'child_process';
import 'dotenv/config';

export type HealedLocator = {
  key: string;
  locator: string;
  // include any other fields you'd like to write to excel (type, healedAt, etc.)
  type?: string;
  value?: string;
  healedAt?: string;
};

interface GitHubFileData {
  sha: string;
  content?: string;
  encoding?: string;
  // other GitHub file metadata keys omitted
}

function isHttpUrl(u: string) {
  return /^https?:\/\//i.test(u);
}

/**
 * Download a URL to dest synchronously using curl/wget or PowerShell on Windows.
 * This is a simple fallback for environments where streaming/fetch file writes are inconvenient.
 */
function downloadSync(url: string, dest: string) {
  try {
    if (process.platform === 'win32') {
      const safeUrl = url.replace(/'/g, "''");
      execSync(`powershell -NoProfile -Command "Invoke-WebRequest -Uri '${safeUrl}' -OutFile '${dest}' -UseBasicParsing"`, { stdio: 'inherit' });
    } else {
      try {
        execSync(`curl -sSL -o '${dest}' '${url}'`, { stdio: 'inherit' });
      } catch {
        execSync(`wget -qO '${dest}' '${url}'`, { stdio: 'inherit' });
      }
    }
  } catch (err: any) {
    throw new Error(`Failed to download ${url}: ${err?.message ?? String(err)}`);
  }
}

/**
 * Validate that the parsed JSON from GitHub has the shape we expect.
 * Throws helpful errors if not.
 */
function ensureGitHubFileData(obj: unknown): GitHubFileData {
  if (!obj || typeof obj !== 'object') {
    throw new Error('GitHub response is not an object');
  }
  const asAny = obj as any;
  if (!asAny.sha || typeof asAny.sha !== 'string') {
    throw new Error('GitHub response missing "sha" string property');
  }
  return { sha: asAny.sha, content: asAny.content, encoding: asAny.encoding };
}

/**
 * Extract owner/repo/branch/path from a Github raw URL of the form:
 * https://github.com/{owner}/{repo}/raw/{branch}/{path/to/file.xlsx}
 */
function parseGithubRawUrl(rawUrl: string) {
  const m = rawUrl.match(/^https:\/\/github\.com\/([^/]+)\/([^/]+)\/raw\/([^/]+)\/(.+)$/);
  if (!m) throw new Error('Invalid GitHub raw URL. Expected: https://github.com/{owner}/{repo}/raw/{branch}/{path}');
  return {
    owner: m[1],
    repo: m[2],
    branch: m[3],
    filePath: m[4],
  };
}

/**
 * Upload workbook to GitHub using REST API (fetch current SHA, then PUT new content).
 */
async function uploadWorkbookToGitHubFromParsed(
  workbook: XLSX.WorkBook,
  owner: string,
  repo: string,
  filePath: string,
  branch: string,
  githubToken: string
): Promise<string> {
  const apiUrl = `https://api.github.com/repos/${owner}/${repo}/contents/${filePath}?ref=${branch}`;

  // 1) get current file metadata (to fetch sha)
  const getRes = await fetch(apiUrl, {
    headers: {
      Authorization: `Bearer ${githubToken}`,
      Accept: 'application/vnd.github.v3+json',
    },
  });

  if (!getRes.ok) {
    const body = await getRes.text();
    throw new Error(`Failed to fetch file metadata from GitHub: ${getRes.status} ${getRes.statusText} - ${body}`);
  }

  const parsed = await getRes.json();
  const fileData = ensureGitHubFileData(parsed); // validates and narrows type

  // 2) convert workbook -> base64
  const outBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'buffer' });
  const base64Content = outBuffer.toString('base64');

  // 3) PUT updated file
  const commitMessage = `chore: AI Healer - update healed locators (${new Date().toISOString()})`;
  const putRes = await fetch(`https://api.github.com/repos/${owner}/${repo}/contents/${filePath}`, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${githubToken}`,
      Accept: 'application/vnd.github.v3+json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      message: commitMessage,
      content: base64Content,
      sha: fileData.sha,
      branch,
    }),
  });

  if (!putRes.ok) {
    const body = await putRes.text();
    throw new Error(`Failed to PUT updated file to GitHub: ${putRes.status} ${putRes.statusText} - ${body}`);
  }

  const putJson: any = await putRes.json();
  // return a helpful string with commit info if available
  const commitSha = (putJson && putJson.commit && putJson.commit.sha) ? String(putJson.commit.sha) : undefined;
  return `github://${owner}/${repo}/${filePath}@${branch}${commitSha ? `#${commitSha}` : ''}`;
}

/**
 * Main exported function.
 * - excelSource: either a raw GitHub URL or a local file system path
 * - sheetName: sheet to update
 * - updates: array of HealedLocator (objects to be merged into the sheet rows)
 *
 * It returns a string describing where the updated file was saved (github://... or local path).
 */
export async function batchUpdateLocatorsInWorkbook(
  excelSource: string,
  sheetName: string,
  updates: HealedLocator[]
): Promise<string> {
  if (!updates || updates.length === 0) {
    throw new Error('No updates provided');
  }

  const githubToken = process.env.GITHUB_TOKEN;
  let workbook: XLSX.WorkBook | undefined;
  let tmpFilePath: string | undefined;

  try {
    // 1) load workbook (either by download or local read)
    if (isHttpUrl(excelSource)) {
      // try fetch first (preferred)
      try {
        const resp = await fetch(excelSource);
        if (!resp.ok) {
          throw new Error(`Failed to download excel: ${resp.status} ${resp.statusText}`);
        }
        const arrayBuffer = await resp.arrayBuffer();
        workbook = XLSX.read(Buffer.from(arrayBuffer), { type: 'buffer' });
      } catch (err) {
        // fallback to sync download if fetch fails in some environments
        tmpFilePath = path.join(os.tmpdir(), `locators-${Date.now()}.xlsx`);
        downloadSync(excelSource, tmpFilePath);
        workbook = XLSX.readFile(tmpFilePath);
      }
    } else {
      if (!fs.existsSync(excelSource)) {
        throw new Error(`Local locator file not found: ${excelSource}`);
      }
      workbook = XLSX.readFile(excelSource);
    }

    if (!workbook) {
      throw new Error('Failed to load workbook');
    }

    // 2) read sheet (or create empty if not present)
    const existingSheet = workbook.Sheets[sheetName];
    const rows: any[] = existingSheet ? (XLSX.utils.sheet_to_json(existingSheet, { defval: '' }) as any[]) : [];

    // Normalize rows to array of objects
    // We'll match by a 'key' column (case-sensitive). You can adjust to support different column names if needed.
    const findRowIndexByKey = (key: string) => rows.findIndex(r => {
      // support when header names differ: try exact 'key' or fallback to a header named 'Key' or similar
      if (r.key !== undefined) return String(r.key).trim().toLowerCase() === String(key).trim().toLowerCase();
      // check other possible headers
      for (const header of Object.keys(r)) {
        if (header && String(header).trim().toLowerCase() === 'key') {
          return String(r[header]).trim().toLowerCase() === String(key).trim().toLowerCase();
        }
      }
      return false;
    });

    // 3) apply updates (merge or append)
    for (const u of updates) {
      const idx = findRowIndexByKey(u.key);
      const rowFragment: any = {
        // write both helpful fields; it's up to you which columns you want
        type: u.type ?? (u.locator && (/^role=/i.test(u.locator) ? 'role' : (/^xpath=/i.test(u.locator) ? 'xpath' : (/^text=/i.test(u.locator) ? 'text' : 'css')))),
        value: u.value ?? u.locator,
        locator: u.locator,
        healedAt: u.healedAt ?? new Date().toISOString(),
      };

      if (idx >= 0) {
        rows[idx] = { ...rows[idx], ...rowFragment };
      } else {
        // create a new row - try to place it under the same 'key' header if present
        const newRow: any = { key: u.key, ...rowFragment };
        // if existing rows use a differently-cased 'Key' header, adapt:
        if (rows.length > 0) {
          const firstRow = rows[0];
          const keyHeader = Object.keys(firstRow).find(h => String(h).trim().toLowerCase() === 'key');
          if (keyHeader && keyHeader !== 'key') {
            newRow[keyHeader] = newRow.key;
            delete newRow.key;
          }
        }
        rows.push(newRow);
      }
    }

    // 4) write rows back into worksheet & workbook
    const updatedSheet = XLSX.utils.json_to_sheet(rows);
    workbook.Sheets[sheetName] = updatedSheet;
    if (!workbook.SheetNames.includes(sheetName)) workbook.SheetNames.push(sheetName);

    // 5) if source is a GitHub raw URL and token present => upload to GitHub
    if (isHttpUrl(excelSource) && githubToken) {
      // parse owner/repo/filePath/branch
      const { owner, repo, branch, filePath } = parseGithubRawUrl(excelSource);

      const uploadResult = await uploadWorkbookToGitHubFromParsed(workbook, owner, repo, filePath, branch, githubToken);
      return uploadResult;
    }

    // 6) fallback to local write
    const outPath = path.join(process.cwd(), `locators-updated-${Date.now()}.xlsx`);
    const outBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'buffer' });
    fs.writeFileSync(outPath, outBuffer);
    return outPath;
  } finally {
    // cleanup temp file if used
    if (tmpFilePath) {
      try { fs.unlinkSync(tmpFilePath); } catch { /* ignore */ }
    }
  }
}
