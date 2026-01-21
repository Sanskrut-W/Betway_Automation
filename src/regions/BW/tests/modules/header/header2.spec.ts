// npx playwright test src/regions/ZA/tests/modules/header/header.spec.ts --config=playwright.ZA.config.ts --headed
// import { expect, test } from '../../../fixtures/MasterFixtureFile';
// import path from 'path';
// import { highlightElementBorder, highlightElements } from '../../../../Common-Flows/HighlightElements';
// import { ScreenshotHelper } from '../../../../Common-Flows/ScreenshotHelper';

// const projectRoot = path.resolve(__dirname, '../../..');
// const screenshotDir = path.join(projectRoot, 'screenshots/module/header');

// test.describe('Header Module Tests', () => {

//     //     //Without Login
//     test('T1-Verify Header Beatway Logo', async ({ headerPage }, testInfo) => {
//         await highlightElementBorder(headerPage.betwayTopLogo);
//         await ScreenshotHelper(headerPage.page, screenshotDir, 'T1-header-logo.png', testInfo);
//     });

//     test('T2-Verify Hamburger menu is visible and clickable', async ({ headerPage }, testInfo) => {
//         await highlightElementBorder(headerPage.hamburgerMenu);
//         await ScreenshotHelper(headerPage.page, screenshotDir, 'T2-hamburgerButton.png', testInfo);
//         await headerPage.clickHamburgerMenu();
//         await ScreenshotHelper(headerPage.page, screenshotDir, 'T2-hamburgerMenu.png', testInfo);
//     });

//     test('T3-Verify login and sign up button in hamburger window are visible', async ({ headerPage }, testInfo) => {
//         await headerPage.clickHamburgerMenu();
//         await highlightElementBorder(headerPage.loginButtonfromHamburger);
//         await highlightElementBorder(headerPage.signUpButtonfromHamburger);
//         await ScreenshotHelper(headerPage.page, screenshotDir, 'T3-login-signupButton.png', testInfo);
//     });

//     test('T4 Verify Quick Links drop down is visible and clickable in Hamburger Menu', async ({ headerPage }, testInfo) => {
//         await headerPage.clickHamburgerMenu();
//         await highlightElementBorder(headerPage.quickLinks);
//         await ScreenshotHelper(headerPage.page, screenshotDir, 'T4-quickLinks1.png', testInfo);
//         await headerPage.clickquickLinks();
//         await ScreenshotHelper(headerPage.page, screenshotDir, 'T4-quickLinks2.png', testInfo);
//     });

//     test('T5-Verify Betting Rules option in Quick Links drop down is visible and clickable inside Hamburger Menu', async ({ headerPage }, testInfo) => {
//         await headerPage.clickHamburgerMenu();
//         await headerPage.betingRules.scrollIntoViewIfNeeded();
//         await highlightElementBorder(headerPage.betingRules);
//         await ScreenshotHelper(headerPage.page, screenshotDir, 'T5-bettingRules.png', testInfo);
//         await headerPage.clickBettingRules();
//         await headerPage.page.waitForTimeout(3000);
//         await ScreenshotHelper(headerPage.page, screenshotDir, 'T5-bettingRulesClicked.png', testInfo);
//     });

//     test('T6-Verify Statistics option in Quick Links drop down is visible and clickable inside Hamburger Menu', async ({ headerPage }, testInfo) => {
//         await headerPage.clickHamburgerMenu();
//         await headerPage.statistics.scrollIntoViewIfNeeded();
//         await highlightElementBorder(headerPage.statistics);
//         await ScreenshotHelper(headerPage.page, screenshotDir, 'T6-statistics.png', testInfo);
//         await headerPage.clickStatistics();
//         await headerPage.page.waitForTimeout(4000);
//         await ScreenshotHelper(headerPage.page, screenshotDir, 'T6-statisticsClicked.png', testInfo);
//     });

//     test('T7-Verify Odds Format button with Decimal & Fractional options is visible and clickable in Hamburger Menu', async ({ headerPage }, testInfo) => {
//         await headerPage.clickHamburgerMenu();
//         await highlightElements(headerPage.oddsFormat);
//         await ScreenshotHelper(headerPage.page, screenshotDir, 'T7-oddsFormat.png', testInfo);
//     });

//     // test('T10-Verify country code +27 is visible on Homepage', async ({ headerPage }, testInfo) => {
//     //     await highlightElementBorder(headerPage.countryCode);
//     //     await ScreenshotHelper(headerPage.page, screenshotDir, 'T10-countryCode.png', testInfo);

