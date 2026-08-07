import { Page, Locator, expect } from '@playwright/test';
import { loadLocatorsFromExcel } from "../../../global/utils/file-utils/excelReader";
import { getLocator } from "../../../global/utils/file-utils/locatorResolver";
import { highlightElements } from '../../Common-Flows/HighlightElements';
import { ScreenshotHelper } from '../../Common-Flows/ScreenshotHelper';
import { OddsSelection, LiveOddsSelection, DrawNoBetOddsSelection, EsportsOddsSelection } from '../commonflows/OddSelection'; // Import odds selection helpers
import { OddsSelectionAbove } from '../commonflows/OddSelection';
import { BasePage } from './BasePage';

const userData = require('../json-data/userData.json');
const LOCATOR_URL = "src/global/utils/file-utils/locators(2).xlsx";
export class BetSaverPage extends BasePage {
    readonly locatorsRegistry: Record<string, Locator>;
    readonly locators: Record<string, Locator>; // Added for compatibility with spec file helpers

    constructor(page: Page) {
        super(page);

        const configs = loadLocatorsFromExcel(LOCATOR_URL, "BetsaverPage");

        this.locatorsRegistry = {
            // --- Login & Registration ---
            gotit: getLocator(this.page, configs["gotit"]),
            mobileNumber: getLocator(this.page, configs["mobileNumber"]),
            password: getLocator(this.page, configs["password"]),
            loginButton: getLocator(this.page, configs["loginButton"]),

            // --- Navigation & Core Buttons ---
            sportButton: getLocator(this.page, configs["sportButton"]),
            liveButton: getLocator(this.page, configs["liveButton"]),
            eSportsButton: getLocator(this.page, configs["eSportsButton"]),
            upcomingButton: getLocator(this.page, configs["upcomingButton"]),
            liveTab: getLocator(this.page, configs["liveTab"]),
            hamburgerMenu: getLocator(this.page, configs["hamburgerMenu"]),
            myBetsButton: getLocator(this.page, configs["myBetsButton"]),

            // --- BetSaver Status & Info ---
            betSaverNotActive: getLocator(this.page, configs["betSaverNotActive"]),
            betSaverActive: getLocator(this.page, configs["betSaverActive"]),
            betSaverInfo: getLocator(this.page, configs["betSaverInfo"]),
            continueInBetSaverInfo: getLocator(this.page, configs["continueInBetSaverInfo"]),
            betSaverPopup: getLocator(this.page, configs["betSaverPopup"]),

            // --- BetSlip & Wager ---
            multiBetSlip: getLocator(this.page, configs["multiBetSlip"]),
            singleBetSlip: getLocator(this.page, configs["singleBetSlip"]),
            betSlipTextBox: getLocator(this.page, configs["betSlipTextBox"]),
            betSlipsearchIcon: getLocator(this.page, configs["betSlipsearchIcon"]),
            wagerAmountInput: getLocator(this.page, configs["wagerAmountInput"]),
            betAmountInput: getLocator(this.page, configs["betAmountInput"]),
            betNowButton: getLocator(this.page, configs["betNowButton"]),
            betslipDeleteButton: getLocator(this.page, configs["betslipDeleteButton"]),

            // --- Booking Code & Sharing ---
            bookABet: getLocator(this.page, configs["bookABet"]),
            addToBetSlip: getLocator(this.page, configs["addToBetSlip"]),
            copyBookingCode: getLocator(this.page, configs["copyBookingCode"]),
            shareButton: getLocator(this.page, configs["shareButton"]),

            // --- My Bets / Settled / Cash Out ---
            settledBetsButton: getLocator(this.page, configs["settledBetsButton"]),
            openBetsButton: getLocator(this.page, configs["openBetsButton"]),
            cashOutButton: getLocator(this.page, configs["cashOutButton"]),
            cashoutConfirmButton: getLocator(this.page, configs["cashoutConfirmButton"]),
            cashOutCloseButton: getLocator(this.page, configs["cashOutCloseButton"]),
            betSaverInMyBets: getLocator(this.page, configs["betSaverInMyBets"]),
            betSaverInDetailView: getLocator(this.page, configs["betSaverInDetailView"]),
            detailViewButton: getLocator(this.page, configs["detailViewButton"]),
            detailViewBackButton: getLocator(this.page, configs["detailViewBackButton"]),
            rebetButton: getLocator(this.page, configs["rebetButton"]),

            // --- Popups & Confirmation ---
            acceptNewWager: getLocator(this.page, configs["acceptNewWager"]),
            closePopup: getLocator(this.page, configs["closePopup"]),
            betConfirmationClose: getLocator(this.page, configs["betConfirmationClose"]),

            // --- Smart Picks & Filters ---
            smartPicksButton: getLocator(this.page, configs["smartPicksButton"]),
            arrowFilter: getLocator(this.page, configs["arrowFilter"]),
            smartPicks5: getLocator(this.page, configs["smartPicks5"]),
            smartPicks10: getLocator(this.page, configs["smartPicks10"]),
            smartPicks15: getLocator(this.page, configs["smartPicks15"]),
            smartPicks20: getLocator(this.page, configs["smartPicks20"]),
            smartPicks25: getLocator(this.page, configs["smartPicks25"]),
            smartPicks30: getLocator(this.page, configs["smartPicks30"]),

            // --- Market Dropdowns ---
            marketsDropdown: getLocator(this.page, configs["marketsDropdown"]),
            drawNoBetMarket: getLocator(this.page, configs["drawNoBetMarket"]),
            betSaverTextInDetail: getLocator(this.page, configs["betSaverTextInDetail"]),
        };
        this.locators = this.locatorsRegistry;
    }

