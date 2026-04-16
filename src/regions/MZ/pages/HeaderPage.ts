
import { HomePage } from './HomePage';
import { loadLocatorsFromExcel } from "../../../global/utils/file-utils/excelReader";
import { getLocator } from "../../../global/utils/file-utils/locatorResolver";
import { highlightElementBorder, highlightElements } from '../../Common-Flows/HighlightElements';
import { expect } from '@playwright/test';


const userData = require('../json-data/userData.json');
// const LOCATOR_URL = "https://github.com/athrvzoz/LocatorFile/raw/refs/heads/main/locators.xlsx";
const Locator_Url = "src/global/utils/file-utils/locators(2).xlsx"

export class HeaderPage extends HomePage {
  readonly HeaderPageLocatorsRegistry: Record<string, import('@playwright/test').Locator>;
  page: import('@playwright/test').Page;

  constructor(page: import('@playwright/test').Page) {
    super(page);
    this.page = page;

    const configs = loadLocatorsFromExcel(Locator_Url, "HeaderPage");

    this.HeaderPageLocatorsRegistry = {
      betwayLogoHeader: getLocator(this.page, configs["betwayLogoHeader"]),
      mobileNumber: getLocator(this.page, configs["mobileNumber"]),
      closePromotionPopup: getLocator(this.page, configs["closePromotionPopup"]),
      hamburgerMenu: getLocator(this.page, configs["hamburgerMenu"]),
      loginButton: getLocator(this.page, configs["loginButton"]),
      loginButtonFromPopup: getLocator(this.page, configs["loginButtonFromPopup"]),
      loginButtonfromHamburger: getLocator(this.page, configs["loginButtonfromHamburger"]),
      signUpButton: getLocator(this.page, configs["signUpButton"]),
      signUpButtonfromHamburger: getLocator(this.page, configs["signUpButtonfromHamburger"]),
      closeHamburgerMenu: getLocator(this.page, configs["closeHamburgerMenu"]),
      quickLinks: getLocator(this.page, configs["quickLinks"]),
      myAccount: getLocator(this.page, configs["myAccount"]),
      bettingRules: getLocator(this.page, configs["bettingRulesMZ"]).nth(0),
      statistics: getLocator(this.page, configs["statistics"]),
      oddsFormat: getLocator(this.page, configs["oddsFormat"]),
      // countryCode: getLocator(this.page, configs["countryCode"]),
      allBalanceFieldHamburger: getLocator(this.page, configs["allBalanceFieldHamburger"]),
      depositFund: getLocator(this.page, configs["depositFund"]),
      withdrawFund: getLocator(this.page, configs["withdrawFund"]),
      closeWithdrawalAlert: getLocator(this.page, configs["closeWithdrawalAlert"]),
      myBets: getLocator(this.page, configs["myBets"]),
      MyCasinoBigWin: getLocator(this.page, configs["MyCasinoBigWin"]),
      bonusSummary: getLocator(this.page, configs["bonusSummary"]),
      transactionsHistory: getLocator(this.page, configs["transactionsHistory"]),
      myCoupons: getLocator(this.page, configs["myCoupons"]),
      betInfluencer: getLocator(this.page, configs["betInfluencer"]),
      promoVouchers: getLocator(this.page, configs["promoVouchers"]),
      updateDetails: getLocator(this.page, configs["updateDetails"]),
      responsibleGaming: getLocator(this.page, configs["responsibleGaming"]),
      documentVerification: getLocator(this.page, configs["documentVerification"]),
      betwayBenefits: getLocator(this.page, configs["betwayBenefits"]),
      betwayRewards: getLocator(this.page, configs["betwayRewards"]),
      changePassword: getLocator(this.page, configs["changePassword"]),
      logOut: getLocator(this.page, configs["logOut"]),
      closeMyAccountOptions: getLocator(this.page, configs["closeMyAccountOptions"]),
      // eyeButton2: getLocator(this.page, configs["eyeButton2"]),
      mobileNumberInput: getLocator(this.page, configs["mobileNumberInput"]),
      passwordInput: getLocator(this.page, configs["passwordInput"]),
      eyeButton: getLocator(this.page, configs["eyeButton"]),
      forgetPasswordLink: getLocator(this.page, configs["forgetPasswordLink"]),
      betslipButton: getLocator(this.page, configs["betslipButton"]),
      gotItButton: getLocator(this.page, configs["gotItButton"]),
      accountsButton: getLocator(this.page, configs["accountsButtonMZ"]),
      balanceLabel: getLocator(this.page, configs["balanceLabel"]),
      balanceValue: getLocator(this.page, configs["balanceValue"]),
      balanceDropdown: getLocator(this.page, configs["balanceDropdown"]),
      balanceCurrency: getLocator(this.page, configs["balanceCurrency"]),
      freebetField: getLocator(this.page, configs["freebetField"]),
      freebetCurrency: getLocator(this.page, configs["freebetCurrency"]),
      // freeBetRefreshBtn: getLocator(this.page, configs["freeBetRefreshBtn"]),
      casinoBonusField: getLocator(this.page, configs["casinoBonusField"]),
      casinoBonusAmount: getLocator(this.page, configs["casinoBonusAmount"]),
      casinoCurrency: getLocator(this.page, configs["casinoCurrency"]),
      // casinoRefreshBtn: getLocator(this.page, configs["casinoRefreshBtn"]),
      depositButton: getLocator(this.page, configs["depositButton"]),
      notificationBellIcon: getLocator(this.page, configs["notificationBellIcon"]),
      allBalanceTxt: getLocator(this.page, configs["allBalanceTxt"]),
      liveChatIcon: getLocator(this.page, configs["liveChatIcon"]),



    };
  }

