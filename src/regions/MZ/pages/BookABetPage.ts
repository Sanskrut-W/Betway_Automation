import { Page, Locator, expect } from '@playwright/test';
import { loadLocatorsFromExcel } from "../../../global/utils/file-utils/excelReader";
import { getLocator } from "../../../global/utils/file-utils/locatorResolver";
import { highlightElements } from '../../Common-Flows/HighlightElements';
import { ScreenshotHelper } from '../../Common-Flows/ScreenshotHelper';

const userData = require('../json-data/userData.json');
const LOCATOR_URL = "src/global/utils/file-utils/locators(2).xlsx";

export class BookABetPage {

    readonly locatorsRegistry: Record<string, Locator>;
    readonly page: Page;
    private readonly TEST_MOBILE_NUMBER = '964079720';
    private readonly TEST_PASSWORD = '12345';
    private locators: Record<string, Locator>;

    constructor(page: Page) {
        this.page = page;

        // Load all locators for the BookABet sheet
        const configs = loadLocatorsFromExcel(LOCATOR_URL, "BookABetPage");

        this.locatorsRegistry = {
            mobileNumber: getLocator(this.page, configs['mobileNumber']),
            password: getLocator(this.page, configs['password']),
            loginButton: getLocator(this.page, configs['loginButton']),
            // ... (All other locators remain as defined)
            bookABet: getLocator(this.page, configs['bookABet']),
            bookABetSearch: getLocator(this.page, configs['bookABetSearch']),
            bookABetSearchIcon: getLocator(this.page, configs['bookABetSearchIcon']),

            sortByOdds: getLocator(this.page, configs['sortByOdds']),
            arrowFilter: getLocator(this.page, configs['arrowFilter']),

            sportButton: getLocator(this.page, configs['sportButton']),
            shareButton: getLocator(this.page, configs['shareButton']),
            copyBookingCode: getLocator(this.page, configs['copyBookingCode']),

            zoomInButton: getLocator(this.page, configs['zoomInButton']),
            zoomCloseButton: getLocator(this.page, configs['zoomCloseButton']),

            detailedView: getLocator(this.page, configs['detailedView']),
            addToBetSlip: getLocator(this.page, configs['addToBetSlip']),

            multiBetSlip: getLocator(this.page, configs['multiBetSlip']),
            singleBetSlip: getLocator(this.page, configs['singleBetSlip']),
            betNowButton: getLocator(this.page, configs['betNowButton']),

            myBetsButton: getLocator(this.page, configs['myBetsButton']),
            transactionHistoryButton: getLocator(this.page, configs['transactionHistoryButton']),

            paginationNextButton: getLocator(this.page, configs['paginationNextButton']),
            infoButton: getLocator(this.page, configs['infoButton']),
            whatsAppButton: getLocator(this.page, configs['whatsAppButton']),
            telegramButton: getLocator(this.page, configs['telegramButton']),
            downloadButton: getLocator(this.page, configs['downloadButton']),

            codeNotFound: getLocator(this.page, configs['codeNotFound']),
            sortByOddsDD: getLocator(this.page, configs['sortByOddsDD']),

            shareyourBet: getLocator(this.page, configs['shareyourBet']),
            gotit: getLocator(this.page, configs['gotit']),
            closePopup: getLocator(this.page, configs['closePopup']),
            betslipDeleteButton: getLocator(this.page, configs['betslipDeleteButton']),
            socialMediaButtons: getLocator(this.page, configs['socialMediaButtons'])
        };
        this.locators = this.locatorsRegistry;
    }

    // --- Screenshot Utility Methods (MUST be kept here to use 'this.page' and 'this.locatorsRegistry') ---

    async captureScreenshot(locatorName: string, screenshotDir: string, fileName: string, testInfo: any) {
        const locator = this.locatorsRegistry[locatorName];
        await highlightElements(locator);
        await ScreenshotHelper(this.page, screenshotDir, fileName, testInfo);
    }
    async takeScreenshot(fileName: string, screenshotDir: string, testInfo: any) {
        await ScreenshotHelper(this.page, screenshotDir, fileName, testInfo);
    }

    // --- Core Navigation Methods ---

    async goto() {
        await this.page.goto('https://en.betway.co.mz/sport/soccer');
        await this.page.waitForLoadState('domcontentloaded');
    }

    async closePopup() {
        const closeButton = this.locatorsRegistry.closePopup;
        if (await closeButton.isVisible({ timeout: 1000 })) {
            await closeButton.click();
            await this.page.waitForTimeout(500);
        }
    }

    async Login() {
        // T33/T34 Login details
        await this.locatorsRegistry.mobileNumber.fill(userData.user4.mobile);
        await this.locatorsRegistry.password.fill(userData.user4.password);
        await this.locatorsRegistry.loginButton.click();
        // await this.locatorsRegistry.closePopup.waitFor({ state: 'visible', timeout: 30000 });
        // await this.locatorsRegistry.closePopup.click();
        await this.page.waitForTimeout(1000);
    }

    async clickGotIt() {
        await this.locatorsRegistry.gotit.click();
        await this.page.waitForTimeout(1000);
    }

    async clickSportButton() {
        await this.locatorsRegistry.sportButton.click();
        await this.page.waitForTimeout(500);
    }

    async clickBookingCode() {
        await this.locatorsRegistry.bookABet.click();
        await this.page.waitForTimeout(500);
    }

    // --- POM Methods (Only perform actions and return control) ---

    // T2: Navigate to Book A Bet Search
    async navigateToBookABetSearch() {
        await this.clickGotIt();
        await this.clickBookingCode();
        await this.page.waitForTimeout(1000);
    }

