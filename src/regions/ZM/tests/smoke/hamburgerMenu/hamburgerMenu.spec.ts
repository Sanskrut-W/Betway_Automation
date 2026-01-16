// npx playwright test src/regions/ZM/tests/smoke/hamburgerMenu/hamburgerMenu.spec.ts --config=playwright.ZM.config.ts --headed
import { test } from '../../../fixtures/MasterFixtureFile';
import path from 'path';
import { ScreenshotHelper } from '../../../../Common-Flows/ScreenshotHelper';
// import { HamburgerMenu, HamburgerMenuPage } from '../../../pages/HamburgerMenuPage';

const projectRoot = path.resolve(__dirname, '../../..');
const screenshotDir = path.join(projectRoot, 'screenshots/module/header');

test.describe('Header Module Tests', () => {

    test('2-Verify Hamburger menu is visible and clickable', async ({ headerPage }, testInfo) => {
        await headerPage.verifyHamburgerMenu();
        await ScreenshotHelper(headerPage.page, screenshotDir, 'T2-hamburgerButton.png', testInfo);
        await headerPage.clickHamburgerMenu();
        await ScreenshotHelper(headerPage.page, screenshotDir, 'T2-hamburgerMenu.png', testInfo);
    });

    // test('T2-Veify presence and functionality of all Balance fields in Hamburger Menu', async ({ hamburgerMenuPage }, testInfo) => {
    //     await hamburgerMenuPage.verifyAllBalanceFields();
    //     await ScreenshotHelper(hamburgerMenuPage.page, screenshotDir, 'T2-balanceFields.png', testInfo);
    // });

    // test('T3-Verify Refresh Balance button is visible and clickable in Hamburger Menu', async ({ hamburgerMenuPage }, testInfo) => {
    //     await hamburgerMenuPage.verifyRefreshBalance();
    //     await ScreenshotHelper(hamburgerMenuPage.page, screenshotDir, 'T3-refreshBalanceButton.png', testInfo);
    // });

    //     test('13-Verify functionality of Hide/Show balance button in Hamburger', async ({ hamburgerMenuPage }, testInfo) => {
    //     await hamburgerMenuPage.verifyEyeButton();
    //     await ScreenshotHelper(hamburgerMenuPage.page, screenshotDir, 'T15-eyeButton.png', testInfo);
    // });

    //  test('13-Verify functionality of close Hamburger button', async ({ hamburgerMenuPage }, testInfo) => {
    //     await hamburgerMenuPage.verifyCloseHamburgerBtn();
    //     await ScreenshotHelper(hamburgerMenuPage.page, screenshotDir, 'T15-eyeButton.png', testInfo);
    // });

        test('23-Verify My account drop down is visible and clickable in Hamburger Menu', async ({ hamburgerMenuPage }, testInfo) => {
        await hamburgerMenuPage.verifyAndClickMyAccount();
        await ScreenshotHelper(hamburgerMenuPage.page, screenshotDir, 'T31-myAccountClicked-loggedin.png', testInfo);
    });

    test('24-Verify Deposited Funds option functionality in My Account dropdown inside Hamburger menu.', async ({ hamburgerMenuPage }, testInfo) => {
        await hamburgerMenuPage.Login();
        await hamburgerMenuPage.clickHamburgerMenu();
        await hamburgerMenuPage.verifyAndClickDepositButton();
    });

    test.describe('Hamburger Menu - My Account Options Tests', () => {
 

    test.beforeEach(async ({ hamburgerMenuPage }) => {
        // await hamburgerMenuPage.goto();
        await hamburgerMenuPage.Login();
         await hamburgerMenuPage.clickHamburgerMenu();
    });

    test('24-Verify Deposited Funds option functionality', async ({ hamburgerMenuPage }, testInfo) => {
        await hamburgerMenuPage.verifyAndClickDepositButton();
        await ScreenshotHelper(hamburgerMenuPage.page, screenshotDir, 'DepositFund.png', testInfo);
        
    });

    test('25-Verify Withdraw Funds option functionality', async ({ hamburgerMenuPage }, testInfo) => {
        await hamburgerMenuPage.verifyAndClickWithdrawFund();
        await ScreenshotHelper(hamburgerMenuPage.page, screenshotDir, 'WithdrawFund.png', testInfo);
    });

    test('26-Verify My Bets option functionality', async ({ hamburgerMenuPage }, testInfo) => {
        await hamburgerMenuPage.verifyAndClickMyBets();
        await ScreenshotHelper(hamburgerMenuPage.page, screenshotDir, 'MyBets.png', testInfo);
        // await hamburgerMenuPage.clickCloseMyAccountOptions();
    });

    // test('27-Verify My Casino Big Win option functionality', async ({ hamburgerMenuPage }, testInfo) => {
    //     await hamburgerMenuPage.verifyAndClickMyCasinoBigWin();
    //     await ScreenshotHelper(hamburgerMenuPage.page, screenshotDir, 'CasinoBigWin.png', testInfo);
    //     // await hamburgerMenuPage.clickCloseMyAccountOptions();
    // });

    test('28-Verify Bonus Summary option functionality', async ({ hamburgerMenuPage }, testInfo) => {
        await hamburgerMenuPage.verifyAndClickBonusSummary();
        await ScreenshotHelper(hamburgerMenuPage.page, screenshotDir, 'BonusSummary.png', testInfo);
        // await hamburgerMenuPage.clickCloseMyAccountOptions();
    });

    test('29-Verify Transactions History option functionality', async ({ hamburgerMenuPage }, testInfo) => {
        await hamburgerMenuPage.verifyAndClickTransactionsHistory();
        await ScreenshotHelper(hamburgerMenuPage.page, screenshotDir, 'TransactionHistory.png', testInfo);
        // await hamburgerMenuPage.clickCloseMyAccountOptions();
    });

    // test('30-Verify My Coupons option functionality', async ({ hamburgerMenuPage }, testInfo) => {
    //     await hamburgerMenuPage.verifyAndClickMyCoupons();
    //     await ScreenshotHelper(hamburgerMenuPage.page, screenshotDir, 'MyCoupons.png', testInfo);
    //     // await hamburgerMenuPage.clickCloseMyAccountOptions();
    // });

    test('31-Verify Bet Influencer option functionality', async ({ hamburgerMenuPage }, testInfo) => {
        await hamburgerMenuPage.verifyAndClickBetInfluencer();
        await ScreenshotHelper(hamburgerMenuPage.page, screenshotDir, 'BetInfluencer.png', testInfo);
        // await hamburgerMenuPage.clickCloseMyAccountOptions();
    });

    test('32-Verify Promo Vouchers option functionality', async ({ hamburgerMenuPage }, testInfo) => {
        await hamburgerMenuPage.verifyAndClickPromoVouchers();
        await ScreenshotHelper(hamburgerMenuPage.page, screenshotDir, 'PromoVouchers.png', testInfo);
        // await hamburgerMenuPage.clickCloseMyAccountOptions();
    });

    test('33-Verify Update Details option functionality', async ({ hamburgerMenuPage }, testInfo) => {
        await hamburgerMenuPage.verifyAndClickUpdateDetails();
        await ScreenshotHelper(hamburgerMenuPage.page, screenshotDir, 'UpdateDetails.png', testInfo);
        // await hamburgerMenuPage.clickCloseMyAccountOptions();
    });

    test('34-Verify Responsible Gaming option functionality', async ({ hamburgerMenuPage }, testInfo) => {
        await hamburgerMenuPage.verifyAndClickResponsibleGaming();
        await ScreenshotHelper(hamburgerMenuPage.page, screenshotDir, 'ResponsibleGaming.png', testInfo);
        // await hamburgerMenuPage.clickCloseMyAccountOptions();
    });

    test('35-Verify Document Verification option functionality', async ({ hamburgerMenuPage }, testInfo) => {
        await hamburgerMenuPage.verifyAndClickDocumentVerification();
        await ScreenshotHelper(hamburgerMenuPage.page, screenshotDir, 'DocVerification.png', testInfo);
        // await hamburgerMenuPage.clickCloseMyAccountOptions();
    });

    test('36-Verify Betway Benefits option functionality', async ({ hamburgerMenuPage }, testInfo) => {
        await hamburgerMenuPage.verifyAndClickBetwayBenefits();
        await ScreenshotHelper(hamburgerMenuPage.page, screenshotDir, 'BetwayBenefits.png', testInfo);
        // await hamburgerMenuPage.clickCloseMyAccountOptions();
    });

    test('37-Verify Betway Rewards option functionality', async ({ hamburgerMenuPage }, testInfo) => {
        await hamburgerMenuPage.verifyAndClickBetwayRewards();
        await ScreenshotHelper(hamburgerMenuPage.page, screenshotDir, 'BetwayRewards.png', testInfo);
        // await hamburgerMenuPage.clickCloseMyAccountOptions();
    });

    test('38-Verify Change Password option functionality', async ({ hamburgerMenuPage }, testInfo) => {
        await hamburgerMenuPage.verifyAndClickChangePassword();
        await ScreenshotHelper(hamburgerMenuPage.page, screenshotDir, 'ChangePassword.png', testInfo);
        // await hamburgerMenuPage.clickCloseMyAccountOptions();
    });

    test('39-Verify Logout functionality', async ({ hamburgerMenuPage }, testInfo) => {
        await hamburgerMenuPage.verifyAndClickLogout();
        await ScreenshotHelper(hamburgerMenuPage.page, screenshotDir, 'Logout.png', testInfo);
        // Note: We do not click close options here as logout redirects us
    });
});
    test('3-Verify login and sign up button in hamburger window are visible', async ({ headerPage }, testInfo) => {
        await headerPage.verifyLoginAndSignUpButtons();
        await ScreenshotHelper(headerPage.page, screenshotDir, 'T3-login-signupButton.png', testInfo);
    });

    test('4-Verify Quick Links drop down is visible and clickable in Hamburger Menu', async ({ headerPage }, testInfo) => {
        await headerPage.verifyQuickLinksDropdown();
        await ScreenshotHelper(headerPage.page, screenshotDir, 'T4-quickLinks1.png', testInfo);
        await headerPage.clickQuickLinks();
        await ScreenshotHelper(headerPage.page, screenshotDir, 'T4-quickLinks2.png', testInfo);
    });

    // test('5-Verify Betting Rules option in Quick Links drop down is visible and clickable inside Hamburger Menu', async ({ headerPage }, testInfo) => {
    //     await headerPage.verifyAndClickBettingRulesWithoutLogin();
    //     await ScreenshotHelper(headerPage.page, screenshotDir, 'T5-bettingRulesClicked.png', testInfo);
    // });

    test('6-Verify Statistics option in Quick Links drop down is visible and clickable inside Hamburger Menu', async ({ headerPage }, testInfo) => {
        await headerPage.verifyAndClickStatisticsWithoutLogin();
        await ScreenshotHelper(headerPage.page, screenshotDir, 'T6-statistics.png', testInfo);
        await ScreenshotHelper(headerPage.page, screenshotDir, 'T6-statisticsClicked.png', testInfo);
    });

    // // // test('7-Verify country code +27 is visible on Homepage', async ({ headerPage }, testInfo) => {
    // // //     await headerPage.verifyCountryCode();
    // // //     await ScreenshotHelper(headerPage.page, screenshotDir, 'T10-countryCode.png', testInfo);

    // // // });

    test('8-Verify Odds Format button with Decimal & Fractional options is visible and clickable in Hamburger Menu', async ({ headerPage }, testInfo) => {
        await headerPage.verifyOddsFormat();
        await ScreenshotHelper(headerPage.page, screenshotDir, 'T7-oddsFormat.png', testInfo);
    });







    // // // With Login
    // test('16-Verify Betway Logo is visible on Homepage', async ({ headerPage }, testInfo) => {
    //     await headerPage.Login();
    //     await headerPage.page.waitForTimeout(3000);
    //     await headerPage.verifyBetwayLogoHeader();
    //     await ScreenshotHelper(headerPage.page, screenshotDir, 'T23-header-logo-loggedin.png', testInfo);
    // });

    // test('17-Verify Hamburger menu is visible and clickable after login', async ({ headerPage }, testInfo) => {
    //     await headerPage.Login();
    //     await headerPage.verifyHamburgerMenu();
    //     await ScreenshotHelper(headerPage.page, screenshotDir, 'T24-hamburgerButton-loggedin.png', testInfo);
    //     await headerPage.clickHamburgerMenu();
    //     await ScreenshotHelper(headerPage.page, screenshotDir, 'T24-hamburgerMenu-loggedin.png', testInfo);
    // });

    // test('18-Verify Quick Links drop down is visible and clickable in Hamburger Menu', async ({ headerPage }, testInfo) => {
    //     await headerPage.Login();
    //     await headerPage.verifyAndClickQuickLinksDropdown();
    //     await ScreenshotHelper(headerPage.page, screenshotDir, 'T25-quickLinks2-loggedin.png', testInfo);
    // });

    // test('19-Verify Betting Rules option in Quick Links drop down is visible and clickable inside Hamburger Menu', async ({ headerPage }, testInfo) => {
    //     await headerPage.Login();
    //     await headerPage.page.waitForTimeout(3000);
    //     await headerPage.clickHamburgerMenu();
    //     await headerPage.clickQuickLinks();
    //     await headerPage.verifyAndClickBettingRules();
    //     await ScreenshotHelper(headerPage.page, screenshotDir, 'T26-bettingRulesClicked-loggedin.png', testInfo);
    // });

    // test('20-Verify Statistics option in Quick Links drop down is visible and clickable inside Hamburger Menu', async ({ headerPage }, testInfo) => {
    //     await headerPage.Login();
    //     await headerPage.page.waitForTimeout(3000);
    //     await headerPage.clickHamburgerMenu();
    //     await headerPage.clickQuickLinks();
    //     await headerPage.verifyAndClickStatistics();
    //     await ScreenshotHelper(headerPage.page, screenshotDir, 'T27-statisticsClicked-loggedin.png', testInfo);
    // });

    // test('21-Verify Odds Format button with Decimal & Fractional options is visible and clickable in Hamburger Menu', async ({ headerPage }, testInfo) => {
    //     await headerPage.Login();
    //     await headerPage.verifyOddsFormat();
    //     await ScreenshotHelper(headerPage.page, screenshotDir, 'T29-oddsFormat-loggedin.png', testInfo);
    // });

    // // //     //     // test('22-Verify Close button is visible and clickable in Hamburger Menu', async ({ headerPage }, testInfo) => {
    // // //     //     //     await headerPage.Login();
    // // //     //     //     await headerPage.clickHamburgerMenu();
    // // //     //     //     await highlightElementBorder(headerPage.closeHamburgerMenu);
    // // //     //     //     await ScreenshotHelper(headerPage.page, screenshotDir, 'T30-closeHamburgerMenu-loggedin.png', testInfo);
    // // //     //     //     await headerPage.closeHamburgerMenu.click();
    // // //     //     // });
    // test('23-Verify My account drop down is visible and clickable in Hamburger Menu', async ({ headerPage }, testInfo) => {
    //     await headerPage.verifyAndClickMyAccount();
    //     await ScreenshotHelper(headerPage.page, screenshotDir, 'T31-myAccountClicked-loggedin.png', testInfo);
    // });

    // test('24-Verify all options in the My Account are visible and clickable', async ({ headerPage }, testInfo) => {
    //     await headerPage.Login();
    //     await headerPage.clickHamburgerMenu();
    //     await headerPage.verifyAllMyAccountOptions();
    //     await ScreenshotHelper(headerPage.page, screenshotDir, 'T32-1-myAccountOptions-loggedin.png', testInfo);
    //             await headerPage.clickCloseHamburgerMenu();

    //             await headerPage.clickHamburgerMenu();
    //             await headerPage.testDepositFund();
    //             await ScreenshotHelper(headerPage.page, screenshotDir, 'T32-depositFundClicked-loggedin.png', testInfo);
    //             await headerPage.clickCloseMyAccountOptions();
    //             await headerPage.testWithdrawFund();
    //             await ScreenshotHelper(headerPage.page, screenshotDir, 'T32-withdrawFundClicked-loggedin.png', testInfo);
    //             await headerPage.clickCloseMyAccountOptions();
    //             await ScreenshotHelper(headerPage.page, screenshotDir, 'T32-withdrawFundClicked-loggedin.png', testInfo);
    //             await headerPage.testMyBets();
    //             await ScreenshotHelper(headerPage.page, screenshotDir, 'T32-myBetsClicked-loggedin.png', testInfo);
    //             await headerPage.clickCloseMyAccountOptions();
    //             await headerPage.testMyCasinoBigWin();
    //             await ScreenshotHelper(headerPage.page, screenshotDir, 'T32-myCasinoBigWinClicked-loggedin.png', testInfo);
    //             await headerPage.clickCloseMyAccountOptions();
    //             await headerPage.testBonusSummary();
    //             await ScreenshotHelper(headerPage.page, screenshotDir, 'T32-bonusSummaryClicked-loggedin.png', testInfo);
    //             await headerPage.clickCloseMyAccountOptions();
    //             await headerPage.testTransactionsHistory();
    //             await ScreenshotHelper(headerPage.page, screenshotDir, 'T32-transactionsHistoryClicked-loggedin.png', testInfo);
    //             await headerPage.clickCloseMyAccountOptions();
    //             await headerPage.testMyCoupons();
    //             await ScreenshotHelper(headerPage.page, screenshotDir, 'T32-myCouponsClicked-loggedin.png', testInfo);
    //             await headerPage.clickCloseMyAccountOptions();
    //             await headerPage.testBetInfluencer();
    //             await ScreenshotHelper(headerPage.page, screenshotDir, 'T32-betInfluencerClicked-loggedin.png', testInfo);
    //             await headerPage.clickCloseMyAccountOptions();
    //             await headerPage.testPromoVouchers();
    //             await ScreenshotHelper(headerPage.page, screenshotDir, 'T32-promoVouchersClicked-loggedin.png', testInfo);
    //             await headerPage.clickCloseMyAccountOptions();
    //             await headerPage.testUpdateDetails();
    //             await ScreenshotHelper(headerPage.page, screenshotDir, 'T32-updateDetailsClicked-loggedin.png', testInfo);
    //             await headerPage.clickCloseMyAccountOptions();
    //             await headerPage.testResponsibleGaming();
    //             await ScreenshotHelper(headerPage.page, screenshotDir, 'T32-responsibleGamingClicked-loggedin.png', testInfo);
    //             await headerPage.clickCloseMyAccountOptions();
    //             await headerPage.testDocumentVerification();
    //             await ScreenshotHelper(headerPage.page, screenshotDir, 'T32-documentVerificationClicked-loggedin.png', testInfo);
    //             await headerPage.clickCloseMyAccountOptions();
    //             await headerPage.testBetwayBenefits();
    //             await ScreenshotHelper(headerPage.page, screenshotDir, 'T32-betwayBenefitsClicked-loggedin.png', testInfo);
    //             await headerPage.clickCloseMyAccountOptions();
    //             await headerPage.testBetwayRewards();
    //             await ScreenshotHelper(headerPage.page, screenshotDir, 'T32-betwayRewardsClicked-loggedin.png', testInfo);
    //             await headerPage.clickCloseMyAccountOptions();
    //             await headerPage.testChangePassword();
    //             await ScreenshotHelper(headerPage.page, screenshotDir, 'T32-changePasswordClicked-loggedin.png', testInfo);
    //             await headerPage.clickCloseMyAccountOptions();
    //             await headerPage.testLogout();
    //             await ScreenshotHelper(headerPage.page, screenshotDir, 'T32-logOutClicked-loggedin.png', testInfo);
    // });

    // //     test('25-Verify eye button in Hamburger menu', async ({ headerPage }, testInfo) => {
    // //         await headerPage.Login();
    // //         await headerPage.clickHamburgerMenu();
    // //         await headerPage.verifyHamburgerEyeButton();
    // //         await ScreenshotHelper(headerPage.page, screenshotDir, 'T33-eyeButton2Clicked-loggedin.png', testInfo);
    // //     });



    // // test('28-Verify that R currency in balance field is displayed on the home page of Betway application', async ({ headerPage }, testInfo) => {
    // //     await headerPage.verifyBalanceCurrency();
    // //     await ScreenshotHelper(headerPage.page, screenshotDir, 'T37-balanceCurrency-loggedin.png', testInfo);
    // // });

    // test('29-Verify that Freebet field in green color is displayed on the home page of Betway application', async ({ headerPage }, testInfo) => {
    //     await headerPage.verifyFreebetField();
    //     await ScreenshotHelper(headerPage.page, screenshotDir, 'T38-freebetField-loggedin.png', testInfo);
    // });

    // //     // test('30-Verify that Amount in free bet field is displayed on the home page of Betway application', async ({ headerPage }, testInfo) => {
    // //     //     await headerPage.Login();
    // //     //     await headerPage.page.waitForTimeout(5000);
    // //     //     await highlightElementBorder(headerPage.freebetAmount);
    // //     //     await ScreenshotHelper(headerPage.page, screenshotDir, 'T39-freebetAmount-loggedin.png', testInfo);
    // //     // });


    // // test('31-Verify that R currency in free bet field is displayed on the home page of Betway application', async ({ headerPage }, testInfo) => {
    // //     await headerPage.verifyFreebetCurrency();
    // //     await ScreenshotHelper(headerPage.page, screenshotDir, 'T40-freebetCurrency-loggedin.png', testInfo);
    // // });

    // test('32-Verify that Refresh button in free bet field is visible and clickable on the home page of Betway application', async ({ headerPage }, testInfo) => {
    //     await headerPage.verifyFreebetRefreshButton();
    //     await ScreenshotHelper(headerPage.page, screenshotDir, 'T41-refreshButton2-loggedin.png', testInfo);
    // });

    // test('33-Verify that Casino bonus field in blue color is displayed on the home page of Betway application', async ({ headerPage }, testInfo) => {
    //     await headerPage.Login();
    //     await headerPage.verifyCasinoBonusField();
    //     await ScreenshotHelper(headerPage.page, screenshotDir, 'T42-casinoBonusField-loggedin.png', testInfo);
    // });

    // //     // test('34-Verify Amount in casino bonus field is displayed on the home page of Betway application', async ({ headerPage }, testInfo) => {
    // //     //     await headerPage.Login();
    // //     //     await headerPage.page.waitForTimeout(3000);
    // //     //     await headerPage.clickbalanceDropdown();
    // //     //     await highlightElementBorder(headerPage.casinoBonusAmount);
    // //     //     await ScreenshotHelper(headerPage.page, screenshotDir, 'T43-casinoBonusAmount-loggedin.png', testInfo);
    // //     // });

    // // test('35-Verify R currency in casino bonus field is displayed on the home page of Betway application', async ({ headerPage }, testInfo) => {
    // //     await headerPage.verifyCasinoBonusCurrency();
    // //     await ScreenshotHelper(headerPage.page, screenshotDir, 'T44-casinoBonusCurrency-loggedin.png', testInfo);
    // // });

    // test('36-Verify that Refresh button in casino bonus field is visible and clickable on the home page of Betway application', async ({ headerPage }, testInfo) => {
    //     await headerPage.verifyCasinoRefreshButton();
    //     await ScreenshotHelper(headerPage.page, screenshotDir, 'T45-refreshButton3-loggedin.png', testInfo);
    // });

});