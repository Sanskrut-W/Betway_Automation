import { test } from '../../../fixtures/MasterFixtureFile';
import { expect } from '@playwright/test';
import path from 'path';
import { highlightElementBorder, highlightElements } from '../../../../Common-Flows/HighlightElements';
import { ScreenshotHelper } from '../../../../Common-Flows/ScreenshotHelper';
import { storeAllBookingCode, getFirstBookingCode, getLastBookingCode } from '../../../commonflows/storeAllBookingCode';


const userData = require('../../../json-data/userData.json');
const projectRoot = path.resolve(__dirname, '../../..');
const screenshotDir = path.join(projectRoot, 'screenshots/module/betInfluencer');
//14,15,25,26,29,31,19
test.describe('BetInfluencer Tests', () => {

    test("Get all booking Codes for account", async ({ betinfluencerModal }, testInfo) => {
        await storeAllBookingCode(betinfluencerModal);
    })
    test("T1-", async ({ betinfluencerModal }, testInfo) => {
        await betinfluencerModal.verifyPresenceofBetInfluencerinHamburgerMenu();
        await ScreenshotHelper(betinfluencerModal.page, screenshotDir, 'T1-Bet Influencer', testInfo);
    });

    test('NewT2-Verify presence of "Bet influencer" option in Hamburger menu on Account pop up window from My Bet.', async ({ betinfluencerModal }, testInfo) => {
        await betinfluencerModal.verifyBetInfluencerFromAccountPopup(userData.user1.mobile);
        await ScreenshotHelper(betinfluencerModal.page, screenshotDir, 'New-T2-Bet Influencer presence in My Bets', testInfo);
    });

    test('T2-Summary page presence', async ({ betinfluencerModal }, testInfo) => {
        await betinfluencerModal.gotoBetInfluencerModal();
        await expect(betinfluencerModal.page.getByRole('button', { name: 'Summary' })).toBeVisible();
        await highlightElements(betinfluencerModal.page.getByRole('button', { name: 'Summary' }));
        await ScreenshotHelper(betinfluencerModal.page, screenshotDir, 'T2-Summary page presence', testInfo);
    });

    test('T3-Details page presence', async ({ betinfluencerModal }, testInfo) => {
        await betinfluencerModal.gotoBetInfluencerModal();
        await highlightElements(betinfluencerModal.BetInfluencerModalLocatorRegistry.detailButton);
        await ScreenshotHelper(betinfluencerModal.page, screenshotDir, 'T3-Details page presence', testInfo);
        await expect(betinfluencerModal.BetInfluencerModalLocatorRegistry.detailButton).toBeVisible();
    });

    test('T4 - Verify the Functionality and content of "Details" page inside the Bet influencer option from Hamburger menu.', async ({ betinfluencerModal }, testInfo) => {
        await betinfluencerModal.gotoBetInfluencerModal();
        await betinfluencerModal.clickDetailButton();
        await highlightElements(betinfluencerModal.BetInfluencerModalLocatorRegistry.detailButton);
        await ScreenshotHelper(betinfluencerModal.page, screenshotDir, 'T4-Details page content', testInfo);
    });

    test('New-T5-Verify functionality of "Revenue" on Summary page', async ({ betinfluencerModal }, testInfo) => {
        await betinfluencerModal.gotoBetInfluencerModal();
        await highlightElements(betinfluencerModal.BetInfluencerModalLocatorRegistry.revenue);
        await ScreenshotHelper(betinfluencerModal.page, screenshotDir, 'New-T5-Revenue presence', testInfo);
    });
    // test('New-T6/T7-Verify graphical representational data for  "Number of codes" inside summary section./Verify graphical representational data for  "Total Bets taken" inside summary section.',async({ betinfluencerModal }, testInfo) => {
    //     await betinfluencerModal.gotoBetInfluencerModal();
    //     await highlightElements(betinfluencerModal.revenueGraph);
    //     await ScreenshotHelper(betinfluencerModal.page, screenshotDir, 'New-T6-T7-Graphical representation', testInfo);
    // });
    test('T5-Go to Detailed Breakdown', async ({ betinfluencerModal }, testInfo) => {
        await betinfluencerModal.gotoBetInfluencerModal();
        await betinfluencerModal.verifyAndClickDetailedBreakdown();
        await expect(betinfluencerModal.BetInfluencerModalLocatorRegistry.codesUsed).toBeVisible();
        await highlightElements(betinfluencerModal.BetInfluencerModalLocatorRegistry.codesUsed);
        await ScreenshotHelper(betinfluencerModal.page, screenshotDir, 'T5-Detailed Breakdown page after Click', testInfo);
    });

    // test('T6-Verify functionality of Month dropdown on Details page inside bet influencer from Hamburger menu.', async ({ betinfluencerModal }, testInfo) => {
    //     await betinfluencerModal.gotoBetInfluencerModal();
    //     await betinfluencerModal.clickDetailButton();
    //     await highlightElements(betinfluencerModal.BetInfluencerModalLocatorRegistry.monthsSelector);
    //     await highlightElements(betinfluencerModal.BetInfluencerModalLocatorRegistry.totalMonthlyRevenue);
    //     await ScreenshotHelper(betinfluencerModal.page, screenshotDir, 'T6-Month dropdown before click', testInfo);
    //     await betinfluencerModal.BetInfluencerModalLocatorRegistry.monthsSelector.click();
    //     await betinfluencerModal.page.keyboard.press('ArrowUp');
    //     await betinfluencerModal.page.keyboard.press('Enter');
    //     await betinfluencerModal.page.waitForTimeout(2000);
    //     await highlightElements(betinfluencerModal.BetInfluencerModalLocatorRegistry.monthsSelector);
    //     await highlightElements(betinfluencerModal.BetInfluencerModalLocatorRegistry.totalMonthlyRevenue);
    //     await ScreenshotHelper(betinfluencerModal.page, screenshotDir, 'T6-Month dropdown after click', testInfo);
    // });

    test('T7/New T-18/T19/T20 - Verify functionality of sort by dropdown on Details page inside bet influencer from Hamburger menu.', async ({ betinfluencerModal }, testInfo) => {
        await betinfluencerModal.gotoDetailSectionBetInfluencerModal();
        await betinfluencerModal.sortByDropDownFunctionalityChacek(screenshotDir, testInfo);
    });

    test('T8- Verify presence of Total Monthly Revenue on Details page inside bet influencer from Hamburger menu.', async ({ betinfluencerModal }, testInfo) => {
        await betinfluencerModal.gotoDetailSectionBetInfluencerModal();
        await expect(betinfluencerModal.BetInfluencerModalLocatorRegistry.totalMonthlyRevenue).toBeVisible();
        await highlightElements(betinfluencerModal.BetInfluencerModalLocatorRegistry.totalMonthlyRevenue);
        await ScreenshotHelper(betinfluencerModal.page, screenshotDir, 'T8-Total Monthly Revenue presence', testInfo);
    });

    test('T9-Verify Bets Taken inside Details page inside bet influencer from Hamburger menu.', async ({ betinfluencerModal }, testInfo) => {
        await betinfluencerModal.gotoDetailSectionBetInfluencerModal();
        await expect(betinfluencerModal.BetInfluencerModalLocatorRegistry.betsTaken).toBeVisible();
        await highlightElements(betinfluencerModal.BetInfluencerModalLocatorRegistry.betsTaken);
        await ScreenshotHelper(betinfluencerModal.page, screenshotDir, 'T9-Bets Taken Number', testInfo);
    });

    test('T10-Verify Codes Used inside Details page inside bet influencer from Hamburger menu.', async ({ betinfluencerModal }, testInfo) => {
        await betinfluencerModal.gotoDetailSectionBetInfluencerModal();
        await expect(betinfluencerModal.BetInfluencerModalLocatorRegistry.codesUsed).toBeVisible();
        await highlightElements(betinfluencerModal.BetInfluencerModalLocatorRegistry.codesUsed);
        await ScreenshotHelper(betinfluencerModal.page, screenshotDir, 'T10-Codes Used Number', testInfo);
    });

    test('T11/T12-Verify functionality of Sort Button on Details page inside bet influencer from Hamburger menu.', async ({ betinfluencerModal }, testInfo) => {
        await betinfluencerModal.gotoDetailSectionBetInfluencerModal();
        await highlightElements(betinfluencerModal.BetInfluencerModalLocatorRegistry.sortBySelector.locator('..').locator('..').getByRole('button').last());
        await ScreenshotHelper(betinfluencerModal.page, screenshotDir, 'T11-Sort Button after click', testInfo);
        await betinfluencerModal.BetInfluencerModalLocatorRegistry.sortBySelector.locator('..').locator('..').getByRole('button').last().click();
        await betinfluencerModal.page.waitForTimeout(2000);
        await ScreenshotHelper(betinfluencerModal.page, screenshotDir, 'T11-Sort Button after click', testInfo);
    });

    test('New-T11-Verify correct graphical representation of  "Last Four weeks" data .', async ({ betinfluencerModal }, testInfo) => {
        await betinfluencerModal.gotoBetInfluencerModal();
        await highlightElements(betinfluencerModal.BetInfluencerModalLocatorRegistry.lastFourWeeksCanvas);
        await ScreenshotHelper(betinfluencerModal.page, screenshotDir, 'New-T11-Last Four Weeks', testInfo);
    });

    test('New T21-Verify count of "Results"  on Detail section inside Bet influencer', async ({ betinfluencerModal }, testInfo) => {
        await betinfluencerModal.gotoDetailSectionBetInfluencerModal();
        await highlightElements(betinfluencerModal.page.getByText('Results').nth(0).locator('..'));
        await ScreenshotHelper(betinfluencerModal.page, screenshotDir, 'New-T21-Results count', testInfo);
    });
    test('New T21-Verify contents and UI of the "Result Section" on Details section inside Bet Influencer', async ({ betinfluencerModal }, testInfo) => {
        await betinfluencerModal.gotoDetailSectionBetInfluencerModal();
        await highlightElements(betinfluencerModal.page.getByText('Usage').nth(0).locator('..'));
        await ScreenshotHelper(betinfluencerModal.page, screenshotDir, 'New-T21-Results count', testInfo);
    });

    test('New T25-Verify "Booking code" Dropdown functionality on Details page inside Bet Influencer.', async ({ betinfluencerModal }, testInfo) => {
        await betinfluencerModal.gotoDetailSectionBetInfluencerModal();
        await betinfluencerModal.verifyBookingCodeDropDown();
        await ScreenshotHelper(betinfluencerModal.page, screenshotDir, 'New-T25-Booking code dropdown before click', testInfo);
    });


    test('T13-Verify Previous/Next button functionality on Details page inside bet influencer from Hamburger menu.', async ({ betinfluencerModal }, testInfo) => {
        await betinfluencerModal.gotoDetailSectionBetInfluencerModal();
        await betinfluencerModal.verifyNextButton(screenshotDir, testInfo);
        const activeTag = await betinfluencerModal.verifyNextButtonFunctionality();
        if (!activeTag) {
            await expect(betinfluencerModal.BetInfluencerModalLocatorRegistry.previousButton).toContainClass('active');
        }
        await betinfluencerModal.verifyPreviousButton(screenshotDir, testInfo);
    });

    test('T17 - Verify influencer is getting payout if  influencer place a bet with 5 legs.', async ({ betinfluencerModal }, testInfo) => {
        const bookingCode = await betinfluencerModal.User1PlaceBets(6);
        const SharedBookingCode = await betinfluencerModal.User2PlaceBetsFromBookingCode(bookingCode);
        await betinfluencerModal.page.reload();
        await storeAllBookingCode(betinfluencerModal);
        console.log("SharedBookingCode in T17:", getLastBookingCode());
        await highlightElementBorder(betinfluencerModal.page.getByText(`${SharedBookingCode}`).first());
        await ScreenshotHelper(betinfluencerModal.page, screenshotDir, 'T17-Influencer Payout', testInfo)
    });
})


// npx playwright test src/regions/ZA/tests/modules/betInfluencer/betInfluencer.spec.ts --config=playwright.ZA.config.ts --headed