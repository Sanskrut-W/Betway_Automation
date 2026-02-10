// npx playwright test src/regions/ZA/tests/smoke/footer/footer.spec.ts --config=playwright.ZA.config.ts --headed
import { test } from '../../../fixtures/MasterFixtureFile';
import path from 'path';
import { ScreenshotHelper } from '../../../../Common-Flows/ScreenshotHelper';
const projectRoot = path.resolve(__dirname, '../../..');
const screenshotDir = path.join(projectRoot, 'screenshots/module/footer');

test.describe('Footer Module Tests', () => {
    test('T1-Verify Footer page', async ({ homePage }, testInfo) => {
        await homePage.verifyFooter();
        await ScreenshotHelper(homePage.page, screenshotDir, 'T1.png', testInfo);
    });
    test('T2-Verify the "Betway" logo in footer', async ({ homePage }, testInfo) => {
        await homePage.verifyFooterBetwayLogo();
        await ScreenshotHelper(homePage.page, screenshotDir, 'T2.png', testInfo);
    });
    // test('T3-Verify that user should able to click on  "Betway" logo in footer', async ({ homePage }, testInfo) => {
    //     await homePage.clickFooterBetwayLogo();
    //     await ScreenshotHelper(homePage.page, screenshotDir, 'T3-a.png', testInfo);
    // });

    test('T6-Verify that user should able to click on "Sponsorships" logo in footer', async ({ homePage }, testInfo) => {
        await homePage.clickArsenalLogo();
        await ScreenshotHelper(homePage.page, screenshotDir, 'T6-b.png', testInfo);
    });

    test('T12-Verify functionality of "privacy policy" button', async ({ homePage }, testInfo) => {
        await homePage.clickFooterPrivacyPolicy();
        await ScreenshotHelper(homePage.page, screenshotDir, 'T12-b.png', testInfo);
    });

    test('T14-Verify functionality of "Contact Us" button', async ({ homePage }, testInfo) => {
        await homePage.clickContactUsLink();
        await ScreenshotHelper(homePage.page, screenshotDir, 'T14-b.png', testInfo);
    });

    // test('T19-Verify the presence and functionality of "Email: Support@betway.co.za" hyperlink', async ({ contactUs }, testInfo) => {
    //     await contactUs.verifyEmail();
    //     await ScreenshotHelper(contactUs.page, screenshotDir, 'T19-a.png', testInfo);
    // });

    // test('T20-Verify presence and functionality of "Twitter: @Betway_GH" hyperlink', async ({ contactUs }, testInfo) => {
    //     await contactUs.verifyX();
    //     await ScreenshotHelper(contactUs.page, screenshotDir, 'T20.png', testInfo);
    // });

    // test('T21-Verify functionality of Facebook: /BetwaySouthAfrica" hyperlink', async ({ contactUs }, testInfo) => {
    //     await contactUs.verifyFacebook();
    //     await ScreenshotHelper(contactUs.page, screenshotDir, 'T21.png', testInfo);
    // });

    test('T29-a-Verify functionality of "Terms & Conditions" at the Footer section', async ({ homePage }, testInfo) => {
        await homePage.verifyTermsAndConditions();
        await ScreenshotHelper(homePage.page, screenshotDir, 'T29-b.png', testInfo);
    });

    test('T32 b -Verify functionality of "Betting Rules" at footer section', async ({ homePage }, testInfo) => {
        await homePage.clickBettingRulesLink();
        await ScreenshotHelper(homePage.page, screenshotDir, 'T32-b.png', testInfo);
    });

    test('T33 -b -Verify functionality of "Betway App" at Footer section', async ({ homePage }, testInfo) => {
        await homePage.clickBetwayAppLink()
        await ScreenshotHelper(homePage.page, screenshotDir, 'T33-b.png', testInfo);
    });

    test('T37-Verify functionality of "How To" button at Footer section', async ({ homePage }, testInfo) => {
        await homePage.verifyHowToLink();
        await ScreenshotHelper(homePage.page, screenshotDir, 'T37-b.png', testInfo);
    });

    // T38-Verify options availability at "How To" page', async ({ howTo }, testInfo) => {
    //     await howTo.verifyHowToPageOptions();
    //     await ScreenshotHelper(howTo.page, screenshotDir, 'T38.png', testInfo);
    // });
    test('T39-Verify that User should able to click on "How to Bet SMS" on the How To page', async ({ howTo }, testInfo) => {
        await howTo.clickHowToSMS();
        await ScreenshotHelper(howTo.page, screenshotDir, 'T39-b.png', testInfo);
    });
    test('T40-Verify that User should able to click on any option available on "How to SMS" section', async ({ howTo }, testInfo) => {
        await howTo.clickHowToSMS();
        await ScreenshotHelper(howTo.page, screenshotDir, 'T40.png', testInfo);
    });
    test('T41-Verify that User should able to click on "How to Bet" on the How To page', async ({ howTo }, testInfo) => {
        await howTo.clickHowToBetOption();
        await ScreenshotHelper(howTo.page, screenshotDir, 'T41.png', testInfo);
    });

    test('T43-Verify that User should able to click on "How to Betgames" on the How To page', async ({ howTo }, testInfo) => {
        await howTo.clickHowToBetgames();
        await ScreenshotHelper(howTo.page, screenshotDir, 'T43.png', testInfo);
    });

    test('T45-Verify that User should able to click on "How to Register" on the How To page', async ({ howTo }, testInfo) => {
        await howTo.clickHowToRegister();
        await ScreenshotHelper(howTo.page, screenshotDir, 'T45.png', testInfo);
    });

    test('T47-Verify that User should able to click on "How to Deposit" on the How To page', async ({ howTo }, testInfo) => {
        await howTo.clickHowToDeposit();
        await ScreenshotHelper(howTo.page, screenshotDir, 'T47.png', testInfo);
    });

    test('T49-Verify that User should able to click on "How to Reset Password" on the How To page', async ({ howTo }, testInfo) => {
        await howTo.clickHowToResetPassword();
        await ScreenshotHelper(howTo.page, screenshotDir, 'T49.png', testInfo);
    });


    test('T57-Verify functionality of "Affiliate Program" button at the Footer section', async ({ homePage }, testInfo) => {
        await homePage.verifyAffiliateProgram();
        await ScreenshotHelper(homePage.page, screenshotDir, 'T57-a.png', testInfo);
    });

});
// npx playwright test src/regions/ZA/tests/smoke/footer/footer.spec.ts --config=playwright.ZA.config.ts --headed
// 2.allure generate allure-results --clean -o allure-report
// 3.allure open src/regions/ZA/reports/allure-report 