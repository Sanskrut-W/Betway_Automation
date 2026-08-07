import { Page, Locator } from '@playwright/test';
import { loadLocatorsFromExcel } from "../../../global/utils/file-utils/excelReader";
import { getLocator } from "../../../global/utils/file-utils/locatorResolver";
import { highlightElements } from '../../Common-Flows/HighlightElements';
import { ScreenshotHelper } from '../../Common-Flows/ScreenshotHelper';
import { OddsSelection } from '../../Common-Flows/OddSelection';
import { OddsSelectionAbove } from '../commonflows/OddSelection';
import { BasePage } from './BasePage';

const userData = require('../json-data/userData.json');
const LOCATOR_URL = "src/global/utils/file-utils/locators(2).xlsx";

export class TransactionHistoryPage extends BasePage {

    readonly locatorsRegistry: Record<string, Locator>;
    // New Private Property to store the specific ID for testing
    private readonly TEST_TRANSACTION_ID = "12345678";

    constructor(page: Page) {
        super(page);

        // Load all locators for the TransactionHistory sheet
        const configs = loadLocatorsFromExcel(LOCATOR_URL, "TransactionHistoryPage");

        this.locatorsRegistry = {
            hamburgerBtn: getLocator(this.page, configs['hamburgerBtn']),
            transactionHistoryButton: getLocator(this.page, configs['transactionHistoryButton']),

            allBtn: getLocator(this.page, configs['allBtn']),
            depositBtn: getLocator(this.page, configs['depositBtn']),
            withdrawalBtn: getLocator(this.page, configs['withdrawalBtn']),
            sportsBtn: getLocator(this.page, configs['sportsBtn']),
            casinoBtn: getLocator(this.page, configs['casinoBtn']),
            betgamesBtn: getLocator(this.page, configs['betgamesBtn']),
            virtualsBtn: getLocator(this.page, configs['virtualsBtn']),
            jackpotsBtn: getLocator(this.page, configs['jackpotsBtn']),
            luckyNumbersBtn: getLocator(this.page, configs['luckyNumbersBtn']),
            accountMain: getLocator(this.page, configs['accountMain']),

            datePicker: getLocator(this.page, configs['datePicker']).nth(1),
            dateDialog: getLocator(this.page, configs['dateDialog']),

            transactionIDButton: getLocator(this.page, configs['transactionIDButton']),
            transactionIdInput: getLocator(this.page, configs['transactionIdInput']),
            transactionDetailView: getLocator(this.page, configs['transactionDetailView']),
            detailViewBackButton: getLocator(this.page, configs['detailViewBackButton']),
            betslipBackButton: getLocator(this.page, configs['betslipBackButton']),

            exportBtn: getLocator(this.page, configs['exportBtn']),

            nextPageButton: getLocator(this.page, configs['nextPageButton']),
            prevPageButton: getLocator(this.page, configs['prevPageButton']),

            smartPicksButton: getLocator(this.page, configs['smartPicksButton']),
            smartPicks5: getLocator(this.page, configs['smartPicks5']),
            betNowButton: getLocator(this.page, configs['betNowButton']),
            multipleBetsButton: getLocator(this.page, configs['multipleBetsButton']),

            closePopup: getLocator(this.page, configs['closePopup']),
            mobileNumber: getLocator(this.page, configs['mobileNumber']),
            password: getLocator(this.page, configs['password']),
            loginButton: getLocator(this.page, configs['loginButton']),
        };
    }

    // --- Navigation & Utility Functions (Kept as is) ---

    // goto() and Login() are inherited from BasePage

    async navigateToTransactionHistory() {
        // A promotional popup can appear at any point; close it proactively
        // before navigating so it doesn't block the clicks below.
        await this.closePopupIfVisible();
        await this.locatorsRegistry.hamburgerBtn.click();
        await this.page.waitForTimeout(1000);
        await this.locatorsRegistry.transactionHistoryButton.click();
        await this.page.waitForTimeout(1000);
        await this.closePopupIfVisible();
    }

    async captureScreenshot(locatorName: string, screenshotDir: string, fileName: string, testInfo: any) {
        const locator = this.locatorsRegistry[locatorName];
        await highlightElements(locator);
        await ScreenshotHelper(this.page, screenshotDir, fileName, testInfo);
    }
    async takeScreenshot(screenshotDir: string, fileName: string, testInfo: any) {
        await ScreenshotHelper(this.page, screenshotDir, fileName, testInfo);
    }
    async closePopupIfVisible() {
        const closeBtn = this.locatorsRegistry.closePopup;
        try {
            if (await closeBtn.isVisible({ timeout: 10000 })) {
                // Let the popup finish animating in before clicking, so its own
                // backdrop doesn't intercept the click meant for the close button.
                await this.page.waitForTimeout(500);
                await closeBtn.click({ force: true, timeout: 5000 }).catch(() => { });
                await this.page.waitForTimeout(500);
            }
        } catch {
            // Popup not present — nothing to do.
        }
    }

    async placeBet() {
        await this.locatorsRegistry.gotitButton?.click().catch(() => { /* Ignore if not present */ });
        await this.locatorsRegistry.betNowButton.scrollIntoViewIfNeeded();
        await this.locatorsRegistry.betNowButton.click();
        await this.page.waitForTimeout(3000);
        await this.closePopupIfVisible();
    }

    // --- Methods for Page Interactions ---

    async clickTransactionTab(tabName: string) {
        // The promo popup can reappear at any point on this screen; clear it first.
        await this.closePopupIfVisible();
        const tabLocator = this.locatorsRegistry[tabName];
        await tabLocator.click();
        await this.page.waitForTimeout(1000);
    }

    async clickDatePicker() {
        await this.closePopupIfVisible();
        await this.locatorsRegistry.datePicker.click();
        await this.page.waitForTimeout(1000);
    }

    /**
     * Searches for a transaction using the internally stored test ID.
     */
    async searchTransactionByID() {
        await this.closePopupIfVisible();
        const transactionButton = this.locatorsRegistry.transactionIDButton;
        const retrievedId = (await transactionButton.textContent())?.trim();

        if (retrievedId) {
            // Use the private property for filling the input
            await this.locatorsRegistry.transactionIdInput.fill(this.TEST_TRANSACTION_ID);
            await this.page.keyboard.press('Enter');
            await this.page.waitForTimeout(1000);
        } else {
            throw new Error("Transaction ID element not visible to proceed with search.");
        }
    }

    async clickExportButton() {
        await this.closePopupIfVisible();
        await this.locatorsRegistry.exportBtn.click();
        await this.page.waitForTimeout(1000);
    }

    async openTransactionDetailView() {
        await this.closePopupIfVisible();
        await this.locatorsRegistry.transactionDetailView.click();
        await this.page.waitForTimeout(1000);
    }

    async clickDetailViewBackButton() {
        await this.page.waitForTimeout(2000);
        await this.closePopupIfVisible();
        await this.locatorsRegistry.detailViewBackButton.click();
        await this.page.waitForTimeout(1000);
    }

    async openFirstTransactionBetslip() {
        await this.closePopupIfVisible();
        await this.locatorsRegistry.transactionIDButton.click();
        await this.page.waitForTimeout(1000);
    }

    async clickBetslipBackButton() {
        await this.page.waitForTimeout(1000);
        await this.closePopupIfVisible();
        await this.locatorsRegistry.betslipBackButton.click();
        await this.page.waitForTimeout(1000);
    }
}