  // Navigation Methods
  async goto() {
    await this.page.goto('https://en.betway.co.mz/sport/soccer', { waitUntil: 'domcontentloaded' });
    //   await this.HeaderPageLocatorsRegistry.closePromotionPopup.waitFor({ state: 'visible',timeout:15000});
    // await this.HeaderPageLocatorsRegistry.closePromotionPopup.click();
  }

  async Login() {
    // await this.goto();
    await this.HeaderPageLocatorsRegistry.mobileNumberInput.fill(`${userData.user4.mobile}`);
    await this.HeaderPageLocatorsRegistry.passwordInput.fill(`${userData.user4.password}`);
    await this.page.keyboard.press('Enter');
    // await this.HeaderPageLocatorsRegistry.closePromotionPopup.waitFor({ state: 'visible', timeout: 30000 });
    // await this.HeaderPageLocatorsRegistry.closePromotionPopup.click();
    // await this.closePromotionPopup();
    await this.page.waitForLoadState('domcontentloaded');
  }

  // Verification Methods
  async verifyBetwayLogoHeader() {
    await this.HeaderPageLocatorsRegistry.betwayLogoHeader.waitFor({ state: 'visible', timeout: 15000 });
    await highlightElements(this.HeaderPageLocatorsRegistry.betwayLogoHeader);
  }

  async verifyHamburgerMenu() {
    await this.HeaderPageLocatorsRegistry.hamburgerMenu.waitFor({ state: 'visible', timeout: 15000 });
    await highlightElementBorder(this.HeaderPageLocatorsRegistry.hamburgerMenu);
  }

  async verifyLoginAndSignUpButtons() {
    await this.clickHamburgerMenu();
    await this.HeaderPageLocatorsRegistry.loginButtonfromHamburger.waitFor({ state: 'visible', timeout: 15000 });
    await highlightElementBorder(this.HeaderPageLocatorsRegistry.loginButtonfromHamburger);
    await highlightElementBorder(this.HeaderPageLocatorsRegistry.signUpButtonfromHamburger);
  }

  async verifyQuickLinksDropdown() {
    await this.clickHamburgerMenu();
    await this.HeaderPageLocatorsRegistry.quickLinks.waitFor({ state: 'visible', timeout: 15000 });
    await highlightElementBorder(this.HeaderPageLocatorsRegistry.quickLinks);
  }

  async verifyBettingRulesOption() {
    await this.clickHamburgerMenu();
    await this.HeaderPageLocatorsRegistry.bettingRules.scrollIntoViewIfNeeded();
    await highlightElementBorder(this.HeaderPageLocatorsRegistry.bettingRules);
  }

  async verifyStatisticsOption() {
    await this.clickHamburgerMenu();
    await this.HeaderPageLocatorsRegistry.statistics.scrollIntoViewIfNeeded();
    await highlightElementBorder(this.HeaderPageLocatorsRegistry.statistics);
  }

  async verifyOddsFormat() {
    await this.clickHamburgerMenu();
    await highlightElements(this.HeaderPageLocatorsRegistry.oddsFormat);
  }