    // goto() and login() are inherited from BasePage

    // Login() overrides BasePage: this page logs in via a dedicated login button (not Enter)
    async Login() {
        await this.locatorsRegistry.mobileNumber.fill(userData.user4.mobile);
        await this.locatorsRegistry.password.fill(userData.user4.password);
        await this.locatorsRegistry.loginButton.click();
        await this.page.waitForTimeout(1000);
        // await this.locatorsRegistry.closePopup.click();
    }


    // --- Screenshot Utility Methods (Kept for external calls from spec file) ---
    async captureScreenshot(locatorName: string, screenshotDir: string, fileName: string, testInfo: any) {
        const locator = this.locatorsRegistry[locatorName];
        await highlightElements(locator);
        await ScreenshotHelper(this.page, screenshotDir, fileName, testInfo);
    }

    async takeScreenshot(screenshotDir: string, fileName: string, testInfo: any) {
        await ScreenshotHelper(this.page, screenshotDir, fileName, testInfo);
    }
    // --- End Screenshot Utility Methods ---

    // --- Low-Level Safe Wrappers (Moved from Spec Helper) ---

    private async safeClick(locator: Locator, name: string) {
        await expect(locator, `${name} should be visible`).toBeVisible({ timeout: 5000 });
        await locator.click();
    }

    private async safeFill(locator: Locator, value: string, name: string) {
        await expect(locator, `${name} should be visible`).toBeVisible({ timeout: 5000 });
        await locator.fill(value);
    }

    private async safePress(key: string) {
        await this.page.keyboard.press(key);
    }



    async preparePage() {
        await this.page.waitForTimeout(2000);
        await this.page.reload();
        await this.page.waitForLoadState('domcontentloaded');
    }

    async closePopup() {
        const close = this.locatorsRegistry.closePopup;
        if (await close.isVisible({ timeout: 1000 })) {
            await close.click();
            await this.page.waitForTimeout(500);
        }
    }

    async closeBetConfirmationPopup() {
        const close = this.locatorsRegistry.betConfirmationClose;
        if (await close.isVisible({ timeout: 5000 })) {
            await close.click();
            await this.page.waitForTimeout(500);
        }
    }

    async deleteBetslipIfVisible() {
        if (await this.locatorsRegistry.betslipDeleteButton?.isVisible()) {
            await expect(this.locatorsRegistry.betslipDeleteButton).toBeVisible({ timeout: 10000 });
            await this.locatorsRegistry.betslipDeleteButton.click();
        }
    }

