//  npx playwright test src/regions/ZA/tests/smoke/betSaver/betSaver.spec.ts --config=playwright.ZA.config.ts --headed
import { test } from '../../../fixtures/MasterFixtureFile';
import path from 'path';
 
const projectRoot = path.resolve(__dirname, '../../..');
const screenshotDir = path.join(projectRoot, 'screenshots/module/betSaver');
 
test.describe('BetSaver Module Tests', () => {
 
    // T1: Verify Betsaver not active
    test('T1 - Verify Betsaver not active', async ({ betSaverPage }, testInfo) => {
        await betSaverPage.verifyBetsaverNotActiveForFewSelections();
 
        await betSaverPage.captureScreenshot('betSaverNotActive', screenshotDir, 'T1', testInfo);
        await betSaverPage.deleteBetslipIfVisible();
    });
 // T2-3: Betsaver Popup Flow
    test('T2- Verify the Bet saver offer on betslip when it is active. T3-Verify the click functionality of "i" button and details  when Bet Saver is active', async ({ betSaverPage }, testInfo) => {
       
        await betSaverPage.setupBetsaverActive();
        await betSaverPage.captureScreenshot('betSaverActive', screenshotDir, 'T2', testInfo);
 
        await betSaverPage.openBetsaverInfoPopup();
        await betSaverPage.takeScreenshot(screenshotDir, 'T3', testInfo);
 
    });
 
    // T4-5: Betsaver gray out in My Bets
    test('T4-5 - Betsaver gray out in My Bets', async ({ betSaverPage }, testInfo) => {
        // T4 Upcoming
        await betSaverPage.placeQualifyingBetAndNavigateToMyBets(3);

        // T5 Settled — BetSaver text should NOT be visible in the Detail View (grayed out / non-qualifying)
        await betSaverPage.clickSettledBetsButton();
        await betSaverPage.clickDetailViewButton();
        await betSaverPage.verifyBetSaverTextNotVisibleInDetail();
        await betSaverPage.takeScreenshot(screenshotDir, 'T5', testInfo);
    });

    // T6-9 Betsaver Active in My Bets
    test('T6-9 - Betsaver Active in My Bets', async ({ betSaverPage }, testInfo) => {
        await betSaverPage.placeBetsaverActiveBetAndNavigateToMyBets(8);

        // T6 My Bets (Active)
        // await betSaverPage.captureScreenshot('betSaverInMyBets', screenshotDir, 'T6', testInfo);

        // T7 Detail View — BetSaver text SHOULD be visible
        await betSaverPage.clickDetailViewButton();
        await betSaverPage.verifyBetSaverTextVisibleInDetail();
        await betSaverPage.captureScreenshot('betSaverTextInDetail', screenshotDir, 'T7', testInfo);

        // T8 Settled Bets
        await betSaverPage.clickSettledBetsButton();
        await betSaverPage.captureScreenshot('betSaverTextInDetail', screenshotDir, 'T8', testInfo);

        // T9 Settled Detail View — BetSaver text SHOULD be visible
        await betSaverPage.clickDetailViewButton();
        await betSaverPage.verifyBetSaverTextVisibleInDetail();
        await betSaverPage.captureScreenshot('betSaverTextInDetail', screenshotDir, 'T9', testInfo);
    });
});