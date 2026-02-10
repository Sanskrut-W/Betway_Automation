// import { test, expect, Page, Locator } from '@playwright/test';

// import * as XLSX from 'xlsx';
// import * as fs from 'fs';
// import * as path from 'path';
// import { getLocator } from '../../../../../global/utils/file-utils/locatorResolver';
// import { loadLocatorsFromExcel } from '../../../../../global/utils/file-utils/excelReader';

// // ====================================
// // CONFIGURATION
// // ====================================
// const APP_URL = 'https://new.betway.co.za/sport';
// const USER_MOBILE = '713533467';
// const USER_PASSWORD = '12345';
// const OPENROUTER_API_KEY = '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'

// // Excel source (raw GitHub URL)
// const LOCATOR_URL = "https://github.com/athrvzoz/LocatorFile/raw/refs/heads/main/locatorsDemo.xlsx";
// const SHEET_NAME = "SampleDemoSheet";

// // Collector for healed locators (we persist them in a batch at test end)
// const healedLocators: { key: string; locator: string }[] = [];

// // Small helpers
// function isHttpUrl(u: string) {
//   return /^https?:\/\//i.test(u);
// }

// function guessLocatorType(locatorStr: string) {
//   const s = String(locatorStr).trim();
//   if (/^role=/i.test(s)) return { type: 'role', value: s.replace(/^role=/i, '') };
//   if (/^xpath=/i.test(s)) return { type: 'xpath', value: s.replace(/^xpath=/i, '') };
//   if (/^text=/i.test(s)) return { type: 'text', value: s.replace(/^text=/i, '') };
//   return { type: 'css', value: s };
// }

// // ====================================
// // SELF-HEALING LOCATOR CLASS
// // - findByExcelConfig: when AI heals a locator, record it in healedLocators (no file I/O here)
// class SelfHealingLocator {
//   private page: Page;

//   constructor(page: Page) {
//     this.page = page;
//   }

//   async findByExcelConfig(
//     excelConfig: { key?: string; type?: string; value?: string; options?: any; nth?: number },
//     description: string,
//     context: string,
//     excelSourceUrl: string,
//     sheetName: string,
//     waitTimeout: number = 10000
//   ): Promise<Locator> {
//     // Try primary locator using existing resolver
//     try {
//       const primaryLocator = getLocator(this.page, {
//         key: excelConfig.key,
//         type: excelConfig.type as any,
//         value: excelConfig.value as any,
//         options: excelConfig.options,
//         nth: excelConfig.nth
//       } as any);
//       await primaryLocator.waitFor({ state: 'visible', timeout: waitTimeout });
//       console.log(`✅ Excel locator (key=${excelConfig.key}) found and will be used.`);
//       return primaryLocator;
//     } catch (err) {
//       console.log(`❌ Excel locator (key=${excelConfig.key}) failed to find element. Starting AI healing...`);
//     }

//     // AI Healing
//     const domInfo = await this.extractDOMInfo();
//     const suggested = await this.getAISuggestion(description, context, domInfo);
//     if (!suggested) {
//       throw new Error('AI could not suggest a locator');
//     }

//     // normalize result -> take first meaningful line
//     let locatorStr = suggested.replace(/```/g, '').replace(/`/g, '').replace(/^LOCATOR:\s*/i, '').trim();
//     locatorStr = locatorStr.split('\n')[0].trim();

//     // validate
//     try {
//       const healedLocator = this.page.locator(locatorStr).first();
//       await healedLocator.waitFor({ state: 'visible', timeout: 5000 });
//       console.log(`✅ AI suggestion is valid: ${locatorStr}`);

//       // record healed locator for batch persist at test end
//       const keyToUpdate = excelConfig.key || `ai_${Date.now()}`;
//       healedLocators.push({ key: keyToUpdate, locator: locatorStr });
//       console.log(`🗂️ Recorded healed locator for key='${keyToUpdate}' (will persist at test end).`);

//       return healedLocator;
//     } catch (err) {
//       console.error('❌ AI suggestion did not match any visible element on the page:', locatorStr);
//       throw new Error('AI healing provided a locator but it did not match any visible element.');
//     }
//   }

//   private async extractDOMInfo(): Promise<string> {
//     const domData = await this.page.evaluate(() => {
//       const elements: Array<{
//         tag: string;
//         id: string;
//         class: string;
//         text: string;
//         type: string;
//         name: string;
//         placeholder: string;
//         role: string;
//         ariaLabel: string;
//       }> = [];