//     // });

//     test('T11-Verify Mobile Number field is visible on Homepage', async ({ headerPage }, testInfo) => {
//         await highlightElementBorder(headerPage.mobileNumberInput);
//         await ScreenshotHelper(headerPage.page, screenshotDir, 'T11-mobileNumberInput.png', testInfo);
//     });

//     test('T12-Verify that user is able to enter Mobile Number in Mobile Number field', async ({ headerPage }, testInfo) => {
//         await expect(headerPage.mobileNumberInput).toBeVisible();
//         await highlightElementBorder(headerPage.mobileNumberInput);
//         await headerPage.enterMobileNumber('123456789');
//         await headerPage.page.waitForTimeout(300);
//         await ScreenshotHelper(headerPage.page, screenshotDir, 'T12-mobileNumberInput.png', testInfo);
//     });

//     test('T13-Verify password field is visible on Homepage', async ({ headerPage }, testInfo) => {
//         await highlightElementBorder(headerPage.passwordInput);
//         await ScreenshotHelper(headerPage.page, screenshotDir, 'T11-passwordInput.png', testInfo);
//     });

//     test('T14-Verify that user is able to enter password in Password field', async ({ headerPage }, testInfo) => {
//         await highlightElementBorder(headerPage.passwordInput);
//         await headerPage.enterPassword('12345678');
//         await ScreenshotHelper(headerPage.page, screenshotDir, 'T14-passwordInput.png', testInfo);
//     });

//     // **********
//     test('T15-Verify Eye button is visible on Password field', async ({ headerPage }, testInfo) => {
//         await highlightElementBorder(headerPage.eyeButton);
//         await headerPage.page.waitForTimeout(300);
//         await ScreenshotHelper(headerPage.page, screenshotDir, 'T15-eyeButton.png', testInfo);
//     });

//     test('T16-Verify "Forgot Password?" option below password field is visible and clickable on Homepage', async ({ headerPage }, testInfo) => {
//         await highlightElementBorder(headerPage.forgetPasswordLink);
//         await headerPage.page.waitForTimeout(300);
//         await headerPage.clickForgetPasswordLink();
//         await ScreenshotHelper(headerPage.page, screenshotDir, 'T16-forgetPasswordLink.png', testInfo);
//     });

//     test('21-Verify Betslip button is visible and clickable on the home page of Betway application', async ({ headerPage }, testInfo) => {
//         await highlightElementBorder(headerPage.betslipButton);
//         await ScreenshotHelper(headerPage.page, screenshotDir, 'T21-betslipButton.png', testInfo);
//         await headerPage.clickBetslipButton();
//         await ScreenshotHelper(headerPage.page, screenshotDir, 'T21-betslipButtonClicked.png', testInfo);
//     });

//     // With Login
//     test('T23-Verify Betway Logo is visible on Homepage', async ({ headerPage }, testInfo) => {
//         await headerPage.Login();
//         await headerPage.page.waitForTimeout(5000);
//         await highlightElementBorder(headerPage.betwayTopLogo);
//         await ScreenshotHelper(headerPage.page, screenshotDir, 'T23-header-logo-loggedin.png', testInfo);
//     });

//     test('T24-Verify Hamburger menu is visible and clickable after login', async ({ headerPage }, testInfo) => {
//         await headerPage.Login();
//         await highlightElementBorder(headerPage.hamburgerMenu);
//         await ScreenshotHelper(headerPage.page, screenshotDir, 'T24-hamburgerButton-loggedin.png', testInfo);
//         await headerPage.clickHamburgerMenu();
//         await ScreenshotHelper(headerPage.page, screenshotDir, 'T24-hamburgerMenu-loggedin.png', testInfo);
//     });

//     test('T25-Verify Quick Links drop down is visible and clickable in Hamburger Menu', async ({ headerPage }, testInfo) => {
//         await headerPage.Login();
//         await headerPage.clickHamburgerMenu();
//         await highlightElementBorder(headerPage.quickLinks);
//         await ScreenshotHelper(headerPage.page, screenshotDir, 'T25-quickLinks1-loggedin.png', testInfo);
//         await headerPage.clickquickLinks();
//         await ScreenshotHelper(headerPage.page, screenshotDir, 'T25-quickLinks2-loggedin.png', testInfo);
//     });

