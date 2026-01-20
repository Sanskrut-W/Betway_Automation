import { Page } from '@playwright/test';
import { API_URLS, Region } from '../../global/config/OddsApiUrl';

/* =======================
   COMMON HELPER
======================= */

async function waitForOddsApi(page: Page, apiUrl: string) {
    const response = await page.waitForResponse(
        r => r.url().startsWith(apiUrl) && r.status() === 200
    );
    return response.json();
}

function validateRegion(region: Region) {
    if (!API_URLS[region]) {
        throw new Error(`Unsupported region: ${region}`);
    }
}

/* =======================
   1. ODDS SELECTION
======================= */

export async function OddsSelection(
    region: Region,
    numberOflegs: number,
    page: Page
) {
    validateRegion(region);
    await page.reload({ waitUntil: 'domcontentloaded' });

    const data = await waitForOddsApi(
        page,
        API_URLS[region].soccerHighlights
    );

    for (let i = 0; i < numberOflegs; i++) {
        const eventId = data.events?.[i]?.eventId;
        if (!eventId) continue;

        const priceObj = data.prices?.find(
            (p: any) => p.outcomeId === `${eventId}11`
        );
        if (!priceObj) continue;

        await page
            .locator(`//div[@id="${eventId}"]`)
            .locator('div[price]')
            .getByText(`${priceObj.priceDecimal}`, { exact: false })
            .first()
            .click();

        await page.waitForTimeout(1000);
    }
}

/* =======================
   2. PLACE BET WITH INDEX
======================= */

export async function placeBetWithIndex(
    region: Region,
    legNum: number,
    page: Page
) {
    validateRegion(region);
    await page.reload({ waitUntil: 'domcontentloaded' });

    const data = await waitForOddsApi(
        page,
        API_URLS[region].soccerHighlights
    );

    for (let i = legNum; i < 10; i++) {
        const eventId = data.events?.[i]?.eventId;
        if (!eventId) continue;

        const priceObj = data.prices?.find(
            (p: any) => p.outcomeId === `${eventId}11`
        );
        if (!priceObj) continue;

        await page
            .locator(`//div[@id="${eventId}"]`)
            .locator('div[price]')
            .getByText(`${priceObj.priceDecimal}`, { exact: false })
            .first()
            .click();

        await page.waitForTimeout(1000);
        break;
    }
}

/* =======================
   3. ESPORTS ODDS
======================= */

export async function EsportsOddsSelection(
    region: Region,
    numberOflegs: number,
    page: Page
) {
    validateRegion(region);
    await page.reload({ waitUntil: 'domcontentloaded' });

    const data = await waitForOddsApi(
        page,
        API_URLS[region].esports
    );

    for (let i = 1; i < numberOflegs; i++) {
        const eventId = data.events?.[i]?.eventId;
        if (!eventId) continue;

        const priceObj = data.prices?.find(
            (p: any) => p.outcomeId === `${eventId}1864`
        );
        if (!priceObj) continue;

        await page
            .locator(`//div[@id="${eventId}"]`)
            .locator('div[price]')
            .getByText(`${priceObj.priceDecimal}`, { exact: false })
            .first()
            .click();

        await page.waitForTimeout(1000);
    }
}

/* =======================
   4. DRAW NO BET
======================= */

export async function DrawNoBetOddsSelection(
    region: Region,
    numberOflegs: number,
    page: Page
) {
    validateRegion(region);

    await page.locator('#pv_id_3').click();
    await page.getByText('Draw No Bet').last().click();

    const data = await waitForOddsApi(
        page,
        API_URLS[region].soccerHighlights
    );

    for (let i = 0; i < numberOflegs; i++) {
        const eventId = data.events?.[i]?.eventId;
        if (!eventId) continue;

        const priceObj = data.prices?.find(
            (p: any) => p.outcomeId === `${eventId}114`
        );
        if (!priceObj) continue;

        await page
            .locator(`//div[@id="${eventId}"]`)
            .locator('div[price]')
            .getByText(`${priceObj.priceDecimal}`, { exact: false })
            .first()
            .click();

        await page.waitForTimeout(1000);
    }
}

/* =======================
   5. LIVE ODDS
======================= */

export async function LiveOddsSelection(
    region: Region,
    numberOfLegs: number,
    page: Page
) {
    validateRegion(region);
    await page.reload({ waitUntil: 'domcontentloaded' });
    await page.getByRole('img', { name: 'Table Tennis' }).click();

    const data = await waitForOddsApi(
        page,
        API_URLS[region].liveTableTennis
    );

    for (let i = 0; i < numberOfLegs; i++) {
        const eventId = data.events?.[i]?.eventId;
        if (!eventId) continue;

        const priceObj = data.prices?.find(
            (p: any) => p.outcomeId === `${eventId}1864`
        );
        if (!priceObj) continue;

        await page
            .locator(`//div[@id="${eventId}"]`)
            .locator('div[price]')
            .getByText(`${priceObj.priceDecimal}`, { exact: false })
            .first()
            .click();

        await page.waitForTimeout(1000);
    }
}

/* =======================
   6. ODDS SELECTION ABOVE
======================= */

export async function OddsSelectionAbove(
    region: Region,
    numberOflegs: number,
    minOdd: number,
    page: Page
) {
    validateRegion(region);

    // Stabilize page
    await page.reload({ waitUntil: 'domcontentloaded' });

    // Close modal if present
    try {
        await page.locator('#modal-close-btn').click({ timeout: 5000 });
    } catch {
        // ignore if modal not present
    }

    // Ensure Upcoming tab is active
    await page
        .locator('#sports-tabs div')
        .filter({ hasText: 'Upcoming' })
        .click();

    // Wait for Upcoming API
    const data = await waitForOddsApi(
        page,
        API_URLS[region].soccerUpcoming
    );

    let selected = 0;

    for (let i = 0; i < data.events?.length; i++) {
        if (selected >= numberOflegs) break;

        const event = data.events[i];
        if (!event?.eventId || event.isActive === false) continue;

        const priceObj = data.prices?.find(
            (p: any) =>
                p.outcomeId === `${event.eventId}11` &&
                parseFloat(String(p.priceDecimal)) > minOdd
        );

        if (!priceObj) continue;

        const oddLocator = page
            .locator(`//div[@id="${event.eventId}"]`)
            .locator('div[price]')
            .getByText(`${priceObj.priceDecimal}`, { exact: false })
            .first();

        try {
            await oddLocator.waitFor({ state: 'visible', timeout: 10000 });
            await oddLocator.scrollIntoViewIfNeeded();
            await oddLocator.click();
            selected++;
            await page.waitForTimeout(1000);
        } catch {
            continue;
        }
    }

    return selected;
}