//       const selectors = 'button, a, input, select, textarea, [role="button"]';
//       const nodeList = document.querySelectorAll(selectors);

//       nodeList.forEach((el, idx) => {
//         if (idx < 50) {
//           const htmlEl = el as HTMLElement;
//           const inputEl = el as HTMLInputElement;
//           elements.push({
//             tag: htmlEl.tagName.toLowerCase(),
//             id: htmlEl.id || '',
//             class: htmlEl.className || '',
//             text: (htmlEl.innerText || '').substring(0, 100),
//             type: (inputEl && inputEl.type) || '',
//             name: (inputEl && inputEl.name) || '',
//             placeholder: (inputEl && inputEl.placeholder) || '',
//             role: htmlEl.getAttribute('role') || '',
//             ariaLabel: htmlEl.getAttribute('aria-label') || ''
//           });
//         }
//       });

//       return {
//         url: window.location.href,
//         title: document.title,
//         elements: elements
//       };
//     });

//     return JSON.stringify(domData, null, 2);
//   }

//   private async getAISuggestion(description: string, context: string, domInfo: string): Promise<string | null> {
//     const prompt = `You are a Playwright automation expert. Find the best locator for this element.
 
// ELEMENT DESCRIPTION:
// ${description}
 
// CONTEXT:
// ${context}
 
// PAGE DOM:
// ${domInfo}
 
// RULES:
// 1. Return ONLY the locator string, nothing else
// 2. Priority: data-testid > role > placeholder > text > CSS
// 3. Use Playwright syntax like: role=button[name='Login'], input[name='mobile'], button:has-text('Login')
// 4. Must match exactly ONE element
 
// LOCATOR:`;

//     try {
//       const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
//         method: 'POST',
//         headers: {
//           'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
//           'Content-Type': 'application/json',
//           'HTTP-Referer': 'https://playwright-demo',
//           'X-Title': 'Playwright Self-Healing'
//         },
//         body: JSON.stringify({
//           model: 'openai/gpt-4o-mini',
//           messages: [
//             {
//               role: 'system',
//               content: 'You are a Playwright expert. Return only the locator string.'
//             },
//             {
//               role: 'user',
//               content: prompt
//             }
//           ],
//           temperature: 0.3,
//           max_tokens: 150
//         })
//       });

//       if (!response.ok) {
//         const errorText = await response.text();
//         console.error('API error:', errorText);
//         return null;
//       }

//       const data: any = await response.json();
//       let locator = data.choices?.[0]?.message?.content?.trim();
//       if (!locator) return null;

//       // Clean response
//       locator = locator.replace(/```/g, '').replace(/`/g, '').replace(/^LOCATOR:\s*/i, '').trim();

//       return locator;
//     } catch (error: any) {
//       console.error('AI API failed:', error.message || error);
//       return null;
//     }
//   }
// }

// // ====================================
// // TEST
// // ====================================
// test('AI Healing Demo - Replace changed locators in batch at end', async ({ page }) => {
//   test.setTimeout(120000);

//   // Load locators (remote) using your loader
//   const configs = loadLocatorsFromExcel(LOCATOR_URL, SHEET_NAME);

//   // Get excel configs properly (as objects)
//   const excelPasswordConfig = configs['passwordInput'];
//   const excelMobileConfig = configs['mobileInput'];

//   if (!excelPasswordConfig) {
//     throw new Error('passwordInput key not found in Excel sheet');
//   }
//   if (!excelMobileConfig) {
//     throw new Error('mobileInput key not found in Excel sheet');
//   }

//   console.log('\n' + '='.repeat(60));
//   console.log('🎯 AI SELF-HEALING DEMO (batch updates)');
//   console.log('='.repeat(60));

//   await page.goto(APP_URL);
//   await page.waitForTimeout(2000);

//   const healer = new SelfHealingLocator(page);

//   // Try mobile first (use Excel locator)
//   console.log(`\n🔍 Trying mobile locator from Excel (key=mobileInput, type=${excelMobileConfig.type}) ...`);
//   const descriptionMobile = 'Mobile input field where user enters their mobile number, has label "Mobile Number"';
//   const contextMobile = 'Login form, first input field';
//   const mobileInput = await healer.findByExcelConfig(excelMobileConfig, descriptionMobile, contextMobile, LOCATOR_URL, SHEET_NAME, 3000);
//   await mobileInput.fill(USER_MOBILE);
//   console.log('🎉 Mobile number entered (using healed/validated locator).');

