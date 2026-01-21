// npx playwright test src/regions/ZA/tests/modules/bookABet/bookABet.spec.ts --config=playwright.ZA.config.ts --headed
import { expect } from '@playwright/test';
import { test } from '../../../fixtures/MasterFixtureFile';
import path from 'path';

const projectRoot = path.resolve(__dirname, '../../..');
const screenshotDir = path.join(projectRoot, 'screenshots/module/bookABet');

test.describe('BookABet Module Tests', () => {

    // T1: Verify presence of Booking Code (Book A Bet) Section
    test('T1-Verify presence of Booking Code(Book A Bet) Section', async ({ bookABetPage }, testInfo) => {
        await bookABetPage.clickGotIt();
        await bookABetPage.captureScreenshot('gotit', screenshotDir, 'T1-bookabet', testInfo);
    });

    // T2: Verify user able to navigate to Booking Code (Book A Bet) Section
    test('T2-Verify user able to navigate to Booking Code(Book A Bet) Section', async ({ bookABetPage }, testInfo) => {
        await bookABetPage.navigateToBookABetSearch();
        await bookABetPage.captureScreenshot('bookABetSearch', screenshotDir, 'T2b-bookabet', testInfo);
    });

    // T3: Verify Search text box is visible
    test('T3-Verify Search text box is visible on Booking Code(Book A Bet) screen', async ({ bookABetPage }, testInfo) => {
        await bookABetPage.clickGotIt();
        await bookABetPage.navigateToBookABetSearchViaSport();
        await bookABetPage.captureScreenshot('bookABetSearch', screenshotDir, 'T3-bookabet', testInfo);
    });

    // T4: Verify user able to click on Search text box
    test('T4-Verify user able to click on Search text box on Booking Code(Book A Bet) screen', async ({ bookABetPage }, testInfo) => {
        await bookABetPage.navigateToBookABetSearchViaSport(); // Setup to get to the screen
        await bookABetPage.clickSearchTextBox();
        await bookABetPage.captureScreenshot('bookABetSearch', screenshotDir, 'T4-bookabet', testInfo);
    });

    // T5: Verify user able to enter booking code and open betslip
    test('T5-Verify user able to enter booking code in Search text box on Booking Code(Book A Bet) screen', async ({ bookABetPage }, testInfo) => {
        await bookABetPage.navigateToBookABetSearchViaSport(); // Setup
        await bookABetPage.copyBookingCodeFlow(); // Copy code to clipboard
        await bookABetPage.pasteAndSearchBookingCode(); // Paste and search
        await bookABetPage.captureScreenshot('multiBetSlip', screenshotDir, 'T5-bookabet', testInfo);
    });

    // T6: Verify error message when searching without code
    test('T6-Verify when user clicks on Search icon without entering the booking code it should show error message "Booking Code not found"', async ({ bookABetPage }, testInfo) => {
        await bookABetPage.searchWithoutBookingCode();
        await expect(bookABetPage.locatorsRegistry.codeNotFound).toBeVisible();
        await bookABetPage.captureScreenshot('codeNotFound', screenshotDir, 'T6-bookabet', testInfo);
    });

    // T7: Verify "Sort By Odds" dropdown visibility
    test('T7-Verify user able to see "Sort By Odds" dropdown on Booking Code(Book A Bet) screen.', async ({ bookABetPage }, testInfo) => {
        await bookABetPage.navigateToBookABetSearchViaSport(); // Setup
        await expect(bookABetPage.locatorsRegistry.sortByOdds).toBeVisible();
        await bookABetPage.captureScreenshot('sortByOdds', screenshotDir, 'T7-bookabet', testInfo);
    });

    // T8: Verify "Sort By Odds" dropdown options
    test('T8-Verify after clicking on "Sort By Odds" dropdown button user able to see Odds, Win Boost, Outcomes, Bets Taken options in the dropdown', async ({ bookABetPage }, testInfo) => {
        await bookABetPage.openSortByOddsDropdown();
        await bookABetPage.captureScreenshot('sortByOddsDropdown', screenshotDir, 'T8-bookabet', testInfo);
    });

    // T9: Verify Arrow filter button visibility
    test('T9-Verify user able to see Arrow filter button on Booking Code(Book A Bet) screen.', async ({ bookABetPage }, testInfo) => {
        await bookABetPage.navigateToBookABetSearchViaSport(); // Setup
        await expect(bookABetPage.locatorsRegistry.arrowFilter).toBeVisible();
        await bookABetPage.captureScreenshot('arrowFilter', screenshotDir, 'T9-bookabet', testInfo);
    });

    // T10: Verify functionality of Arrow when in UP direction
    test('T10-Verify functionality of Arrow when in UP direction', async ({ bookABetPage }, testInfo) => {
        await bookABetPage.clickArrowFilter();
        await bookABetPage.captureScreenshot('arrowFilterUp', screenshotDir, 'T10-bookabet', testInfo);
    });

    // T11: Verify functionality of Arrow when in DOWN direction
    test('T11-Verify functionality of Arrow when in DOWN direction', async ({ bookABetPage }, testInfo) => {
        await bookABetPage.clickArrowFilter(); // Click 1 (UP)
        await bookABetPage.clickArrowFilter(); // Click 2 (DOWN)
        await bookABetPage.captureScreenshot('arrowFilterDown', screenshotDir, 'T11-bookabet', testInfo);
    });

    // T12: Verify after clicking on "Sort By Odds" dropdown functionality (Duplicate action)
    test('T12-Verify after clicking on "Sort By Odds" dropdown functionality', async ({ bookABetPage }, testInfo) => {
        await bookABetPage.openSortByOddsDropdown();
        await bookABetPage.captureScreenshot('sortByOddsDropdown', screenshotDir, 'T12-bookabet', testInfo);
    });

    // T13: Verify text message is displayed on clicking "i" icon
    test('T13-Verify text message is displayed on clicking "i" icon', async ({ bookABetPage }, testInfo) => {
        await bookABetPage.clickInfoButton();
        await bookABetPage.captureScreenshot('infoButton', screenshotDir, 'T13-bookabet', testInfo);
    });

    // T14: Verify detailed view tabs
    test('T14-Verify user able to see "Booking Code, Outcomes, Odds, Bets Taken, Win Boost" tab on Booking Code(Book A Bet) screen.', async ({ bookABetPage }, testInfo) => {
        await bookABetPage.openDetailedViewTabs();
        await expect(bookABetPage.locatorsRegistry.detailedView).toBeVisible();
        await bookABetPage.captureScreenshot('detailedView', screenshotDir, 'T14-bookabet', testInfo);
    });

    // T15: Verify share icon visibility
    test('T15-Verify user able to see Booking Code with share icon on Booking Code(Book A Bet) result screen.', async ({ bookABetPage }, testInfo) => {
        await bookABetPage.navigateToBookABetSearchViaSport(); // Setup
        await bookABetPage.clickBookingCode();
        await expect(bookABetPage.locatorsRegistry.shareButton).toBeVisible();
        await bookABetPage.captureScreenshot('shareButton', screenshotDir, 'T15-bookabet', testInfo);
    });

    // T16: Verify share pop up window opens
    test('T16-Verify when user click on share option icon it will redirect share pop up window.', async ({ bookABetPage }, testInfo) => {
        await bookABetPage.openSharePopup();
        await bookABetPage.captureScreenshot('sharePopup', screenshotDir, 'T16-bookabet', testInfo);
        await bookABetPage.closePopup();
    });

    // T17: Verify the Booking code pop window display "Share Your Bet" text
    test('T17-Verify the Booking code pop window display "Share Your Bet" text with "Booking code"', async ({ bookABetPage }, testInfo) => {
        await bookABetPage.openSharePopup();
        await expect(bookABetPage.locatorsRegistry.shareyourBet).toBeVisible();
        await bookABetPage.captureScreenshot('shareYourBet', screenshotDir, 'T17-bookabet', testInfo);
        await bookABetPage.closePopup();
    });

    // T18/T19: Verify copy icon message and color change
    test('T18-Verify text message is displayed on clicking copy icon T19-Verify after copied of the booking code it change to green colour.', async ({ bookABetPage }, testInfo) => {
        await bookABetPage.openSharePopup();
        await bookABetPage.clickCopyBookingCode();
        await bookABetPage.captureScreenshot('copyBookingCode', screenshotDir, 'T18,T19-bookabet', testInfo);
        await bookABetPage.closePopup();
    });

    // T20: Verify user able to see Booking Code with share icon on Booking Code (Book A Bet) result screen. (Duplicate action)
    test('T20-Verify user able to see Booking Code with share icon on Booking Code(Book A Bet) result screen.', async ({ bookABetPage }, testInfo) => {
        await bookABetPage.openSharePopup();
        await bookABetPage.takeScreenshot('T20-bookabet', screenshotDir, testInfo);
        await bookABetPage.closePopup();
    });

    // T21, T22, T23, T27: Zoom, Close, and Scanner
    test('T21, T22, T23, T27: Verify zoom in, scanner, and close functionality', async ({ bookABetPage }, testInfo) => {
        await bookABetPage.openSharePopup();
        await expect(bookABetPage.locatorsRegistry.zoomInButton).toBeVisible({ timeout: 5000 });

        // T21 action
        await bookABetPage.zoomIn();
        await bookABetPage.takeScreenshot('T21-bookabet', screenshotDir, testInfo);

        // T27 action
        await bookABetPage.scrollToBottom();
        await bookABetPage.takeScreenshot('T27-bookabet', screenshotDir, testInfo);

        // T22/T23 action
        await expect(bookABetPage.locatorsRegistry.zoomCloseButton).toBeVisible({ timeout: 5000 });
        await bookABetPage.closeZoomPopup();
        await bookABetPage.takeScreenshot('T22,T23-bookabet', screenshotDir, testInfo);
        await bookABetPage.closePopup();
    });

    // T24, T25, T26: Social Media, WhatsApp, Download
    test('T24,25,26-Verify social media, WhatsApp functionality, and Download button', async ({ bookABetPage }, testInfo) => {
        await bookABetPage.openSharePopup();
        await expect(bookABetPage.locatorsRegistry.socialMediaButtons).toBeVisible({ timeout: 5000 });

        // T24 Screenshot
        await bookABetPage.captureScreenshot('socialMediaButtons', screenshotDir, 'T24-bookabet', testInfo);

        // T25 WhatsApp Functionality
        const newPage = await bookABetPage.clickWhatsAppButtonAndGetNewPage();
        await bookABetPage.takeScreenshot('T25-bookabet-whatsapp', screenshotDir, testInfo);
        await newPage.close();

        // T26 Download Functionality
        await expect(bookABetPage.locatorsRegistry.downloadButton).toBeVisible({ timeout: 5000 });
        await bookABetPage.clickDownloadButton();
        await bookABetPage.takeScreenshot('T26-bookabet', screenshotDir, testInfo);

        await bookABetPage.closePopup();
    });

    // T28, T29: Verify close Booking code screen by clicking on cross button (Duplicate flow)
    test('T28,29-Verify user able to close Booking code screen by clicking on cross button .', async ({ bookABetPage }, testInfo) => {
        await bookABetPage.openSharePopup();
        await expect(bookABetPage.locatorsRegistry.zoomInButton).toBeVisible({ timeout: 5000 });
        await bookABetPage.zoomIn();

        // T28 Close Zoom
        await expect(bookABetPage.locatorsRegistry.zoomCloseButton).toBeVisible({ timeout: 5000 });
        await bookABetPage.closeZoomPopup();
        await bookABetPage.takeScreenshot(screenshotDir, 'T28-bookabet', testInfo);

        // T29 Close final popup
        await bookABetPage.closePopup();
        await bookABetPage.takeScreenshot(screenshotDir, 'T29-bookabet', testInfo);
    });

    // T31: Verify on clicking Booking code list of odds is displayed
    test('T31-Verify on clicking Booking code with share icon, Outcomes with number of outcomes, Odds with odds value , Bets taken with number, Win boost with percentage button list of odds is displayed', async ({ bookABetPage }, testInfo) => {
        await bookABetPage.openDetailedViewTabs(); // Setup
        await bookABetPage.clickDetailedView(); // Expand list
        await bookABetPage.takeScreenshot(screenshotDir, 'T31-bookabet', testInfo);
    });

    // T32: Verify presence of Add to Betslip button
    test('T32-Verify presence of Add to Betslip button on Booking Code(Book A Bet) screen.', async ({ bookABetPage }, testInfo) => {
        await bookABetPage.openDetailedViewTabs(); // Setup
        await expect(bookABetPage.locatorsRegistry.addToBetSlip).toBeVisible();
        await bookABetPage.captureScreenshot('addToBetSlip', screenshotDir, 'T32-bookabet', testInfo);
    });

    // T33-T36: Full Bet submission flow
    test('T33,34,35,36-Verify Add to Betslip, Bet Now, My Bets, and Transaction History functionality', async ({ bookABetPage }, testInfo) => {
        // T33: Add to Betslip
        await bookABetPage.clickAddToBetSlip();
        await bookABetPage.takeScreenshot('T33-bookabet', screenshotDir, testInfo);

        // T34: Login and Bet Now
        await bookABetPage.Login();
        await bookABetPage.clickBetNow();
        await bookABetPage.takeScreenshot('T34-bookabet', screenshotDir, testInfo);

        // T35: Verify My Bets
        await bookABetPage.navigateToMyBets();
        await bookABetPage.takeScreenshot('T35-bookabet', screenshotDir, testInfo);

        // T36: Verify Transaction History
        await bookABetPage.navigateToTransactionHistory();
        await bookABetPage.takeScreenshot('T36-bookabet', screenshotDir, testInfo);
        await bookABetPage.closePopup();
    });

    // T37-T38: Dropdowns expand/collapsed functionality, pagination presence and functionality
    test('T37-Verify Dropdowns expand/collapsed functionality,T38-Verify pagination presence and functionality', async ({ bookABetPage }, testInfo) => {
        await bookABetPage.navigateToBookABetSearchViaSport(); // Setup

        // T37: Dropdown
        await bookABetPage.setupDropdownAndPagination();
        await bookABetPage.takeScreenshot('T37-bookabet', screenshotDir, testInfo);

        // T38: Pagination
        await expect(bookABetPage.locatorsRegistry.paginationNextButton).toBeVisible();
        await bookABetPage.clickNextPagination();
        await bookABetPage.takeScreenshot('T38-bookabet', screenshotDir, testInfo);
    });
});
