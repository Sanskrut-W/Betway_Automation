// npx playwright test src/regions/BW/tests/smoke/gamingLobby/gamingLobby.spec.ts --config=playwright.BW.config.ts --headed
import { test } from '../../../fixtures/MasterFixtureFile';
import path from 'path';

const screenshotDir = path.join(path.resolve(__dirname, '../../..'), 'screenshots/module/gamingLobby');

test.describe('GamingLobby Tests', () => {

    // // AVIATOR SECTION (3 tests combined in 1 flow as per your requirement)
    // test('Aviator: T1-T3 Verify Presence, Login Popup, and Game Launch.', async ({ gamingLobbyPage }, testInfo) => {
    //     await gamingLobbyPage.LogOut();
    //     await gamingLobbyPage.waitForAviatorVisibility
    //     await gamingLobbyPage.captureScreenshot('Aviator', screenshotDir, 'T1-Aviator', testInfo);
    //     await gamingLobbyPage.clickAviatorAndWaitForLoginPopup();
    //     await gamingLobbyPage.captureScreenshot('loginInPopup', screenshotDir, 'T2-Aviator', testInfo);
    //     await gamingLobbyPage.loginToAviator();
    //     await gamingLobbyPage.interactWithGameFrame();
    //     await gamingLobbyPage.takeScreenshot(screenshotDir, 'T3-Aviator', testInfo);
    // });

    // // CASINO SECTION (T1 - T8)
    // test('Casino: T1 Presence.', async ({ gamingLobbyPage }, testInfo) => {
    //     await gamingLobbyPage.navigateToVertical('casinoGames');
    //     await gamingLobbyPage.captureScreenshot('casinoGames', screenshotDir, 'T1-Casino', testInfo);
    // });
    // test('Casino: T2 Promotions.', async ({ gamingLobbyPage }, testInfo) => {
    //     await gamingLobbyPage.navigateToVertical('casinoGames');
    //     await gamingLobbyPage.clickVisiblePromotion('promotionsInCasino');
    //     await gamingLobbyPage.takeScreenshot(screenshotDir, 'T2-Casino', testInfo);
    // });
    // test('Casino: T3 Search.', async ({ gamingLobbyPage }, testInfo) => {
    //     await gamingLobbyPage.navigateToVertical('casinoGames');
    //     await gamingLobbyPage.searchGame('hot');
    //     await gamingLobbyPage.captureScreenshot('casinoSearch', screenshotDir, 'T3-Casino', testInfo);
    // });
    // test('Casino: T4 Filter.', async ({ gamingLobbyPage }, testInfo) => {
    //     await gamingLobbyPage.navigateToVertical('casinoGames');
    //     await gamingLobbyPage.selectFilter('mostLikedFilter');
    //     await gamingLobbyPage.takeScreenshot(screenshotDir, 'T4-Casino', testInfo);
    // });
    // test('Casino: T5 Launch Game.', async ({ gamingLobbyPage }, testInfo) => {
    //     await gamingLobbyPage.navigateToVertical('casinoGames');
    //     await gamingLobbyPage.launchGame('gameDiv');
    //     await gamingLobbyPage.takeScreenshot(screenshotDir, 'T5-Casino', testInfo);
    // });
    // test('Casino: T6 Favourite.', async ({ gamingLobbyPage }, testInfo) => {
    //     await gamingLobbyPage.navigateToVertical('casinoGames');
    //     await gamingLobbyPage.toggleFavourite();
    //     await gamingLobbyPage.takeScreenshot(screenshotDir, 'T6-Casino', testInfo);
    // });
    // test('Casino: T7 Play (Logged Out).', async ({ gamingLobbyPage }, testInfo) => {
    //     await gamingLobbyPage.LogOut();
    //     await gamingLobbyPage.navigateToVertical('casinoGames');
    //     await gamingLobbyPage.triggerLoginPopupViaAction('play', 'gameDiv');
    //     await gamingLobbyPage.takeScreenshot(screenshotDir, 'T7-Casino', testInfo);
    // });
    // test('Casino: T8 Favourite (Logged Out).', async ({ gamingLobbyPage }, testInfo) => {
    //     await gamingLobbyPage.LogOut();
    //     await gamingLobbyPage.navigateToVertical('casinoGames');
    //     await gamingLobbyPage.triggerLoginPopupViaAction('favourite', 'gameDiv');
    //     await gamingLobbyPage.takeScreenshot(screenshotDir, 'T8-Casino', testInfo);
    // });

    // BETGAMES SECTION (T1 - T8)
    test('BetGames: T1 Presence.', async ({ gamingLobbyPage }, testInfo) => {
        await gamingLobbyPage.navigateToVertical('betGames');
        await gamingLobbyPage.captureScreenshot('betGames', screenshotDir, 'T1-BetGames', testInfo);
    });
    test('BetGames: T2 Promotions.', async ({ gamingLobbyPage }, testInfo) => {
        await gamingLobbyPage.navigateToVertical('betGames');
        await gamingLobbyPage.clickVisiblePromotion('promotionsInBetGames');
        await gamingLobbyPage.takeScreenshot(screenshotDir, 'T2-BetGames', testInfo);
    });
    test('BetGames: T3 Search.', async ({ gamingLobbyPage }, testInfo) => {
        await gamingLobbyPage.navigateToVertical('betGames');
        await gamingLobbyPage.searchGame('lucky');
        await gamingLobbyPage.captureScreenshot('casinoSearch', screenshotDir, 'T3-BetGames', testInfo);
    });
    test('BetGames: T4 Filter.', async ({ gamingLobbyPage }, testInfo) => {
        await gamingLobbyPage.navigateToVertical('betGames');
        await gamingLobbyPage.selectFilter('betGamesFilter');
        await gamingLobbyPage.takeScreenshot(screenshotDir, 'T4-BetGames', testInfo);
    });
    test('BetGames: T5 Launch.', async ({ gamingLobbyPage }, testInfo) => {
        await gamingLobbyPage.navigateToVertical('betGames');
        await gamingLobbyPage.launchGame('gameDivBetGames');
        await gamingLobbyPage.takeScreenshot(screenshotDir, 'T5-BetGames', testInfo);
    });
    test('BetGames: T6 Favourite.', async ({ gamingLobbyPage }, testInfo) => {
        await gamingLobbyPage.navigateToVertical('betGames');
        await gamingLobbyPage.toggleFavourite();
        await gamingLobbyPage.takeScreenshot(screenshotDir, 'T6-BetGames', testInfo);
    });
    test('BetGames: T7 Play (Logged Out).', async ({ gamingLobbyPage }, testInfo) => {
        await gamingLobbyPage.LogOut();
        await gamingLobbyPage.navigateToVertical('betGames');
        await gamingLobbyPage.triggerLoginPopupViaAction('play', 'gameDivBetGames');
        await gamingLobbyPage.takeScreenshot(screenshotDir, 'T7-BetGames', testInfo);
    });
    test('BetGames: T8 Favourite (Logged Out).', async ({ gamingLobbyPage }, testInfo) => {
        await gamingLobbyPage.LogOut();
        await gamingLobbyPage.navigateToVertical('betGames');
        await gamingLobbyPage.triggerLoginPopupViaAction('favourite', 'gameDivBetGames');
        await gamingLobbyPage.takeScreenshot(screenshotDir, 'T8-BetGames', testInfo);
    });

    // // VIRTUALS SECTION (T1 - T8)
    // test('Virtuals: T1 Presence.', async ({ gamingLobbyPage }, testInfo) => {
    //     await gamingLobbyPage.navigateToVertical('virtuals');
    //     await gamingLobbyPage.captureScreenshot('virtuals', screenshotDir, 'T1-Virtuals', testInfo);
    // });
    // test('Virtuals: T2 Promotions.', async ({ gamingLobbyPage }, testInfo) => {
    //     await gamingLobbyPage.navigateToVertical('virtuals');
    //     await gamingLobbyPage.clickVisiblePromotion('promotionsInVirtuals');
    //     await gamingLobbyPage.takeScreenshot(screenshotDir, 'T2-Virtuals', testInfo);
    // });
    // test('Virtuals: T3 Search.', async ({ gamingLobbyPage }, testInfo) => {
    //     await gamingLobbyPage.navigateToVertical('virtuals');
    //     await gamingLobbyPage.searchGame('soccer');
    //     await gamingLobbyPage.captureScreenshot('casinoSearch', screenshotDir, 'T3-Virtuals', testInfo);
    // });
    // test('Virtuals: T4 Filter.', async ({ gamingLobbyPage }, testInfo) => {
    //     await gamingLobbyPage.navigateToVertical('virtuals');
    //     await gamingLobbyPage.selectFilter('trendingFilter');
    //     await gamingLobbyPage.takeScreenshot(screenshotDir, 'T4-Virtuals', testInfo);
    // });
    // test('Virtuals: T5 Launch.', async ({ gamingLobbyPage }, testInfo) => {
    //     await gamingLobbyPage.navigateToVertical('virtuals');
    //     await gamingLobbyPage.launchGame('gameDivVirtuals');
    //     await gamingLobbyPage.takeScreenshot(screenshotDir, 'T5-Virtuals', testInfo);
    // });
    // test('Virtuals: T6 Favourite.', async ({ gamingLobbyPage }, testInfo) => {
    //     await gamingLobbyPage.navigateToVertical('virtuals');
    //     await gamingLobbyPage.toggleFavourite();
    //     await gamingLobbyPage.takeScreenshot(screenshotDir, 'T6-Virtuals', testInfo);
    // });
    // test('Virtuals: T7 Play (Logged Out).', async ({ gamingLobbyPage }, testInfo) => {
    //     await gamingLobbyPage.LogOut();
    //     await gamingLobbyPage.navigateToVertical('virtuals');
    //     await gamingLobbyPage.triggerLoginPopupViaAction('play', 'gameDivVirtuals');
    //     await gamingLobbyPage.takeScreenshot(screenshotDir, 'T7-Virtuals', testInfo);
    // });
    // test('Virtuals: T8 Favourite (Logged Out).', async ({ gamingLobbyPage }, testInfo) => {
    //     await gamingLobbyPage.LogOut();
    //     await gamingLobbyPage.navigateToVertical('virtuals');
    //     await gamingLobbyPage.triggerLoginPopupViaAction('favourite', 'gameDivVirtuals');
    //     await gamingLobbyPage.takeScreenshot(screenshotDir, 'T8-Virtuals', testInfo);
    // });
});