    // T3: Verify Search box visibility setup
    async navigateToBookABetSearchViaSport() {
        await this.locatorsRegistry.sportButton.click();
        await this.clickBookingCode();
    }

    // T4: Click Search text box
    async clickSearchTextBox() {
        await this.locatorsRegistry.bookABetSearch.click();
        await this.page.waitForTimeout(2000);
    }

    // T5: Enter booking code via clipboard (T5 Setup)
    async copyBookingCodeFlow() {
        await this.locatorsRegistry.shareButton.click();
        await this.page.waitForTimeout(1000);
        await this.locatorsRegistry.copyBookingCode.click();
        await this.page.waitForTimeout(1000);
        await this.closePopup();
        await this.page.waitForTimeout(1000);
    }

    // T5: Enter booking code via clipboard (T5 Action)
    async pasteAndSearchBookingCode() {
        await this.locatorsRegistry.bookABetSearch.click();
        await this.locatorsRegistry.bookABetSearch.fill(''); // Clear any existing value
        await this.page.keyboard.press('Control+V'); // Paste clipboard content
        await this.locatorsRegistry.bookABetSearchIcon.click();
        await this.locatorsRegistry.multiBetSlip.click();
        await this.page.waitForTimeout(2000);
    }

    // T6: Search without code
    async searchWithoutBookingCode() {
        await this.locatorsRegistry.sportButton.click();
        await this.clickBookingCode();
        await this.locatorsRegistry.bookABetSearchIcon.click();
        await this.page.waitForTimeout(3000);
        // Do not assert here, let the spec file handle the assertion
    }

    // T8/T12: Open Sort By Odds dropdown
    async openSortByOddsDropdown() {
        await this.locatorsRegistry.sportButton.click();
        await this.clickBookingCode();
        await this.locatorsRegistry.sortByOdds.click();
        await this.page.waitForTimeout(1000);
    }

    // T10/T11: Click Arrow Filter
    async clickArrowFilter() {
        await this.locatorsRegistry.sportButton.click();
        await this.clickBookingCode();
        await this.locatorsRegistry.arrowFilter.click();
        await this.page.waitForTimeout(1000);
    }

    // T13: Click Info Button
    async clickInfoButton() {
        await this.locatorsRegistry.sportButton.click();
        await this.clickBookingCode();
        await this.locatorsRegistry.infoButton.click();
        await this.page.waitForTimeout(1000);
    }

    // T14: Detailed View Tabs setup
    async openDetailedViewTabs() {
        await this.locatorsRegistry.sportButton.click();
        await this.clickBookingCode();
        await this.page.waitForTimeout(2000);
        // Do not assert, let the spec file do it
        await this.page.waitForTimeout(2000);
    }

    // T15-T20: Share flow setup
    async openSharePopup() {
        await this.locatorsRegistry.sportButton.click();
        await this.clickBookingCode();
        await this.locatorsRegistry.shareButton.click();
        await this.page.waitForTimeout(1000);
    }

    // T18/T19: Copy Booking Code
    async clickCopyBookingCode() {
        await this.locatorsRegistry.copyBookingCode.click();
        await this.page.waitForTimeout(1000);
    }

    // T21: Zoom in and setup for T27 scanner
    async zoomIn() {
        await this.locatorsRegistry.zoomInButton.click();
        await this.page.waitForTimeout(1000);
    }

    // T27: Scroll down to scanner
    async scrollToBottom() {
        await this.page.evaluate(() => {
            const container = document.querySelector('[role="dialog"]');
            if (container) {
                container.scrollTo({ top: container.scrollHeight, behavior: 'smooth' });
            } else {
                window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
            }
        });
        await this.page.waitForTimeout(1000);
    }

    // T22/T28: Close Zoom Popup
    async closeZoomPopup() {
        await this.locatorsRegistry.zoomCloseButton.click();
        await this.page.waitForTimeout(1000);
    }

    // T25: Click WhatsApp button
    async clickWhatsAppButtonAndGetNewPage() {
        const [newPage] = await Promise.all([
            this.page.context().waitForEvent('page'),
            this.locatorsRegistry.whatsAppButton.click(),
        ]);
        await newPage.waitForLoadState('domcontentloaded');
        return newPage;
    }

    // T26: Click Download
    async clickDownloadButton() {
        await this.locatorsRegistry.downloadButton.click();
        await this.page.waitForTimeout(1000);
    }

    // T31: Click detailed view to expand list
    async clickDetailedView() {
        await this.locatorsRegistry.detailedView.click();
        await this.page.waitForTimeout(2000);
    }

    // T33-T36: Bet Submission Flow actions
    async clickAddToBetSlip() {
        await this.locatorsRegistry.addToBetSlip.click();
        await this.locatorsRegistry.multiBetSlip.click();
        await this.page.waitForTimeout(1000);
    }

    async clickBetNow() {
        await this.locatorsRegistry.betNowButton.click();
        await this.page.waitForTimeout(1000);
    }

    async navigateToMyBets() {
        await this.locatorsRegistry.myBetsButton.click();
        await this.page.waitForTimeout(1000);
    }

    async navigateToTransactionHistory() {
        await this.locatorsRegistry.transactionHistoryButton.click();
        await this.page.waitForTimeout(1000);
    }

    // T37/T38: Click Dropdown and Pagination
    async setupDropdownAndPagination() {
        await this.locatorsRegistry.detailedView.click(); // Expand dropdown
        await this.page.waitForTimeout(1000);
    }

    async clickNextPagination() {
        await this.locatorsRegistry.paginationNextButton.click();
        await this.page.evaluate(() => {
            window.scrollBy({ top: -150, behavior: 'smooth' });
        });
        await this.page.waitForTimeout(6000);
    }
}