//     test('T26-Verify Betting Rules option in Quick Links drop down is visible and clickable inside Hamburger Menu', async ({ headerPage }, testInfo) => {
//         await headerPage.Login();
//         await headerPage.clickHamburgerMenu();
//         await headerPage.clickquickLinks();
//         await headerPage.betingRules.scrollIntoViewIfNeeded();
//         await highlightElementBorder(headerPage.betingRules);
//         await ScreenshotHelper(headerPage.page, screenshotDir, 'T26-bettingRules-loggedin.png', testInfo);
//         await headerPage.clickBettingRules();
//         await ScreenshotHelper(headerPage.page, screenshotDir, 'T26-bettingRulesClicked-loggedin.png', testInfo);
//     });

//     test('T27-Verify Statistics option in Quick Links drop down is visible and clickable inside Hamburger Menu', async ({ headerPage }, testInfo) => {
//         await headerPage.Login();
//         await headerPage.clickHamburgerMenu();
//         await headerPage.clickquickLinks();
//         await headerPage.statistics.scrollIntoViewIfNeeded();
//         await highlightElementBorder(headerPage.statistics);
//         await ScreenshotHelper(headerPage.page, screenshotDir, 'T27-statistics-loggedin.png', testInfo);
//         await headerPage.clickStatistics();
//         await ScreenshotHelper(headerPage.page, screenshotDir, 'T27-statisticsClicked-loggedin.png', testInfo);
//     });

//     test('T29-Verify Odds Format button with Decimal & Fractional options is visible and clickable in Hamburger Menu', async ({ headerPage }, testInfo) => {
//         await headerPage.Login();
//         await headerPage.clickHamburgerMenu();
//         await highlightElements(headerPage.oddsFormat);
//         await ScreenshotHelper(headerPage.page, screenshotDir, 'T29-oddsFormat-loggedin.png', testInfo);
//     });

//     // test('T30-Verify Close button is visible and clickable in Hamburger Menu', async ({ headerPage }, testInfo) => {
//     //     await headerPage.Login();
//     //     await headerPage.clickHamburgerMenu();
//     //     await highlightElementBorder(headerPage.closeHamburgerMenu);
//     //     await ScreenshotHelper(headerPage.page, screenshotDir, 'T30-closeHamburgerMenu-loggedin.png', testInfo);
//     //     await headerPage.closeHamburgerMenu.click();
//     // });

//     test('T31-Verify My account drop down is visible and clickable in Hamburger Menu', async ({ headerPage }, testInfo) => {
//         await headerPage.Login();
//         await headerPage.clickHamburgerMenu();
//         await highlightElementBorder(headerPage.myAccount);
//         await ScreenshotHelper(headerPage.page, screenshotDir, 'T31-myAccount-loggedin.png', testInfo);
//         await headerPage.clickMyAccount();
//         await ScreenshotHelper(headerPage.page, screenshotDir, 'T31-myAccountClicked-loggedin.png', testInfo);
//     });

//     test('T32-Verify all options in the My Account are visible and clickable', async ({ headerPage }, testInfo) => {
//         await headerPage.Login();
//         await headerPage.clickHamburgerMenu();
//         await highlightElementBorder(headerPage.depositFund);
//         await highlightElementBorder(headerPage.withdrawFund);
//         await highlightElementBorder(headerPage.myBets);
//         await highlightElementBorder(headerPage.MyCasinoBigWin);
//         await highlightElementBorder(headerPage.bonusSummary);
//         await highlightElementBorder(headerPage.transactionsHistory);
//         await ScreenshotHelper(headerPage.page, screenshotDir, 'T32-1-myAccountOptions-loggedin.png', testInfo);
//         await headerPage.promoVouchers.scrollIntoViewIfNeeded();
//         await highlightElementBorder(headerPage.myCoupons);
//         await highlightElementBorder(headerPage.betInfluencer);
//         await highlightElementBorder(headerPage.promoVouchers);
//         await highlightElementBorder(headerPage.updateDetails);
//         await highlightElementBorder(headerPage.responsibleGaming);
//         await ScreenshotHelper(headerPage.page, screenshotDir, 'T32-2-myAccountOptions-loggedin.png', testInfo);
//         await headerPage.logOut.scrollIntoViewIfNeeded();
//         await highlightElementBorder(headerPage.documentVerification);
//         await highlightElementBorder(headerPage.betwayBenefits);
//         await highlightElementBorder(headerPage.betwayRewards);
//         await highlightElementBorder(headerPage.changePassword);
//         await highlightElementBorder(headerPage.logOut);
//         await ScreenshotHelper(headerPage.page, screenshotDir, 'T32-3-myAccountOptions-loggedin.png', testInfo);

