import { test } from '../../../fixtures/MasterFixtureFile';
import path from 'path';

const projectRoot = path.resolve(__dirname, '../../..');
const screenshotDir = path.join(projectRoot, 'screenshots/module/transactionHistory');

test.describe('Transaction History Module Tests', () => {

    // T1: Verify contents of Transaction History page
    test('T1-Hamburger Menu >> Verify Transaction History page contents', async ({ transactionHistoryPage }, testInfo) => {
        await transactionHistoryPage.navigateToTransactionHistory();
        await transactionHistoryPage.captureScreenshot('accountMain', screenshotDir, 'T1-TransactionHistory', testInfo);
        await transactionHistoryPage.closePopupIfVisible();
    });

    // T2-T8: Verify all tabs
    test('T2-T8: Verify all tabs click and take screenshots', async ({ transactionHistoryPage }, testInfo) => {
        await transactionHistoryPage.navigateToTransactionHistory();

        const tabs = [
            { name: 'allBtn', locatorName: 'allBtn', screenshot: 'T2-All' },
            { name: 'depositBtn', locatorName: 'depositBtn', screenshot: 'T3-Deposits' },
            { name: 'withdrawalBtn', locatorName: 'withdrawalBtn', screenshot: 'T4-Withdrawals' },
            { name: 'sportsBtn', locatorName: 'sportsBtn', screenshot: 'T5-Sports' },
            { name: 'casinoBtn', locatorName: 'casinoBtn', screenshot: 'T6-Casino' },
            { name: 'betgamesBtn', locatorName: 'betgamesBtn', screenshot: 'T7-Betgames' },
            { name: 'virtualsBtn', locatorName: 'virtualsBtn', screenshot: 'T8-Virtuals' },
            { name: 'jackpotsBtn', locatorName: 'jackpotsBtn', screenshot: 'T10-Jackpots' },
        ];

        for (const tab of tabs) {
            await transactionHistoryPage.clickTransactionTab(tab.name);
            await transactionHistoryPage.captureScreenshot(tab.locatorName, screenshotDir, `TransactionHistory_${tab.screenshot}`, testInfo);
        }

        await transactionHistoryPage.closePopupIfVisible();
    });

    // T11: Calendar
    test('T11-Verify calendar opens', async ({ transactionHistoryPage }, testInfo) => {
        await transactionHistoryPage.navigateToTransactionHistory();
        await transactionHistoryPage.clickDatePicker();
        await transactionHistoryPage.captureScreenshot('dateDialog', screenshotDir, 'T11-TransactionHistory_Calendar', testInfo);
        await transactionHistoryPage.closePopupIfVisible();
    });

    // T12: Search transaction by ID
    test('T12-Search transaction by ID', async ({ transactionHistoryPage }, testInfo) => {
        await transactionHistoryPage.navigateToTransactionHistory();

        // No ID is passed here! The ID is managed internally by the Page Object.
        await transactionHistoryPage.searchTransactionByID();

        await transactionHistoryPage.captureScreenshot('transactionIdInput', screenshotDir, 'T12-TransactionHistory_Search', testInfo);
        await transactionHistoryPage.closePopupIfVisible();
    });

    // T13: Export
    test('T13-Export transactions', async ({ transactionHistoryPage }, testInfo) => {
        await transactionHistoryPage.navigateToTransactionHistory();
        await transactionHistoryPage.clickExportButton();
        await transactionHistoryPage.captureScreenshot('exportBtn', screenshotDir, 'T13-TransactionHistory_Export', testInfo);
        await transactionHistoryPage.closePopupIfVisible();
    });

    // T14-T19: Transaction Detail view & Betslip
    test('T14-T19: Transaction Detail view and Betslip info', async ({ transactionHistoryPage }, testInfo) => {
        await transactionHistoryPage.navigateToTransactionHistory();

        // T14: Detail View
        await transactionHistoryPage.openTransactionDetailView();
        await transactionHistoryPage.captureScreenshot('transactionDetailView', screenshotDir, 'T14-TransactionHistory_DetailView', testInfo);

        // T15: Back from Detail View
        await transactionHistoryPage.clickDetailViewBackButton();
        await transactionHistoryPage.captureScreenshot('detailViewBackButton', screenshotDir, 'T15-TransactionHistory_Back', testInfo);

        // T17: Betslip Contents
        await transactionHistoryPage.openFirstTransactionBetslip();
        await transactionHistoryPage.captureScreenshot('transactionIDButton', screenshotDir, 'T17-TransactionHistory_BetslipContents', testInfo);

        // T19: Back from Betslip
        await transactionHistoryPage.clickBetslipBackButton();
        await transactionHistoryPage.captureScreenshot('betslipBackButton', screenshotDir, 'T19-TransactionHistory_BetslipClosed', testInfo);

        await transactionHistoryPage.closePopupIfVisible();
    });

    // T20: Bet Now to Transaction History
    test('T20 - Verify Bet Now to Transaction History', async ({ transactionHistoryPage }, testInfo) => {
        await transactionHistoryPage.placeBet();
        await transactionHistoryPage.navigateToTransactionHistory();
        await transactionHistoryPage.page.waitForTimeout(1000);
        await transactionHistoryPage.captureScreenshot('accountMain', screenshotDir, 'T20_BetNow_TransactionHistory', testInfo);
    });

});