//   // Now password (will record any healed locator)
//   console.log(`\n🔍 Trying password locator from Excel (key=passwordInput, type=${excelPasswordConfig.type}) ...`);
//   const description = 'Password input field where user enters their password, has label "Enter Password"';
//   const context = 'Located below the mobile number field in the login form, second input field';

//   const passwordField = await healer.findByExcelConfig(excelPasswordConfig, description, context, LOCATOR_URL, SHEET_NAME, 3000);
//   await passwordField.fill(USER_PASSWORD);
//   await passwordField.press('Enter');

//   console.log('🎉 Password entered and Enter pressed (using healed/validated locator).');
//   await page.waitForTimeout(1500);

//   // --- Batch persist healed locators here ---
//   if (healedLocators.length > 0) {
//     try {
//       const saved = await batchUpdateLocatorsInWorkbook(LOCATOR_URL, SHEET_NAME, healedLocators);
//       console.log('✅ Persisted healed locators to:', saved);
//       console.log('Healed Loc', healedLocators);
//     } catch (err: any) {
//       console.error('❌ Failed to persist healed locators:', err?.message || err);
//     }
//   } else {
//     console.log('ℹ️ No healed locators to persist.');
//   }

//   await page.waitForTimeout(1000);
// });

// // ====================================
// // Batch update function (placed after test as requested)
// // - applies all updates in memory and either writes back to GitHub (if GITHUB_TOKEN + parseable raw URL)
// //   or saves 'locators-updated.xlsx' locally.
// // ====================================
// // Replace the existing batchUpdateLocatorsInWorkbook with this improved version:

// async function batchUpdateLocatorsInWorkbook(
//   source: string,
//   sheetName: string,
//   updates: { key: string; locator: string }[]
// ): Promise<string> {
//   if (!updates || updates.length === 0) {
//     throw new Error('No updates provided');
//   }

//   // Helper: normalize strings for comparison
//   const norm = (s: any) => (s === undefined || s === null) ? '' : String(s).trim().toLowerCase();

//   // helper: read workbook
//   let workbook: XLSX.WorkBook;
//   if (isHttpUrl(source)) {
//     const resp = await fetch(source);
//     if (!resp.ok) {
//       throw new Error(`Failed to download remote locator file: ${resp.status} ${resp.statusText}`);
//     }
//     const buffer = Buffer.from(await resp.arrayBuffer());
//     workbook = XLSX.read(buffer, { type: 'buffer' });
//   } else {
//     if (!fs.existsSync(source)) {
//       throw new Error(`Local locator file not found: ${source}`);
//     }
//     const buffer = fs.readFileSync(source);
//     workbook = XLSX.read(buffer, { type: 'buffer' });
//   }

//   // Read existing rows (or start empty)
//   let rows: any[] = [];
//   if (workbook.Sheets[sheetName]) {
//     rows = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName], { defval: '' }) as any[];
//   }

//   // Determine which property in each row acts as the key (support multiple header names)
//   // We'll create an array of key header names to check for existence
//   const possibleKeyNames = ['key', 'Key', 'KEY', 'locatorKey', 'locator_key', 'name', 'id', 'locator', 'value'];

//   // Build a helper that returns { foundName, foundValue } for a row
//   function findRowKeyAndName(row: any): { foundName?: string; foundValue?: string } {
//     for (const candidate of possibleKeyNames) {
//       if (Object.prototype.hasOwnProperty.call(row, candidate) && row[candidate] !== undefined && row[candidate] !== '') {
//         return { foundName: candidate, foundValue: String(row[candidate]) };
//       }
//     }
//     // If none of the candidate column names exist, try to detect any header that equals 'key' ignoring case
//     for (const header of Object.keys(row)) {
//       if (norm(header) === 'key' && row[header] !== undefined && row[header] !== '') {
//         return { foundName: header, foundValue: String(row[header]) };
//       }
//     }
//     // Last resort: no key found on this row
//     return {};
//   }

//   // Apply updates by matching 'key' robustly
//   updates.forEach(({ key, locator }) => {
//     const keyNormalized = norm(key);
//     let matchedIdx = -1;
//     let matchedKeyName: string | undefined;

//     for (let i = 0; i < rows.length; i++) {
//       const { foundName, foundValue } = findRowKeyAndName(rows[i]);
//       if (foundName && norm(foundValue) === keyNormalized) {
//         matchedIdx = i;
//         matchedKeyName = foundName;
//         break;
//       }
//     }

