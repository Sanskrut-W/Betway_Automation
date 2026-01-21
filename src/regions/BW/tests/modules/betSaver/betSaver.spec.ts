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

    // T2-7: Betsaver Popup Flow
    test('T2-7 - Betsaver Popup Flow', async ({ betSaverPage }, testInfo) => {
        // T2-3 Setup
        await betSaverPage.setupBetsaverActive();
        await betSaverPage.captureScreenshot('betSaverActive', screenshotDir, 'T2-3', testInfo);

        // T4-5 Info Popup
        await betSaverPage.openBetsaverInfoPopup();
        await betSaverPage.takeScreenshot(screenshotDir, 'T4-5', testInfo);

        // T6 Continue
        await betSaverPage.clickContinueInBetsaverInfo();
        await betSaverPage.takeScreenshot(screenshotDir, 'T6', testInfo);

        // T7 Close Popup
        await betSaverPage.openBetsaverInfoPopup();
        await betSaverPage.closePopup();
        await betSaverPage.takeScreenshot(screenshotDir, 'T7', testInfo);

        await betSaverPage.deleteBetslipIfVisible();
    });

    // T8-9: Betsaver gray out in My Bets
    test('T8-9 - Betsaver gray out in My Bets', async ({ betSaverPage }, testInfo) => {
        // T8 Upcoming
        await betSaverPage.placeQualifyingBetAndNavigateToMyBets(3);
        await betSaverPage.captureScreenshot('betSaverInMyBets', screenshotDir, 'T8', testInfo);

        // T9 Settled
        await betSaverPage.clickSettledBetsButton();
        await betSaverPage.captureScreenshot('betSaverInMyBets', screenshotDir, 'T9', testInfo);

        await betSaverPage.closePopup();
    });

    // T10-15: Betsaver Active in My Bets
    test('T10-15 - Betsaver Active in My Bets', async ({ betSaverPage }, testInfo) => {
        await betSaverPage.placeBetsaverActiveBetAndNavigateToMyBets(8);

        // T10 My Bets (Active)
        await betSaverPage.captureScreenshot('betSaverInMyBets', screenshotDir, 'T10', testInfo);

        // T11 Detail View
        await betSaverPage.clickDetailViewButton();
        await betSaverPage.captureScreenshot('detailViewButton', screenshotDir, 'T11', testInfo);

        // T13 Settled Bets
        await betSaverPage.clickSettledBetsButton();
        await betSaverPage.captureScreenshot('betSaverInMyBets', screenshotDir, 'T13', testInfo);

        // T14 Settled Detail View
        await betSaverPage.clickDetailViewButton();
        await betSaverPage.captureScreenshot('detailViewButton', screenshotDir, 'T14', testInfo);

        await betSaverPage.closePopup();
        await betSaverPage.deleteBetslipIfVisible();
    });

    // T19-20: Betsaver not active for Outrights and Mixed Bets
    test('T19-20 - Betsaver not active for Outrights and Mixed Bets', async ({ betSaverPage }, testInfo) => {
        // T19 Outrights
        await betSaverPage.selectOutrightBet();
        await betSaverPage.captureScreenshot('betSaverNotActive', screenshotDir, 'T19', testInfo);

        // T20 Mixed
        await betSaverPage.selectSportBetForMixedSlip();
        await betSaverPage.captureScreenshot('betSaverNotActive', screenshotDir, 'T20', testInfo);

        await betSaverPage.deleteBetslipIfVisible();
    });

    // T21: Betsaver active from Book a Bet
    test('T21 - Betsaver active from Book a Bet', async ({ betSaverPage }, testInfo) => {
        const result = await betSaverPage.loadBetFromBookingCodeAndCheckStatus();
        // 📸 Screenshot based on flow result
        const locatorName = result === 'Active' ? 'betSaverActive' : 'betSaverNotActive';
        await betSaverPage.captureScreenshot(locatorName, screenshotDir, 'T21', testInfo);
        await betSaverPage.deleteBetslipIfVisible();
    });

    // T26-27: Betsaver offer for odds below 1.2
    test('T26-27 - Betsaver offer for odds below 1.2', async ({ betSaverPage }, testInfo) => {
        // T26 Not Active (Low odds + low legs)
        await betSaverPage.selectLowOddsSmartPicks5();
        await betSaverPage.captureScreenshot('betSaverNotActive', screenshotDir, 'T26', testInfo);
        await betSaverPage.deleteBetslipIfVisible();

        // T27 Active (Higher odds + many legs)
        await betSaverPage.selectMediumOddsSmartPicksAndVerifyActive();
        await betSaverPage.captureScreenshot('betSaverActive', screenshotDir, 'T27', testInfo);

        await betSaverPage.openBetsaverInfoPopup();
        await betSaverPage.takeScreenshot(screenshotDir, 'T27-Info', testInfo);
        await betSaverPage.closePopup();
        await betSaverPage.deleteBetslipIfVisible();
    });

    // T28: Betsaver after Confirm Rebet
    test('T28 - Betsaver after Confirm Rebet', async ({ betSaverPage }, testInfo) => {
        await betSaverPage.placeBetWithNewWagerChangeAndCheckMyBets();
        await betSaverPage.captureScreenshot('betSaverInMyBets', screenshotDir, 'T28', testInfo);

        await betSaverPage.closePopup();
        await betSaverPage.deleteBetslipIfVisible();
    });

    // T29: Betsaver after Sharing Booking Code
    test('T29 - Betsaver after Sharing Booking Code', async ({ betSaverPage }, testInfo) => {
        await betSaverPage.shareAndLoadBookingCode();
        await betSaverPage.captureScreenshot('betSaverActive', screenshotDir, 'T29', testInfo);

        await betSaverPage.closePopup();
        await betSaverPage.deleteBetslipIfVisible();
    });

    // T30: Betsaver with Low Odds + Few Legs + High Wager
    test('T30 - Betsaver with Low Odds + Few Legs + High Wager', async ({ betSaverPage }, testInfo) => {
        await betSaverPage.checkBetsaverNotActiveForHighWager();
        await betSaverPage.captureScreenshot('betSaverNotActive', screenshotDir, 'T30', testInfo);
        await betSaverPage.deleteBetslipIfVisible();
    });

    // T31: Betsaver with Low Odds + Few Legs
    test('T31 - Betsaver with Low Odds + Few Legs', async ({ betSaverPage }, testInfo) => {
        await betSaverPage.checkBetsaverNotActiveForLowOddsAndFewLegs();
        await betSaverPage.captureScreenshot('betSaverNotActive', screenshotDir, 'T31', testInfo);
        await betSaverPage.deleteBetslipIfVisible();
    });

    // T32: Betsaver with Low Odds + Many Legs
    test('T32 - Betsaver with Low Odds + Many Legs', async ({ betSaverPage }, testInfo) => {
        await betSaverPage.checkBetsaverActiveForLowOddsAndManyLegs();
        await betSaverPage.captureScreenshot('betSaverActive', screenshotDir, 'T32', testInfo);
        await betSaverPage.deleteBetslipIfVisible();
    });

    // T23: Betsaver with Draw No Bet
    test('T23 - Betsaver with Draw No Bet', async ({ betSaverPage }, testInfo) => {
        await betSaverPage.checkBetsaverNotActiveForDrawNoBet();
        await betSaverPage.captureScreenshot('betSaverNotActive', screenshotDir, 'T23', testInfo);
        await betSaverPage.deleteBetslipIfVisible();
    });

    // T24-25: Betsaver when Bet Slip has multiple markets
    test('T24-25 - Betsaver when Bet Slip has multiple markets', async ({ betSaverPage }, testInfo) => {
        await betSaverPage.checkBetsaverNotActiveForMixedMarkets();
        await betSaverPage.captureScreenshot('betSaverNotActive', screenshotDir, 'T24-25', testInfo);
        await betSaverPage.deleteBetslipIfVisible();
    });

    // T16: Betsaver active for Esports
    test('T16 - Betsaver active for Esports', async ({ betSaverPage }, testInfo) => {
        await betSaverPage.selectEsportsOddsAndVerifyActive();
        await betSaverPage.captureScreenshot('betSaverActive', screenshotDir, 'T16', testInfo);
        await betSaverPage.deleteBetslipIfVisible();
    });

    // T18: Betsaver active for Live Games
    test('T18 - Betsaver active for Live Games', async ({ betSaverPage }, testInfo) => {
        await betSaverPage.selectLiveGameOddsAndVerifyActive();
        await betSaverPage.captureScreenshot('betSaverActive', screenshotDir, 'T18', testInfo);
        await betSaverPage.deleteBetslipIfVisible();
    });
});
