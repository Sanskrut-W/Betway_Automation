import { expect, Page, Locator } from '@playwright/test';
import { loadLocatorsFromExcel } from "../../../global/utils/file-utils/excelReader";
import { getLocator } from "../../../global/utils/file-utils/locatorResolver";
import { highlightElementBorder, highlightElements } from '../../Common-Flows/HighlightElements';
import { HeaderPage } from "./HeaderPage";

const Locator_Url = "src/global/utils/file-utils/locators(2).xlsx";

export class HamburgerMenuPage extends HeaderPage {
    readonly HamburgerPageLocatorRegistry: Record<string, Locator>;
    page: Page;

    constructor(page: Page) {
        super(page);
        this.page = page;

        const configs = loadLocatorsFromExcel(Locator_Url, "HeaderPage");

        this.HamburgerPageLocatorRegistry = {
            ...this.HeaderPageLocatorsRegistry,
            refreshBalHam: getLocator(this.page, configs["refreshBalHam"]),
            hideBalanceHamburger: getLocator(this.page, configs["hide_closeDiveHam"])?.locator('svg').nth(0),
            closeHamburger: getLocator(this.page, configs["hide_closeDiveHam"])?.locator('svg').nth(1),
        };
    }

    async goto() {
        await this.page.goto('https://www.betway.co.bw/sport/soccer', { waitUntil: 'domcontentloaded' });
        //   await this.HeaderPageLocatorsRegistry.closePromotionPopup.waitFor({ state: 'visible',timeout:15000});
        // await this.HeaderPageLocatorsRegistry.closePromotionPopup.click();
    }


    // ==========================================
    // Verify and Click Methods 
    // Note: We DO NOT click hamburgerMenu here because beforeEach handles it
    // ==========================================


    async verifyEyeButton2() {
        await this.Login();
        await this.clickHamburgerMenu();
        await this.HamburgerPageLocatorRegistry.hideBalanceHamburger.waitFor({ state: 'visible' });
        await this.HamburgerPageLocatorRegistry.hideBalanceHamburger.click();
        await highlightElementBorder(this.HamburgerPageLocatorRegistry.hideBalanceHamburger);
    }

    async verifyRefreshBalance() {
        await this.Login();
        await this.clickHamburgerMenu();
        await this.HamburgerPageLocatorRegistry.refreshBalHam.waitFor({ state: 'visible' });
        await highlightElementBorder(this.HamburgerPageLocatorRegistry.refreshBalHam);
        await this.HamburgerPageLocatorRegistry.refreshBalHam.click();
    }

    async verifyCloseHamburgerBtn() {
        await this.Login();
        await this.clickHamburgerMenu();
        await this.HamburgerPageLocatorRegistry.closeHamburger.waitFor({ state: 'visible' });
        await highlightElementBorder(this.HamburgerPageLocatorRegistry.closeHamburger);
        await this.HamburgerPageLocatorRegistry.closeHamburger.click();
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