//         await headerPage.clickDepositFund();
//         await headerPage.page.waitForTimeout(5000);
//         await ScreenshotHelper(headerPage.page, screenshotDir, 'T32-depositFundClicked-loggedin.png', testInfo);
//         await headerPage.clickCloseMyAccountOptions();

//         await headerPage.clickHamburgerMenu();
//         await headerPage.clickWithdrawFund();
//         await headerPage.page.waitForTimeout(3000);
//         await headerPage.clickCloseWithdrawalAlert();

//         await ScreenshotHelper(headerPage.page, screenshotDir, 'T32-withdrawFundClicked-loggedin.png', testInfo);
//         await headerPage.clickCloseMyAccountOptions();

//         await headerPage.clickHamburgerMenu();
//         await headerPage.clickMyBets();
//         await headerPage.page.waitForTimeout(3000);
//         await ScreenshotHelper(headerPage.page, screenshotDir, 'T32-myBetsClicked-loggedin.png', testInfo);
//         await headerPage.clickCloseMyAccountOptions();

//         await headerPage.clickHamburgerMenu();
//         await headerPage.clickMyCasinoBigWin();
//         // await headerPage.page.waitForTimeout(3000);
//         await ScreenshotHelper(headerPage.page, screenshotDir, 'T32-myCasinoBigWinClicked-loggedin.png', testInfo);
//         await headerPage.clickCloseMyAccountOptions();

//         await headerPage.clickHamburgerMenu();
//         await headerPage.clickBonusSummary();
//         await ScreenshotHelper(headerPage.page, screenshotDir, 'T32-bonusSummaryClicked-loggedin.png', testInfo);
//         await headerPage.clickCloseMyAccountOptions();

//         await headerPage.clickHamburgerMenu();
//         await headerPage.clickTransactionsHistory();
//         await headerPage.page.waitForTimeout(3000);
//         await ScreenshotHelper(headerPage.page, screenshotDir, 'T32-transactionsHistoryClicked-loggedin.png', testInfo);
//         await headerPage.clickCloseMyAccountOptions();

//         await headerPage.clickHamburgerMenu();
//         await headerPage.clickMyCoupons();
//         await headerPage.page.waitForTimeout(3000);
//         await ScreenshotHelper(headerPage.page, screenshotDir, 'T32-myCouponsClicked-loggedin.png', testInfo);
//         await headerPage.clickCloseMyAccountOptions();

//         await headerPage.clickHamburgerMenu();
//         await headerPage.clickBetInfluencer();
//         await headerPage.page.waitForTimeout(3000);
//         await ScreenshotHelper(headerPage.page, screenshotDir, 'T32-betInfluencerClicked-loggedin.png', testInfo);
//         await headerPage.clickCloseMyAccountOptions();

//         await headerPage.clickHamburgerMenu();
//         await headerPage.clickPromoVouchers();
//         await ScreenshotHelper(headerPage.page, screenshotDir, 'T32-promoVouchersClicked-loggedin.png', testInfo);
//         await headerPage.clickCloseMyAccountOptions();

//         await headerPage.clickHamburgerMenu();
//         await headerPage.clickUpdateDetails();
//         await ScreenshotHelper(headerPage.page, screenshotDir, 'T32-updateDetailsClicked-loggedin.png', testInfo);
//         await headerPage.clickCloseMyAccountOptions();

//         await headerPage.clickHamburgerMenu();
//         await headerPage.clickResponsibleGaming();
//         await ScreenshotHelper(headerPage.page, screenshotDir, 'T32-responsibleGamingClicked-loggedin.png', testInfo);
//         await headerPage.clickCloseMyAccountOptions();

//         await headerPage.clickHamburgerMenu();
//         await headerPage.clickDocumentVerification();
//         await headerPage.page.waitForTimeout(3000);
//         await ScreenshotHelper(headerPage.page, screenshotDir, 'T32-documentVerificationClicked-loggedin.png', testInfo);
//         await headerPage.clickCloseMyAccountOptions();

//         await headerPage.clickHamburgerMenu();
//         await headerPage.clickBetwayBenefits();
//         await headerPage.page.waitForTimeout(3000);
//         await ScreenshotHelper(headerPage.page, screenshotDir, 'T32-betwayBenefitsClicked-loggedin.png', testInfo);
//         await headerPage.clickCloseMyAccountOptions();