    async navigateToMyBets() {
        await this.locatorsRegistry.hamburgerMenu.click();
        await this.page.waitForTimeout(1000);
        await this.locatorsRegistry.myBetsButton.click();
        await this.page.waitForTimeout(1000);
    }

    async outrightsSelection() {
        await this.page.goto('https://betway.co.zm/sport/football/outrights');
        await this.page.waitForTimeout(2000);
        const firstOdds = this.page.locator('(//div[contains(@class,"odd-value")])[1]');
        if (await firstOdds.isVisible()) {
            await firstOdds.click();
        }
    }

    async clickBookingCode() {
        await this.page.goto('https://betway.co.zm/sport/soccer');
        await this.page.waitForTimeout(1000);
        await this.locatorsRegistry.clickBookingCode.click();
        await this.page.waitForTimeout(1000);
    }

    async acceptNewWager() {
        const confirmRebet = this.page.locator("//button[contains(.,'Accept Changes') or contains(.,'Confirm')]");
        if (await confirmRebet.isVisible({ timeout: 2000 })) {
            await confirmRebet.click();
        }
    }

    async cashoutBet() {
        const cashoutBtn = this.page.locator("//button[contains(.,'Cash Out')]");
        if (await cashoutBtn.isVisible()) {
            await cashoutBtn.click();
            await this.page.waitForTimeout(1000);
        }
    }

    // Helper used in T26-27, T32
    async tryClick(locator: Locator, name: string, timeout = 2000) {
        try {
            if (await locator.isVisible({ timeout })) {
                console.log(`✅ Clicking on ${name}`);
                await locator.click();
                return true;
            } else {
                console.log(`⚠️ ${name} not visible, skipping...`);
                return false;
            }
        } catch {
            console.log(`⚠️ ${name} not found, skipping...`);
            return false;
        }
    }




    async continueBetSaverPopupFlow() {
        await this.safeClick(this.locatorsRegistry.betSaverInfo, "BetSaver Info");
    }

    async closeBetSaverPopupFlow() {
        await this.safeClick(this.locatorsRegistry.continueInBetSaverInfo, "Continue in BetSaver Info");
    }

    async clickDetailViewButton() {
        await this.safeClick(this.locatorsRegistry.detailViewButton, "Detail View Button");
    }

    // Active BetSaver: the BetSaver text SHOULD be shown in the bet's Detail View.
    async verifyBetSaverTextVisibleInDetail() {
        await expect(
            this.locatorsRegistry.betSaverTextInDetail,
            "BetSaver text should be visible in Detail View"
        ).toBeVisible({ timeout: 10000 });
        await highlightElements(this.locatorsRegistry.betSaverTextInDetail);
    }

    // Grayed-out / non-qualifying BetSaver: the BetSaver text should NOT be shown in the Detail View.
    async verifyBetSaverTextNotVisibleInDetail() {
        await expect(
            this.locatorsRegistry.betSaverTextInDetail,
            "BetSaver text should NOT be visible in Detail View"
        ).toBeHidden({ timeout: 10000 });
    }

    async clickSettledBetsButton() {
        await this.safeClick(this.locatorsRegistry.settledBetsButton, "Settled Bets Button");
        await this.page.waitForTimeout(3000);
    }

    async verifyBetsaverNotActiveForFewSelections() {
        await this.locatorsRegistry.gotit.click().catch(() => { });
        // await this.preparePage();
        await OddsSelectionAbove(2, 1.5, this.page);
        await this.safeClick(this.locatorsRegistry.multiBetSlip, "BetSaver Not Active");
        await this.safeClick(this.locatorsRegistry.betSaverNotActive, "BetSaver Not Active");
    }

    async setupBetsaverActive() {
        await this.locatorsRegistry.gotit.click().catch(() => { });
        await this.preparePage();
        await this.safeClick(this.locatorsRegistry.upcomingButton, "Upcoming Button");
        await OddsSelectionAbove(7, 2, this.page);
        await this.safeClick(this.locatorsRegistry.multiBetSlip, "BetSaver Not Active");
        await this.safeClick(this.locatorsRegistry.betSaverActive, "BetSaver Active");
    }