  async verifyMobileNumberField() {
    await this.HeaderPageLocatorsRegistry.mobileNumber.waitFor({ state: 'visible', timeout: 20000 });
    await highlightElementBorder(this.HeaderPageLocatorsRegistry.mobileNumberInput);
  }

  async verifyPasswordField() {
    await this.HeaderPageLocatorsRegistry.passwordInput.waitFor({ state: 'visible', timeout: 15000 });
    await highlightElementBorder(this.HeaderPageLocatorsRegistry.passwordInput);
  }

  // async verifyCountryCode() {
  //   await this.HeaderPageLocatorsRegistry.countryCode.waitFor({ state: 'visible', timeout: 10000 });
  //   await highlightElementBorder(this.HeaderPageLocatorsRegistry.countryCode);
  // }
  // async verifyEyeButton() {
  //   await highlightElementBorder(this.HeaderPageLocatorsRegistry.eyeButton);
  //   await this.page.waitForTimeout(3000);
  // }

  async verifyEyeButton() {
    // Scope to the login form area that contains both Mobile Number and Password fields
    const formContainer = this.page.locator('form').filter({
      hasText: '+27Forgot Username?Forgot Password?'
    });

    // From within that form, target the eye SVG next to the password input
    const eyeIcon = formContainer.locator("//input[@id='header-password']/preceding-sibling::svg");

    // Wait for it and visually highlight
    await eyeIcon.waitFor({ state: 'visible', timeout: 10000 });
    await highlightElementBorder(eyeIcon);
    await this.page.waitForTimeout(1000);
  }

  async verifyForgetPasswordLink() {
    await highlightElementBorder(this.HeaderPageLocatorsRegistry.forgetPasswordLink);
    await this.page.waitForTimeout(300);
  }

  async verifyBetslipButton() {
    await highlightElementBorder(this.HeaderPageLocatorsRegistry.betslipButton);
  }

  async verifyMyAccountDropdown() {
    await this.Login();
    await this.clickHamburgerMenu();
    await highlightElementBorder(this.HeaderPageLocatorsRegistry.myAccount);
  }

  async verifyAllMyAccountOptions() {
    await highlightElementBorder(this.HeaderPageLocatorsRegistry.depositFund);
    await highlightElementBorder(this.HeaderPageLocatorsRegistry.withdrawFund);
    await highlightElementBorder(this.HeaderPageLocatorsRegistry.myBets);
    await highlightElementBorder(this.HeaderPageLocatorsRegistry.MyCasinoBigWin);
    await highlightElementBorder(this.HeaderPageLocatorsRegistry.bonusSummary);
    await highlightElementBorder(this.HeaderPageLocatorsRegistry.transactionsHistory);

    await this.HeaderPageLocatorsRegistry.promoVouchers.scrollIntoViewIfNeeded();
    // await highlightElementBorder(this.HeaderPageLocatorsRegistry.myCoupons);
    await highlightElementBorder(this.HeaderPageLocatorsRegistry.betInfluencer);
    await highlightElementBorder(this.HeaderPageLocatorsRegistry.promoVouchers);
    await highlightElementBorder(this.HeaderPageLocatorsRegistry.updateDetails);
    await highlightElementBorder(this.HeaderPageLocatorsRegistry.responsibleGaming);

    await this.HeaderPageLocatorsRegistry.logOut.scrollIntoViewIfNeeded();
    await highlightElementBorder(this.HeaderPageLocatorsRegistry.documentVerification);
    await highlightElementBorder(this.HeaderPageLocatorsRegistry.betwayBenefits);
    await highlightElementBorder(this.HeaderPageLocatorsRegistry.betwayRewards);
    await highlightElementBorder(this.HeaderPageLocatorsRegistry.changePassword);
    await highlightElementBorder(this.HeaderPageLocatorsRegistry.logOut);
  }

  async verifyEyeButton2() {
    await this.Login();
    await this.clickHamburgerMenu();
    await highlightElementBorder(this.HeaderPageLocatorsRegistry.eyeButton2);
  }

  async verifyAccountsButton() {
    await this.Login();
    await highlightElementBorder(this.HeaderPageLocatorsRegistry.accountsButton);
  }

  async verifyBalanceField() {
    await this.Login();
    await highlightElementBorder(this.HeaderPageLocatorsRegistry.balanceLabel);
  }

  async verifyBalanceCurrency() {
    await this.Login();
    await highlightElementBorder(this.HeaderPageLocatorsRegistry.balanceCurrency);
  }

