import { expect, Page, Locator } from '@playwright/test';
import { loadLocatorsFromExcel } from "../../../global/utils/file-utils/excelReader";
import { getLocator } from "../../../global/utils/file-utils/locatorResolver";
import { highlightElementBorder, highlightElements } from '../../Common-Flows/HighlightElements';
import { HeaderPage } from "./HeaderPage";

const Locator_Url = "src/global/utils/file-utils/locators(2).xlsx";

export class HamburgerMenuPage extends HeaderPage {
    readonly HamburgerPageLocatorRegistry: Record<string, Locator>;

    constructor(page: Page) {
        super(page);

        const configs = loadLocatorsFromExcel(Locator_Url, "HeaderPage");

        this.HamburgerPageLocatorRegistry = {
            ...this.HeaderPageLocatorsRegistry,
            refreshBalHam: getLocator(this.page, configs["refreshBalHam"]),
            hideBalanceHamburger: getLocator(this.page, configs["hide_closeDiveHam"])?.locator('svg').nth(1),
        };
    }

    // ==========================================
    // Verify and Click Methods
    // Note: We DO NOT click hamburgerMenu here because beforeEach handles it
    // ==========================================

    async verifyEyeButton2() {
        await this.Login();
        await this.clickHamburgerMenu();
        // Same "hide/show balance" eye icon as HeaderPage.verifyHamburgerEyeButton(): a bare <svg>
        // next to the Balance chip, not an <img> — the inherited eyeButton2 registry key is unset.
        const eyeButton = this.page.locator('div.accordion-summary-header').locator('div.mr-2 svg').first();
        await eyeButton.waitFor({ state: 'visible' });
        await eyeButton.click();
        await highlightElementBorder(eyeButton);
    }

    async verifyAndClickDepositButton() {
        // Ensure element is ready before interacting
        await this.HeaderPageLocatorsRegistry.depositFund.waitFor({ state: 'visible' });
        await highlightElementBorder(this.HeaderPageLocatorsRegistry.depositFund);
        await this.clickDepositFund();
        await this.page.waitForTimeout(5000);
    }

    async verifyAndClickWithdrawFund() {
        await this.HeaderPageLocatorsRegistry.withdrawFund.waitFor({ state: 'visible' });
        await highlightElementBorder(this.HeaderPageLocatorsRegistry.withdrawFund);
        await this.clickWithdrawFund();
        await this.page.waitForTimeout(3000);
    }

    async verifyAndClickMyBets() {
        await highlightElementBorder(this.HeaderPageLocatorsRegistry.myBets);
        await this.clickMyBets();
        await this.page.waitForTimeout(3000);
    }

    async verifyAndClickMyCasinoBigWin() {
        await highlightElementBorder(this.HeaderPageLocatorsRegistry.MyCasinoBigWin);
        await this.clickMyCasinoBigWin();
        await this.page.waitForTimeout(3000);
    }

    async verifyAndClickBonusSummary() {
        await highlightElementBorder(this.HeaderPageLocatorsRegistry.bonusSummary);
        await this.clickBonusSummary();
        await this.page.waitForTimeout(3000);
    }

    async verifyAndClickTransactionsHistory() {
        await highlightElementBorder(this.HeaderPageLocatorsRegistry.transactionsHistory);
        await this.clickTransactionsHistory();
        await this.page.waitForTimeout(3000);
    }

    async verifyAndClickMyCoupons() {
        await highlightElementBorder(this.HeaderPageLocatorsRegistry.myCoupons);
        await this.clickMyCoupons();
        await this.page.waitForTimeout(3000);
    }

    async verifyAndClickBetInfluencer() {
        await highlightElementBorder(this.HeaderPageLocatorsRegistry.betInfluencer);
        await this.clickBetInfluencer();
        await this.page.waitForTimeout(3000);
    }

    async verifyAndClickPromoVouchers() {
        await this.HeaderPageLocatorsRegistry.promoVouchers.scrollIntoViewIfNeeded();
        await highlightElementBorder(this.HeaderPageLocatorsRegistry.promoVouchers);
        await this.clickPromoVouchers();
        await this.page.waitForTimeout(3000);
    }

    async verifyAndClickUpdateDetails() {
        await this.HeaderPageLocatorsRegistry.updateDetails.scrollIntoViewIfNeeded();
        await highlightElementBorder(this.HeaderPageLocatorsRegistry.updateDetails);
        await this.clickUpdateDetails();
        await this.page.waitForTimeout(3000);
    }

    async verifyAndClickResponsibleGaming() {
        await this.HeaderPageLocatorsRegistry.responsibleGaming.scrollIntoViewIfNeeded();
        await highlightElementBorder(this.HeaderPageLocatorsRegistry.responsibleGaming);
        await this.clickResponsibleGaming();
        await this.page.waitForTimeout(3000);
    }

    async verifyAndClickDocumentVerification() {
        await this.HeaderPageLocatorsRegistry.documentVerification.scrollIntoViewIfNeeded();
        await highlightElementBorder(this.HeaderPageLocatorsRegistry.documentVerification);
        await this.clickDocumentVerification();
        await this.page.waitForTimeout(3000);
    }

    async verifyAndClickBetwayBenefits() {
        await this.HeaderPageLocatorsRegistry.betwayBenefits.scrollIntoViewIfNeeded();
        await highlightElementBorder(this.HeaderPageLocatorsRegistry.betwayBenefits);
        await this.clickBetwayBenefits();
        await this.page.waitForTimeout(3000);
    }

    async verifyAndClickBetwayRewards() {
        await this.HeaderPageLocatorsRegistry.betwayRewards.scrollIntoViewIfNeeded();
        await highlightElementBorder(this.HeaderPageLocatorsRegistry.betwayRewards);
        await this.clickBetwayRewards();
        await this.page.waitForTimeout(3000);
    }

    async verifyAndClickChangePassword() {
        await this.HeaderPageLocatorsRegistry.changePassword.scrollIntoViewIfNeeded();
        await highlightElementBorder(this.HeaderPageLocatorsRegistry.changePassword);
        await this.clickChangePassword();
        await this.page.waitForTimeout(3000);
    }

    async verifyAndClickLogout() {
        await this.HeaderPageLocatorsRegistry.logOut.scrollIntoViewIfNeeded();
        await highlightElementBorder(this.HeaderPageLocatorsRegistry.logOut);
        await this.clickLogOut();
        await this.page.waitForTimeout(3000);
    }
}