//         await headerPage.clickHamburgerMenu();
//         await headerPage.clickBetwayRewards();
//         await headerPage.page.waitForTimeout(3000);
//         await ScreenshotHelper(headerPage.page, screenshotDir, 'T32-betwayRewardsClicked-loggedin.png', testInfo);
//         await headerPage.clickCloseMyAccountOptions();

//         await headerPage.clickHamburgerMenu();
//         await headerPage.clickChangePassword();
//         await ScreenshotHelper(headerPage.page, screenshotDir, 'T32-changePasswordClicked-loggedin.png', testInfo);
//         await headerPage.clickCloseMyAccountOptions();

//         await headerPage.clickHamburgerMenu();
//         await headerPage.clickLogOut();
//         await ScreenshotHelper(headerPage.page, screenshotDir, 'T32-logOutClicked-loggedin.png', testInfo);
//     });

//     test('T33-Verify eye button in Hamburger menu', async ({ headerPage }, testInfo) => {
//         await headerPage.Login();
//         await headerPage.clickHamburgerMenu();
//         await highlightElementBorder(headerPage.eyeButton2);
//         await ScreenshotHelper(headerPage.page, screenshotDir, 'T33-eyeButton2-loggedin.png', testInfo);
//         await headerPage.clickEyeButton2();
//         await ScreenshotHelper(headerPage.page, screenshotDir, 'T33-eyeButton2Clicked-loggedin.png', testInfo);
//     });

//     test('T34-Verify that Accounts button is visible and clickable on the home page of Betway application', async ({ headerPage }, testInfo) => {
//         await headerPage.Login();
//         await highlightElementBorder(headerPage.accountsButton);
//         await ScreenshotHelper(headerPage.page, screenshotDir, 'T34-accountsButton-loggedin.png', testInfo);
//         await headerPage.clickAccountsButton();
//         await headerPage.page.waitForTimeout(5000);
//         await ScreenshotHelper(headerPage.page, screenshotDir, 'T34-accountsButtonClicked-loggedin.png', testInfo);
//     });

//     test('T35-Verify that Balance field in green color is displayed on the home page of Betway application', async ({ headerPage }, testInfo) => {
//         await headerPage.Login();
//         await headerPage.page.waitForTimeout(5000);
//         await highlightElementBorder(headerPage.balanceContainer);
//         await ScreenshotHelper(headerPage.page, screenshotDir, 'T35-balanceField-loggedin.png', testInfo);
//     });

//     // test('T36-Verify that Amount in Balance field is dispalyed on the home page of Betway application', async ({ headerPage }, testInfo) => {
//     //     await headerPage.Login();
//     //     await highlightElementBorder(headerPage.balanceValue);
//     //     await ScreenshotHelper(headerPage.page, screenshotDir, 'T36-balanceAmount-loggedin.png', testInfo);
//     // });

//     test('T37-Verify that R currency in balance field is displayed on the home page of Betway application', async ({ headerPage }, testInfo) => {
//         await headerPage.Login();
//         await highlightElementBorder(headerPage.balanceCurrency);
//         await ScreenshotHelper(headerPage.page, screenshotDir, 'T37-balanceCurrency-loggedin.png', testInfo);
//     });

//     test('T38-Verify that Freebet field in green color is displayed on the home page of Betway application', async ({ headerPage }, testInfo) => {
//         await headerPage.Login();
//         await highlightElementBorder(headerPage.balanceDropdown);
//         await highlightElementBorder(headerPage.balanceContainer);
//         await headerPage.clickbalanceDropdown();
//         await highlightElementBorder(headerPage.freebetField);
//         await ScreenshotHelper(headerPage.page, screenshotDir, 'T38-freebetField-loggedin.png', testInfo);
//     });

//     // test('T39-Verify that Amount in free bet field is displayed on the home page of Betway application', async ({ headerPage }, testInfo) => {
//     //     await headerPage.Login();
//     //     await headerPage.page.waitForTimeout(5000);
//     //     await highlightElementBorder(headerPage.freebetAmount);
//     //     await ScreenshotHelper(headerPage.page, screenshotDir, 'T39-freebetAmount-loggedin.png', testInfo);
//     // });