  async verifyFreebetField() {
    await this.Login();
    await highlightElementBorder(this.HeaderPageLocatorsRegistry.balanceDropdown);
    await highlightElementBorder(this.HeaderPageLocatorsRegistry.balanceContainer);
    await this.clickBalanceDropdown();
    await highlightElementBorder(this.HeaderPageLocatorsRegistry.freebetField);
  }

  async verifyFreebetCurrency() {
    await this.Login();
    await this.clickBalanceDropdown();
    await highlightElementBorder(this.HeaderPageLocatorsRegistry.freebetCurrency);
  }

  async verifyFreebetRefreshButton() {
    await this.Login();
    await this.clickBalanceDropdown();
    await highlightElements(this.HeaderPageLocatorsRegistry.freeBetRefreshBtn);
  }

  async verifyCasinoBonusField() {
    await this.clickBalanceDropdown();
    await highlightElements(this.HeaderPageLocatorsRegistry.casinoBonusField);
  }

  async verifyCasinoBonusCurrency() {
    await this.Login();
    await this.clickBalanceDropdown();
    await this.page.waitForTimeout(4000);
    await highlightElementBorder(this.HeaderPageLocatorsRegistry.casinoCurrency);
  }

  async verifyCasinoRefreshButton() {
    await this.Login();
    await this.clickBalanceDropdown();
    await highlightElementBorder(this.HeaderPageLocatorsRegistry.casinoRefreshBtn);
  }

  async verifyDepositButton() {
    await this.Login();
    await this.clickBalanceDropdown();
    await highlightElementBorder(this.HeaderPageLocatorsRegistry.depositButton);
  }

  async verifyNotificationBellIcon() {
    await this.Login();
    await highlightElementBorder(this.HeaderPageLocatorsRegistry.notificationBellIcon);
  }

  async verifyChatIcon() {
    await this.Login();
    await this.clickGotItButton();
    await highlightElementBorder(this.HeaderPageLocatorsRegistry.liveChatIcon);
  }

  // Click Methods - Hamburger Menu
  async clickHamburgerMenu() {
    await this.HeaderPageLocatorsRegistry.hamburgerMenu.click();
  }

  async clickCloseHamburgerMenu() {
    await this.HeaderPageLocatorsRegistry.closeHamburgerMenu.click();
  }

  async clickQuickLinks() {
    await this.HeaderPageLocatorsRegistry.quickLinks.click();
  }

  async clickBettingRules() {
    await this.HeaderPageLocatorsRegistry.bettingRules.click();
  }

  async clickStatistics() {
    await this.HeaderPageLocatorsRegistry.statistics.click();
  }

  // Login Methods
  async enterMobileNumber(mobile: string) {
    await this.HeaderPageLocatorsRegistry.mobileNumberInput.fill(mobile);
  }

  async enterPassword(password: string) {
    await this.HeaderPageLocatorsRegistry.passwordInput.fill(password);
  }

  async clickForgetPasswordLink() {
    await this.HeaderPageLocatorsRegistry.forgetPasswordLink.click();
  }



  // Betslip Methods
  async clickBetslipButton() {
    await this.HeaderPageLocatorsRegistry.betslipButton.click();
  }

  async clickGotItButton() {
    await this.HeaderPageLocatorsRegistry.gotItButton.click();
  }

  // My Account Methods
  async clickMyAccount() {
    await this.HeaderPageLocatorsRegistry.myAccount.click();
  }

  async clickLogOut() {
    await this.HeaderPageLocatorsRegistry.logOut.click();
  }

  async clickCloseMyAccountOptions() {
    await this.HeaderPageLocatorsRegistry.closeMyAccountOptions.click();
  }

  // Account Actions
  async clickDepositFund() {
    await this.HeaderPageLocatorsRegistry.depositFund.click();
  }

  async clickWithdrawFund() {
    await this.HeaderPageLocatorsRegistry.withdrawFund.click();
  }

  async clickCloseWithdrawalAlert() {
    await this.HeaderPageLocatorsRegistry.closeWithdrawalAlert.click();
  }

  async clickMyBets() {
    await this.HeaderPageLocatorsRegistry.myBets.click();
  }

  async clickMyCasinoBigWin() {
    await this.HeaderPageLocatorsRegistry.MyCasinoBigWin.click();
  }

  async clickBonusSummary() {
    await this.HeaderPageLocatorsRegistry.bonusSummary.click();
  }