    async openBetsaverInfoPopup() {
        await this.safeClick(this.locatorsRegistry.betSaverInfo, "BetSaver Info");
    }

    async clickContinueInBetsaverInfo() {
        await this.safeClick(this.locatorsRegistry.continueInBetSaverInfo, "Continue in BetSaver Info");
    }

    async placeQualifyingBetAndNavigateToMyBets(numberOfOdds: number = 3, oddsAbove: number = 1.5) {
        await this.locatorsRegistry.gotit.click().catch(() => { });
        await this.preparePage();
        await this.safeClick(this.locatorsRegistry.upcomingButton, "Upcoming Button");
        await OddsSelectionAbove(numberOfOdds, oddsAbove, this.page);
        await this.safeClick(this.locatorsRegistry.multiBetSlip, "BetSaver Not Active");
        await this.safeClick(this.locatorsRegistry.betNowButton, "BetNow Button");
        await this.page.waitForTimeout(5000);
        await this.closePopup();
        await this.navigateToMyBets();
        await this.page.waitForTimeout(2000);
    }

    async placeBetsaverActiveBetAndNavigateToMyBets(numberOfOdds: number = 8, oddsAbove: number = 3.0) {
        await this.preparePage();
        await OddsSelectionAbove(numberOfOdds, oddsAbove, this.page);
        await this.safeClick(this.locatorsRegistry.multiBetSlip, "BetSaver Not Active");
        // Scroll the Bet Now button into view before clicking it
        await this.locatorsRegistry.betNowButton.scrollIntoViewIfNeeded();
        await this.safeClick(this.locatorsRegistry.betNowButton, "BetNow Button");
        await this.page.waitForTimeout(5000);
        await this.closeBetConfirmationPopup();
        await this.closePopup();
        await this.navigateToMyBets();
    }

    async selectOutrightBet() {
        await this.outrightsSelection();
        await this.safeClick(this.locatorsRegistry.multiBetSlip, "Multi BetSlip");
    }

    async selectSportBetForMixedSlip() {
        await this.safeClick(this.locatorsRegistry.sportButton, "Sport Button");
        await this.safeClick(this.locatorsRegistry.upcomingButton, "Upcoming Button");
        await this.preparePage();
        await OddsSelection(2, this.page);
        await this.safeClick(this.locatorsRegistry.multiBetSlip, "BetSaver Not Active");
        await this.safeClick(this.locatorsRegistry.betSaverNotActive, "BetSaver Not Active");
    }


    async loadBetFromBookingCodeAndCheckStatus() {
        await this.clickBookingCode();
        await this.safeClick(this.locatorsRegistry.addToBetSlip, "Add To BetSlip");
        await this.safeClick(this.locatorsRegistry.multiBetSlip, "Multi BetSlip");
        try {
            await this.safeClick(this.locatorsRegistry.betSaverActive, "BetSaver Active");
            return 'Active';
        }
        catch {
            await this.safeClick(this.locatorsRegistry.betSaverNotActive, "BetSaver Active");
            return 'NotActive';
        }
    }


    async selectLowOddsSmartPicks5() {
        await this.safeClick(this.locatorsRegistry.sportButton, "Sport Button");
        await this.safeClick(this.locatorsRegistry.smartPicksButton, "Smart Picks Button");
        await this.safeClick(this.locatorsRegistry.smartPicks5, "Smart Picks 5");
        await this.safeClick(this.locatorsRegistry.multiBetSlip, "BetSaver Not Active");
        await this.safeClick(this.locatorsRegistry.betSaverNotActive, "BetSaver Not Active");
    }