//     test('T40-Verify that R currency in free bet field is displayed on the home page of Betway application', async ({ headerPage }, testInfo) => {
//         await headerPage.Login();
//         await headerPage.clickbalanceDropdown();
//         await highlightElementBorder(headerPage.freebetCurrency);
//         await ScreenshotHelper(headerPage.page, screenshotDir, 'T40-freebetCurrency-loggedin.png', testInfo);
//     });

//     test('T41-Verify that Refresh button in free bet field is visible and clickable on the home page of Betway application', async ({ headerPage }, testInfo) => {
//         await headerPage.Login();
//         await headerPage.clickbalanceDropdown();
//         await highlightElements(headerPage.freeBetRefreshBtn);
//         await ScreenshotHelper(headerPage.page, screenshotDir, 'T41-refreshButton2-loggedin.png', testInfo);
//     });

//     test('T42-Verify that Casino bonus field in blue color is displayed on the home page of Betway application', async ({ headerPage }, testInfo) => {
//         await headerPage.Login();
//         await headerPage.clickbalanceDropdown();
//         await highlightElements(headerPage.casinoBonusField);
//         await ScreenshotHelper(headerPage.page, screenshotDir, 'T42-casinoBonusField-loggedin.png', testInfo);
//     });

//     // test('T43-Verify Amount in casino bonus field is displayed on the home page of Betway application', async ({ headerPage }, testInfo) => {
//     //     await headerPage.Login();
//     //     await headerPage.page.waitForTimeout(3000);
//     //     await headerPage.clickbalanceDropdown();
//     //     await highlightElementBorder(headerPage.casinoBonusAmount);
//     //     await ScreenshotHelper(headerPage.page, screenshotDir, 'T43-casinoBonusAmount-loggedin.png', testInfo);
//     // });

//     test('T44-Verify R currency in casino bonus field is displayed on the home page of Betway application', async ({ headerPage }, testInfo) => {
//         await headerPage.Login();
//         await headerPage.clickbalanceDropdown();
//         await headerPage.page.waitForTimeout(4000);
//         await highlightElementBorder(headerPage.casinoCurrency);
//         await ScreenshotHelper(headerPage.page, screenshotDir, 'T44-casinoBonusCurrency-loggedin.png', testInfo);
//     });

//     test('T45-Verify that Refresh button in casino bonus field is visible and clickable on the home page of Betway application', async ({ headerPage }, testInfo) => {
//         await headerPage.Login();
//         await headerPage.clickbalanceDropdown();
//         await highlightElementBorder(headerPage.casinoRefreshBtn);
//         await ScreenshotHelper(headerPage.page, screenshotDir, 'T45-refreshButton3-loggedin.png', testInfo);
//     });

//     test('T46-Verify that Deposit button in green colour is visible and clickable on the home page of Betway application', async ({ headerPage }, testInfo) => {
//         await headerPage.Login();
//         await headerPage.clickbalanceDropdown();
//         await highlightElementBorder(headerPage.depositButton);
//         await ScreenshotHelper(headerPage.page, screenshotDir, 'T46-depositButton-loggedin.png', testInfo);
//         await headerPage.clickDepositButton();
//         await headerPage.page.waitForTimeout(5000);
//         await ScreenshotHelper(headerPage.page, screenshotDir, 'T46-depositButtonClicked-loggedin.png', testInfo);
//     });

//     test('T47-Verify that Notification bell icon is visible and clickable on the home page of Betway application', async ({ headerPage }, testInfo) => {
//         await headerPage.Login();
//         await highlightElementBorder(headerPage.notificationBellIcon);
//         await ScreenshotHelper(headerPage.page, screenshotDir, 'T47-notificationBellIcon-loggedin.png', testInfo);
//         await headerPage.clickNotificationBellIcon();
//         await headerPage.page.waitForTimeout(3000);
//         await ScreenshotHelper(headerPage.page, screenshotDir, 'T47-notificationBellIconClicked-loggedin.png', testInfo);
//     });

//     test('T48-Verify that Chat icon is visible and clickable on the home page of Betway application', async ({ headerPage }, testInfo) => {
//         await headerPage.Login();
//         await headerPage.clickGotItButton();
//         await highlightElementBorder(headerPage.liveChatIcon);
//         await ScreenshotHelper(headerPage.page, screenshotDir, 'T48-chatIcon-loggedin.png', testInfo);
//         await headerPage.clickLiveChatIcon();
//         await headerPage.page.waitForTimeout(5000);
//         await ScreenshotHelper(headerPage.page, screenshotDir, 'T48-chatIconClicked-loggedin.png', testInfo);
//     });
// });