  async clickTransactionsHistory() {
    await this.HeaderPageLocatorsRegistry.transactionsHistory.click();
  }

  async clickMyCoupons() {
    await this.HeaderPageLocatorsRegistry.myCoupons.click();
  }

  async clickBetInfluencer() {
    await this.HeaderPageLocatorsRegistry.betInfluencer.click();
  }

  async clickPromoVouchers() {
    await this.HeaderPageLocatorsRegistry.promoVouchers.click();
  }

  async clickUpdateDetails() {
    await this.HeaderPageLocatorsRegistry.updateDetails.click();
  }

  async clickResponsibleGaming() {
    await this.HeaderPageLocatorsRegistry.responsibleGaming.click();
  }

  async clickDocumentVerification() {
    await this.HeaderPageLocatorsRegistry.documentVerification.click();
  }

  async clickBetwayBenefits() {
    await this.HeaderPageLocatorsRegistry.betwayBenefits.click();
  }

  async clickBetwayRewards() {
    await this.HeaderPageLocatorsRegistry.betwayRewards.click();
  }

  async clickChangePassword() {
    await this.HeaderPageLocatorsRegistry.changePassword.click();
  }

  // Balance Methods
  async clickEyeButton2() {
    await this.HeaderPageLocatorsRegistry.eyeButton2.click();
  }

  async clickAccountsButton() {
    await this.HeaderPageLocatorsRegistry.accountsButton.click();
  }

  async clickBalanceDropdown() {
    await this.HeaderPageLocatorsRegistry.balanceDropdown.click();
  }

  async clickDepositButton() {
    await this.HeaderPageLocatorsRegistry.depositButton.click();
  }

  // Notification & Support Methods
  async clickNotificationBellIcon() {
    await this.HeaderPageLocatorsRegistry.notificationBellIcon.click();
  }

  async clickLiveChatIcon() {
    await this.HeaderPageLocatorsRegistry.liveChatIcon.click();
  }

  // Combined Actions for Tests
  async verifyAndClickQuickLinksDropdown() {
    await this.clickHamburgerMenu();
    await highlightElementBorder(this.HeaderPageLocatorsRegistry.quickLinks);
    await this.clickQuickLinks();
  }

  async verifyAndClickBettingRules() {
    await this.HeaderPageLocatorsRegistry.bettingRules.scrollIntoViewIfNeeded();
    await highlightElementBorder(this.HeaderPageLocatorsRegistry.bettingRules);
    await this.clickBettingRules();
    await this.page.waitForTimeout(3000);
  }

  async verifyAndClickBettingRulesWithoutLogin() {
    await this.clickHamburgerMenu();
    await this.HeaderPageLocatorsRegistry.bettingRules.nth(1).scrollIntoViewIfNeeded();
    await highlightElementBorder(this.HeaderPageLocatorsRegistry.bettingRules.nth(1));
    await this.clickBettingRules();
    await this.page.waitForTimeout(3000);
  }

  async verifyAndClickStatistics() {
    // await this.clickHamburgerMenu();
    await this.HeaderPageLocatorsRegistry.statistics.scrollIntoViewIfNeeded();
    await highlightElementBorder(this.HeaderPageLocatorsRegistry.statistics);
    await this.clickStatistics();
    await this.page.waitForTimeout(4000);
  }

  async verifyAndClickStatisticsWithoutLogin() {
    await this.clickHamburgerMenu();
    await this.HeaderPageLocatorsRegistry.statistics.scrollIntoViewIfNeeded();
    await highlightElementBorder(this.HeaderPageLocatorsRegistry.statistics);
    await this.clickStatistics();
    await this.page.waitForTimeout(3000);
  }

  async verifyMobileNumberInput() {
    await this.HeaderPageLocatorsRegistry.mobileNumberInput.waitFor({ state: 'visible', timeout: 15000 });
    await highlightElementBorder(this.HeaderPageLocatorsRegistry.mobileNumberInput);
    await this.enterMobileNumber('123456789');
    await this.page.waitForTimeout(300);
  }

  async verifyPasswordInput() {
    await highlightElementBorder(this.HeaderPageLocatorsRegistry.passwordInput);
    await this.enterPassword('12345678');
  }

  async verifyAndClickForgetPassword() {
    await highlightElementBorder(this.HeaderPageLocatorsRegistry.forgetPasswordLink);
    await this.page.waitForTimeout(300);
    await this.clickForgetPasswordLink();
  }