    async selectMediumOddsSmartPicksAndVerifyActive() {
        await this.safeClick(this.locatorsRegistry.smartPicksButton, "Smart Picks Button");

        // Complex logic for selecting suitable smart picks
        if (await this.tryClick(this.locatorsRegistry.smartPicks30, "Smart Picks 30")) {
            await this.preparePage();
            await this.safeClick(this.locatorsRegistry.upcomingButton, "Upcoming Button");
            await OddsSelection(6, this.page);
        } else if (await this.tryClick(this.locatorsRegistry.smartPicks25, "Smart Picks 25")) {
            await this.preparePage();
            await this.safeClick(this.locatorsRegistry.upcomingButton, "Upcoming Button");
            await OddsSelection(8, this.page);
        } else if (await this.tryClick(this.locatorsRegistry.smartPicks20, "Smart Picks 20")) {
            await this.preparePage();
            await this.safeClick(this.locatorsRegistry.upcomingButton, "Upcoming Button");
            await OddsSelection(10, this.page);
        } else if (await this.tryClick(this.locatorsRegistry.smartPicks15, "Smart Picks 15")) {
            await this.preparePage();
            await this.safeClick(this.locatorsRegistry.upcomingButton, "Upcoming Button");
            await OddsSelection(12, this.page);
        } else {
            console.warn("❌ No Smart Picks option available (30, 25, or 20).");
        }

        await this.safeClick(this.locatorsRegistry.multiBetSlip, "BetSaver Not Active");
        await this.safeClick(this.locatorsRegistry.betSaverActive, "BetSaver Active");
    }


    async placeBetWithNewWagerChangeAndCheckMyBets() {
        await this.safeClick(this.locatorsRegistry.sportButton, "Sport Button");
        await this.preparePage();
        await this.page.waitForTimeout(2000);
        await this.safeClick(this.locatorsRegistry.upcomingButton, "Upcoming Button");
        await OddsSelection(12, this.page);
        await this.safeClick(this.locatorsRegistry.multiBetSlip, "Multi BetSlip");
        await this.acceptNewWager();
        await this.page.waitForTimeout(2000);
        await this.closePopup();
        await this.page.waitForTimeout(5000);
        await this.navigateToMyBets();
    }


    async shareAndLoadBookingCode() {
        await this.safeClick(this.locatorsRegistry.sportButton, "Sport Button");
        await this.preparePage();
        await this.safeClick(this.locatorsRegistry.upcomingButton, "Upcoming Button");
        await OddsSelection(10, this.page);
        await this.safeClick(this.locatorsRegistry.multiBetSlip, "Multi BetSlip");
        await this.safeClick(this.locatorsRegistry.shareButton, "Share Button");
        await this.safeClick(this.locatorsRegistry.copyBookingCode, "Copy Booking Code");
        await this.closePopup();

        await this.safeFill(this.locatorsRegistry.betSlipTextBox, '', "BetSlip TextBox");
        await this.safePress('Control+V');
        await this.safeClick(this.locatorsRegistry.betSlipsearchIcon, "BetSlip Search Icon");
        await this.safeClick(this.locatorsRegistry.betSaverActive, "BetSaver Active");
    }


    async checkBetsaverNotActiveForHighWager() {
        await this.safeClick(this.locatorsRegistry.sportButton, "Sport Button");
        await this.safeClick(this.locatorsRegistry.smartPicksButton, "Smart Picks Button");
        await this.safeClick(this.locatorsRegistry.smartPicks5, "Smart Picks 5");
        await this.safeClick(this.locatorsRegistry.multiBetSlip, "Multi BetSlip");
        await this.safeFill(this.locatorsRegistry.wagerAmountInput, '2000', "Wager Amount Input");
        await this.safeClick(this.locatorsRegistry.betSaverNotActive, "BetSaver Not Active");
    }


    async checkBetsaverNotActiveForLowOddsAndFewLegs() {
        await this.safeClick(this.locatorsRegistry.sportButton, "Sport Button");
        await this.safeClick(this.locatorsRegistry.smartPicksButton, "Smart Picks Button");
        await this.safeClick(this.locatorsRegistry.smartPicks10, "Smart Picks 10");
        await this.safeClick(this.locatorsRegistry.multiBetSlip, "Multi BetSlip");
        await this.safeClick(this.locatorsRegistry.betSaverNotActive, "BetSaver Not Active");
    }