//     const guessed = guessLocatorType(locator);

//     const updatedRowFragment: any = {
//       // try to set both 'value' and 'locator' columns, and the 'type'
//       type: guessed.type,
//       value: guessed.value,
//       locator: guessed.value,
//       healedAt: new Date().toISOString()
//     };

//     if (matchedIdx >= 0) {
//       // Merge preserving other columns and keep the original key column name/value
//       rows[matchedIdx] = Object.assign({}, rows[matchedIdx], updatedRowFragment);
//       // Ensure the key column still exists with same value (in case header uses a different name)
//       if (matchedKeyName) {
//         rows[matchedIdx][matchedKeyName] = rows[matchedIdx][matchedKeyName] ?? key;
//       }
//     } else {
//       // No match found: append a new row. Use 'key' as column name unless existing sheet uses another key header
//       const appendRow: any = Object.assign({}, updatedRowFragment, { key });
//       // If sheet had rows and a different key header is common, attempt to reuse that header name
//       if (rows.length > 0) {
//         // find the best key header name used in sheet (first row)
//         const firstRowKeyInfo = findRowKeyAndName(rows[0]);
//         if (firstRowKeyInfo.foundName) {
//           appendRow[firstRowKeyInfo.foundName] = key;
//           // remove default 'key' property if it would create duplicate columns
//           delete appendRow.key;
//         }
//       }
//       rows.push(appendRow);
//     }
//   });

//   // Write back to workbook object
//   const newSheet = XLSX.utils.json_to_sheet(rows);
//   workbook.Sheets[sheetName] = newSheet;
//   if (!workbook.SheetNames.includes(sheetName)) {
//     workbook.SheetNames.push(sheetName);
//   }

//   // Serialize workbook
//   const outBuffer = XLSX.write(workbook, { type: 'buffer', bookType: 'xlsx' });

//   // Either push to GitHub or save locally
//   const githubToken = process.env.GITHUB_TOKEN;
//   if (githubToken && isHttpUrl(source)) {
//     // Parse owner/repo/branch/path from raw GitHub URL pattern:
//     const rawPattern = /https:\/\/github\.com\/([^/]+)\/([^/]+)\/raw\/refs\/heads\/([^/]+)\/(.+)$/;
//     const m = String(source).match(rawPattern);
//     if (!m) {
//       const outPath = path.join(process.cwd(), 'locators-updated.xlsx');
//       fs.writeFileSync(outPath, outBuffer);
//       return outPath;
//     }
//     const owner = m[1];
//     const repo = m[2];
//     const branch = m[3];
//     const filePath = m[4];

//     const getUrl = `https://api.github.com/repos/${owner}/${repo}/contents/${filePath}?ref=${branch}`;
//     const getResp = await fetch(getUrl, {
//       headers: {
//         Authorization: `Bearer ${githubToken}`,
//         Accept: 'application/vnd.github.v3+json'
//       }
//     });
//     if (!getResp.ok) {
//       const txt = await getResp.text();
//       throw new Error(`Failed to get current file from GitHub: ${getResp.status} ${txt}`);
//     }
//     const getJson = await getResp.json();
//     const sha = getJson.sha;

//     const putUrl = `https://api.github.com/repos/${owner}/${repo}/contents/${filePath}`;
//     const putBody = {
//       message: `chore: update healed locators (${updates.map(u => u.key).join(', ')})`,
//       content: outBuffer.toString('base64'),
//       sha,
//       branch
//     };

//     const putResp = await fetch(putUrl, {
//       method: 'PUT',
//       headers: {
//         Authorization: `Bearer ${githubToken}`,
//         Accept: 'application/vnd.github.v3+json',
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify(putBody)
//     });

//     if (!putResp.ok) {
//       const txt = await putResp.text();
//       throw new Error(`Failed to update file on GitHub: ${putResp.status} ${txt}`);
//     }
//     const putJson = await putResp.json();
//     console.log('✅ GitHub file updated:', putJson.content?.path);
//     return `github://${owner}/${repo}@${branch}/${filePath}`;
//   } else {
//     const outPath = path.join(process.cwd(), 'locators-updated.xlsx');
//     fs.writeFileSync(outPath, outBuffer);
//     console.log('💾 Saved updated workbook locally:', outPath);
//     return outPath;
//   }
// }