  async verifyAndClickBetslip() {
    await highlightElementBorder(this.HeaderPageLocatorsRegistry.betslipButton);
    await this.clickBetslipButton();
  }

  async verifyAndClickMyAccount() {
    await this.Login();
    await this.page.waitForTimeout(3000);
    await this.clickHamburgerMenu();
    await highlightElementBorder(this.HeaderPageLocatorsRegistry.myAccount);
    await this.clickMyAccount();
  }

  async testDepositFund() {
    await this.clickHamburgerMenu();
    await this.clickDepositFund();
    await this.page.waitForTimeout(5000);
  }

  async testWithdrawFund() {
    await this.clickHamburgerMenu();
    await this.clickWithdrawFund();
    await this.page.waitForTimeout(3000);
    await this.clickCloseWithdrawalAlert();
  }

  async testMyBets() {
    await this.clickHamburgerMenu();
    await this.clickMyBets();
    await this.page.waitForTimeout(3000);
  }

  async testMyCasinoBigWin() {
    await this.clickHamburgerMenu();
    await this.clickMyCasinoBigWin();
  }

  async testBonusSummary() {
    await this.clickHamburgerMenu();
    await this.clickBonusSummary();
  }

  async testTransactionsHistory() {
    await this.clickHamburgerMenu();
    await this.clickTransactionsHistory();
    await this.page.waitForTimeout(3000);
  }

  async testMyCoupons() {
    await this.clickHamburgerMenu();
    await this.clickMyCoupons();
    await this.page.waitForTimeout(3000);
  }

  async testBetInfluencer() {
    await this.clickHamburgerMenu();
    await this.clickBetInfluencer();
    await this.page.waitForTimeout(3000);
  }

  async testPromoVouchers() {
    await this.clickHamburgerMenu();
    await this.clickPromoVouchers();
  }

  async testUpdateDetails() {
    await this.clickHamburgerMenu();
    await this.clickUpdateDetails();
  }

  async testResponsibleGaming() {
    await this.clickHamburgerMenu();
    await this.clickResponsibleGaming();
  }

  async testDocumentVerification() {
    await this.clickHamburgerMenu();
    await this.clickDocumentVerification();
    await this.page.waitForTimeout(3000);
  }

  async testBetwayBenefits() {
    await this.clickHamburgerMenu();
    await this.clickBetwayBenefits();
    await this.page.waitForTimeout(3000);
  }

  async testBetwayRewards() {
    await this.clickHamburgerMenu();
    await this.clickBetwayRewards();
    await this.page.waitForTimeout(3000);
  }

  async testChangePassword() {
    await this.clickHamburgerMenu();
    await this.clickChangePassword();
  }

  async testLogout() {
    await this.clickHamburgerMenu();
    await this.clickLogOut();
  }

  async verifyHamburgerEyeButton() {
    const hamburgerEyeButton = this.HeaderPageLocatorsRegistry.allBalanceTxt.locator('..').locator('..').getByRole('img').first();
    await highlightElementBorder(hamburgerEyeButton);
    await hamburgerEyeButton.click();
  }

  async verifyAndClickAccountsButton() {
    await highlightElementBorder(this.HeaderPageLocatorsRegistry.accountsButton);
    await this.clickAccountsButton();
    await this.page.waitForTimeout(5000);
  }

  async verifyAndClickDepositButton() {
    await this.clickBalanceDropdown();
    await highlightElementBorder(this.HeaderPageLocatorsRegistry.depositButton);
    await this.clickDepositButton();
    await this.page.waitForTimeout(5000);
  }

  async verifyAndClickNotificationIcon() {
    await highlightElementBorder(this.HeaderPageLocatorsRegistry.notificationBellIcon);
    await this.HeaderPageLocatorsRegistry.notificationBellIcon.click();
    await this.page.waitForTimeout(3000);
  }

  async verifyAndClickChatIcon() {
    await this.HeaderPageLocatorsRegistry.gotItButton.click();
    await highlightElementBorder(this.HeaderPageLocatorsRegistry.liveChatIcon);
    await this.clickLiveChatIcon();
    await this.page.waitForTimeout(5000);
  }

  async closePromotionPopup() {
    try {
      const popup = this.HeaderPageLocatorsRegistry.closePromotionPopup;
      if (await popup.isVisible({ timeout: 15000 })) {
        await popup.click();
        await this.page.waitForTimeout(500);
      }
    } catch (error) {
      console.log("Promotion popup not found or already closed.");
    }
  }
}