    async checkBetsaverActiveForLowOddsAndManyLegs() {
        await this.safeClick(this.locatorsRegistry.sportButton, "Sport Button");
        await this.safeClick(this.locatorsRegistry.smartPicksButton, "Smart Picks Button");

        // Complex logic for selecting suitable smart picks (ensuring enough legs for activation)
        if (await this.tryClick(this.locatorsRegistry.smartPicks30, "Smart Picks 30")) {
            await this.preparePage();
            await this.safeClick(this.locatorsRegistry.upcomingButton, "Upcoming Button");
            await OddsSelection(6, this.page);
        } else if (await this.tryClick(this.locatorsRegistry.smartPicks25, "Smart Picks 25")) {
            await this.preparePage();
            await this.safeClick(this.locatorsRegistry.upcomingButton, "Upcoming Button");
            await OddsSelection(8, this.page);
        } else if (await this.tryClick(this.locatorsRegistry.smartPicks20, "Smart Picks 20")) {
            await this.preparePage();
            await this.safeClick(this.locatorsRegistry.upcomingButton, "Upcoming Button");
            await OddsSelection(10, this.page);
        } else if (await this.tryClick(this.locatorsRegistry.smartPicks15, "Smart Picks 15")) {
            await this.preparePage();
            await this.safeClick(this.locatorsRegistry.upcomingButton, "Upcoming Button");
            await OddsSelection(12, this.page);
        } else {
            throw new Error("❌ No Smart Picks option available (30, 25, or 20) for T32 flow.");
        }

        await this.safeClick(this.locatorsRegistry.multiBetSlip, "Multi BetSlip");
        await this.safeClick(this.locatorsRegistry.betSaverActive, "BetSaver Active");
    }


    async checkBetsaverNotActiveForDrawNoBet() {
        await this.safeClick(this.locatorsRegistry.sportButton, "Sport Button");
        await this.preparePage();
        await this.safeClick(this.locatorsRegistry.upcomingButton, "Upcoming Button");
        await DrawNoBetOddsSelection(1, this.page);
        await this.safeClick(this.locatorsRegistry.multiBetSlip, "Multi BetSlip");
        await this.safeClick(this.locatorsRegistry.betSaverNotActive, "BetSaver Not Active");
    }


    async checkBetsaverNotActiveForMixedMarkets() {
        await this.safeClick(this.locatorsRegistry.sportButton, "Sport Button");
        await this.safeClick(this.locatorsRegistry.smartPicksButton, "Smart Picks Button");
        await this.safeClick(this.locatorsRegistry.smartPicks5, "Smart Picks 5");
        await this.safeClick(this.locatorsRegistry.multiBetSlip, "Multi BetSlip");
        await this.outrightsSelection(); // second market
        await this.safeClick(this.locatorsRegistry.betSaverNotActive, "BetSaver Not Active");
        await this.safeClick(this.locatorsRegistry.sportButton, "Sport Button"); // Cleanup step
    }


    async selectEsportsOddsAndVerifyActive() {
        await this.safeClick(this.locatorsRegistry.eSportsButton, "Esports Button");
        const clickedOdds = await EsportsOddsSelection(10, this.page);

        // if (clickedOdds === 0) {
        //     throw new Error("❌ No odds were selected for Esports even after retries");
        // }

        await this.safeClick(this.locatorsRegistry.multiBetSlip, "Multi BetSlip");

        const isBetSaverVisible = await this.locatorsRegistry.betSaverActive.isVisible();
        if (!isBetSaverVisible) {
            throw new Error("❌ BetSaver not active after odds selection");
        }
    }

    async selectLiveGameOddsAndVerifyActive() {
        await LiveOddsSelection(8, this.page);
        await this.safeClick(this.locatorsRegistry.multiBetSlip, "Multi BetSlip");
        await this.safeClick(this.locatorsRegistry.betSaverActive, "BetSaver Active");
    }

}