import { test } from '../../../fixtures/MasterFixtureFile';
import { expect } from '@playwright/test';
import { log, time } from 'console';
import path from 'path';
import { highlightElementBorder, highlightElements } from '../../../../Common-Flows/HighlightElements';
import { ScreenshotHelper } from '../../../../Common-Flows/ScreenshotHelper';
import { ContactUsPage } from '../../../pages/ContactUsPage';
import { TIMEOUT } from 'dns';
import { HowToPage } from '../../../pages/HowToPage';

const highlights = require('../../../apis/Highlights.json');
const fakerdata = require('../../../json-data/faker.json');
const userData = require('../../../json-data/userData.json');
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
    test('T3-Verify that user should able to click on  "Betway" logo in footer', async ({ homePage }, testInfo) => {
        await homePage.clickFooterBetwayLogo();
        await ScreenshotHelper(homePage.page, screenshotDir, 'T3-a.png', testInfo);
    });
    // Ask to Pankaj Potential Issue with this
    test('T4-Verify functionality of "Betway" logo at footer', async ({ sportsPage }, testInfo) => {
        await sportsPage.clickFooterBetwayLogo();
        await ScreenshotHelper(sportsPage.page, screenshotDir, 'T4.png', testInfo);
    });

    // test('T5- Verify that user should able to see mouse over hand icon on the "Sponsorships" logo in footer', async ({ homePage }, testInfo) => {
    //     await homePage.verifyArsenalLogo();
    //     await ScreenshotHelper(homePage.page, screenshotDir, 'T5.png', testInfo);
    // });
    // test('T6-Verify that user should able to click on "Sponsorships" logo in footer', async ({ homePage }, testInfo) => {
    //     await homePage.clickArsenalLogo();
    //     await ScreenshotHelper(homePage.page, screenshotDir, 'T6-b.png', testInfo);
    // });
    // test('T7-Verify contents of the "Sponsorships" page', async ({ homePage }, testInfo) => {
    //     await homePage.clickArsenalLogo();
    //     await homePage.verifySponsorshipContent();
    //     await ScreenshotHelper(homePage.page, screenshotDir, 'T7.png', testInfo);
    // });
    // test('T8-Verify functionality of Back button inside "Sponsorships" page', async ({ homePage }, testInfo) => {
    //     await homePage.clickArsenalLogo();
    //     await homePage.clickSponsorshipBackButton();
    //     await ScreenshotHelper(homePage.page, screenshotDir, 'T8-b.png', testInfo);
    // });

    // test('t9 - Verify presence of Privacy Policy button in footer', async ({ homePage }, testInfo) => {
    //     await homePage.verifyPrivacyPolicyLink();
    //     await ScreenshotHelper(homePage.page, screenshotDir, 'T9.png', testInfo);
    // });

    // test('T12-Verify functionality of "privacy policy" button', async ({ homePage }, testInfo) => {
    //     await homePage.clickFooterPrivacyPolicy();
    //     await ScreenshotHelper(homePage.page, screenshotDir, 'T12-b.png', testInfo);
    // });
    // test('T13-Verify back button on "Privacy policy" page', async ({ homePage }, testInfo) => {
    //     await homePage.clickFooterPrivacyPolicy();
    //     await homePage.clickPrivacyPolicyBackButton();
    //     await ScreenshotHelper(homePage.page, screenshotDir, 'T13-b.png', testInfo);
    // });
    // test('T14-Verify functionality of "Contact Us" button', async ({ homePage }, testInfo) => {
    //     await homePage.clickContactUsLink();
    //     await ScreenshotHelper(homePage.page, screenshotDir, 'T14-b.png', testInfo);
    // });
    // test('T15-Verify contents of of "Contact Us" button', async ({ contactUs }, testInfo) => {
    //     await contactUs.verifyAllContent();
    //     await ScreenshotHelper(contactUs.page, screenshotDir, 'T15.png', testInfo);
    // });
    // test('T16-Verify functionality of "Back" button on "Contact us" page', async ({ homePage }, testInfo) => {
    //     await homePage.clickContactUsLink();
    //     await homePage.clickContactUsBackButton();
    //     await ScreenshotHelper(homePage.page, screenshotDir, 'T16-b.png', testInfo);
    // });
    // test('T17-Verify functionality of "Chat to Live Support" button on Contact details page inside contact Us page', async ({ contactUs }, testInfo) => {
    //     await contactUs.clickOnChatToLiveSupport();
    //     await ScreenshotHelper(contactUs.page, screenshotDir, 'T17.png', testInfo);
    // });
    // test('T18-Verify the presence and contents of "Standard Rate" on Contact details page inside contact Us page', async ({ contactUs }, testInfo) => {
    //     await contactUs.verifyCall();
    //     await ScreenshotHelper(contactUs.page, screenshotDir, 'T18-a.png', testInfo);
    // });
    // test('T19-Verify the presence and functionality of "Email: Support@betway.co.za" hyperlink', async ({ contactUs }, testInfo) => {
    //     await contactUs.verifyEmail();
    //     await ScreenshotHelper(contactUs.page, screenshotDir, 'T19-a.png', testInfo);

    // });
    // test('T20-Verify presence and functionality of "Twitter: @Betway_GH" hyperlink', async ({ contactUs }, testInfo) => {
    //     await contactUs.verifyX();
    //     await ScreenshotHelper(contactUs.page, screenshotDir, 'T20.png', testInfo);
    // });
    // // test('T16-Verify functionality of "WhatsApp: +233 20 930 1418" hyperlink', async ({ homePage },testInfo) => {

    // // });
    // test('T21-Verify functionality of Facebook: /BetwaySouthAfrica" hyperlink', async ({ contactUs }, testInfo) => {
    //     await contactUs.verifyFacebook();
    //     await ScreenshotHelper(contactUs.page, screenshotDir, 'T21.png', testInfo);
    // });
    // test('T22-Verify contents of the "Contact Form" inside Contact Us page', async ({ contactUs }, testInfo) => {
    //     await contactUs.verifyContactForm();
    //     await ScreenshotHelper(contactUs.page, screenshotDir, 'T22.png', testInfo);
    // });
    // test('T19-Verify functionality of "Dialing code" dropdown', async ({ contactUs }, testInfo) => {
    //     await contactUs.verifyFormMobileInput();
    //     await expect(contactUs.ContactUsPagelocatorRegistry.formMobileInput).toBeVisible({ timeout: 10000 });
    // });
    // test('T20-Verify that user should able to see "Mobile Number" filed', async ({ contactUs }, testInfo) => {
    //     await contactUs.verifyFormMobileInput();
    //     await expect(contactUs.ContactUsPagelocatorRegistry.formMobileInput).toBeVisible({ timeout: 10000 });
    // });
    // test('T21-Verify functionality of "Mobile Number" text box', async ({ contactUs }, testInfo) => {
    //     await contactUs.verifyFormMobileInput();
    //     await expect(contactUs.ContactUsPagelocatorRegistry.formMobileInput).toBeVisible({ timeout: 10000 });
    // });
    // test('T22-Verify that it should not accept special character in "Email Address" filed', async ({ contactUs }, testInfo) => {
    //     await contactUs.verifyEmail();
    //     await expect(contactUs.ContactUsPagelocatorRegistry.formEmailInput).toBeVisible({ timeout: 10000 });
    // });

    // test('T23-Verify that it should accept only valid data in "Email Address" filed', async ({ contactUs }, testInfo) => {
    //     await contactUs.verifyEmail();
    //     await expect(contactUs.ContactUsPagelocatorRegistry.formEmailInput).toBeVisible({ timeout: 10000 });
    // });

    // test('T24-Verify contents of "Query Type" dropdown', async ({ contactUs }, testInfo) => {
    //     await contactUs.verifyFormQueryType();
    //     await expect(contactUs.ContactUsPagelocatorRegistry.formQueryType).toBeVisible({ timeout: 10000 });
    // });

    // test('T25-Verify functionality of "Query Type" dropdown', async ({ contactUs }, testInfo) => {
    //     await contactUs.verifyFormQueryInput();
    //     await expect(contactUs.ContactUsPagelocatorRegistry.formQueryType).toBeVisible({ timeout: 10000 });
    // });

    // test('T26-Verify functionality of "Query Type" dropdown', async ({ contactUs }, testInfo) => {
    //     await contactUs.verifyFormQueryInput();
    //     await expect(contactUs.ContactUsPagelocatorRegistry.formQueryType).toBe
    // });
    // test('T27-Verify functionality of "Query Field" comment text box', async ({ contactUs }, testInfo) => {
    //     await contactUs.verifyFormQueryInput();
    //     await expect(contactUs.ContactUsPagelocatorRegistry.formQueryInput).toBeVisible({ timeout: 10000 });
    // });

    // test('T28-Verify functionality of "Submit" button"', async ({ contactUs }, testInfo) => {
    //     await contactUs.verifyFormSubmitButton();
    //     await expect(contactUs.ContactUsPagelocatorRegistry.formSubmitButton).toBeVisible({ timeout: 10000 });
    // });
    // test('T23-Verify functionality of "FAQs" button at Footer section', async ({ homePage }, testInfo) => {
    //     await homePage.clickFAQsLink();
    //     await ScreenshotHelper(homePage.page, screenshotDir, 'T23-b.png', testInfo);
    // });
    // test('T24-Verify that User should able to click on any question from FAQs list', async ({ homePage }, testInfo) => {
    //     await homePage.clickFAQsLink();
    //     await homePage.clickAnyFAQ();
    //     await ScreenshotHelper(homePage.page, screenshotDir, 'T24.png', testInfo);
    // });
    // test('T25-Verify functionality of "Back button" inside FAQs page', async ({ homePage }, testInfo) => {
    //     await homePage.clickFAQsLink();
    //     await homePage.clickFAQSBackButton();
    //     await ScreenshotHelper(homePage.page, screenshotDir, 'T25-b.png', testInfo);
    // });
    // test('T26-Verify functionality of "Responsible Gaming" at Footer section', async ({ homePage }, testInfo) => {
    //     await homePage.verifyResponsibleGamingLink();
    //     await ScreenshotHelper(homePage.page, screenshotDir, 'T26-b.png', testInfo);
    // });
    // test('T27-Verify contents of the "Responsible Gaming" at Footer section', async ({ homePage }, testInfo) => {
    //     await homePage.clickResponsibleGamingLink();
    //     await ScreenshotHelper(homePage.page, screenshotDir, 'T27-b.png', testInfo);
    // });
    // test('T28-Verify functionality of "Back button" on Responsible Gaming page', async ({ homePage }, testInfo) => {
    //     await homePage.clickResponsibleGamingLink();
    //     await homePage.clickResponsibleGamingBackButton();
    //     await ScreenshotHelper(homePage.page, screenshotDir, 'T28-b.png', testInfo);
    // });
    // test('T29-Verify presence of "Terms & Conditions" at the Footer section', async ({ homePage }, testInfo) => {
    //     await homePage.verifyTermsAndConditions();
    //     await ScreenshotHelper(homePage.page, screenshotDir, 'T29-b.png', testInfo);
    // });
    // test('T29-a-Verify functionality of "Terms & Conditions" at the Footer section', async ({ homePage }, testInfo) => {
    //     await homePage.verifyTermsAndConditions();
    //     await ScreenshotHelper(homePage.page, screenshotDir, 'T29-b.png', testInfo);
    // });
    // test('T30-Verify expand and collapse functionality of any options button inside "Terms & Conditions" page', async ({ homePage }, testInfo) => {
    //     await homePage.clickTermsAndConditionsLink();
    //     await homePage.clickAnyTermsAndConditions();
    //     await ScreenshotHelper(homePage.page, screenshotDir, 'T30.png', testInfo);
    // });
    // test('T31-Verify functionality of "Back" button on "Terms & Conditions" page', async ({ homePage }, testInfo) => {
    //     await homePage.clickTermsAndConditionsLink();
    //     await homePage.clickTermsAndConditionsBackButton();
    //     await ScreenshotHelper(homePage.page, screenshotDir, 'T31-b.png', testInfo);
    // });

    // // ---------------------------------------------------------------------------------------
    // test('T32-Verify presence of "Betting Rules" at footer section', async ({ homePage }, testInfo) => {
    //     await homePage.verifyBettingRulesLink();
    //     await ScreenshotHelper(homePage.page, screenshotDir, 'T32-b.png', testInfo);
    // });
    // // test('T32 b -Verify functionality of "Betting Rules" at footer section', async ({ homePage }, testInfo) => {
    // //     await homePage.clickBettingRulesLink();
    // //     await ScreenshotHelper(homePage.page, screenshotDir, 'T32-b.png', testInfo);
    // // });
    // test('T33-Verify presence of "Betway App" at Footer section', async ({ homePage }, testInfo) => {
    //     await homePage.verifyBetwayAppLink()
    //     await ScreenshotHelper(homePage.page, screenshotDir, 'T33-b.png', testInfo);
    // });
    // test('T33 -b -Verify functionality of "Betway App" at Footer section', async ({ homePage }, testInfo) => {
    //     await homePage.clickBetwayAppLink()
    //     await ScreenshotHelper(homePage.page, screenshotDir, 'T33-b.png', testInfo);
    // });
    // test('T34-Verify Contents of betway app', async ({ homePage }, testInfo) => {
    //     await homePage.clickBetwayAppLink();
    //     await ScreenshotHelper(homePage.page, screenshotDir, 'T40-b.png', testInfo);
    // });
    // test('T35-Verify functionality of "Back button" inside the Betway App page screen', async ({ homePage }, testInfo) => {
    //     await homePage.clickBetwayAppLink();
    //     await homePage.clickBetwayAppBackButton();
    //     await ScreenshotHelper(homePage.page, screenshotDir, 'T35-b.png', testInfo);
    // });

    // test('T37-Verify functionality of "How To" button at Footer section', async ({ homePage }, testInfo) => {
    //     await homePage.verifyHowToLink();
    //     await ScreenshotHelper(homePage.page, screenshotDir, 'T37-b.png', testInfo);
    // });
    // test('T38-Verify options availability at "How To" page', async ({ howTo }, testInfo) => {
    //     await howTo.verifyHowToPageOptions();
    //     await ScreenshotHelper(howTo.page, screenshotDir, 'T38.png', testInfo);
    // });
    // test('T39-Verify that User should able to click on "How to Bet SMS" on the How To page', async ({ howTo }, testInfo) => {
    //     await howTo.clickHowToSMS();
    //     await ScreenshotHelper(howTo.page, screenshotDir, 'T39-b.png', testInfo);
    // });
    // test('T40-Verify that User should able to click on any option available on "How to SMS" section', async ({ howTo }, testInfo) => {
    //     await howTo.clickHowToSMS();
    //     await ScreenshotHelper(howTo.page, screenshotDir, 'T40.png', testInfo);
    // });
    // test('T41-Verify that User should able to click on "How to Bet" on the How To page', async ({ howTo }, testInfo) => {
    //     await howTo.clickHowToBetOption();
    //     await ScreenshotHelper(howTo.page, screenshotDir, 'T41.png', testInfo);
    // });
    // test('T42-Verify that User should able to click on any option available on "How to Bet" section', async ({ howTo }, testInfo) => {
    //     await howTo.clickHowToBetOption();
    //     await highlightElementBorder(howTo.page.getByText('USSD Betting').first().locator('..'));
    //     await howTo.page.getByText('USSD Betting').first().click();
    //     await ScreenshotHelper(howTo.page, screenshotDir, 'T42.png', testInfo);
    // });
    // test('T43-Verify that User should able to click on "How to Betgames" on the How To page', async ({ howTo }, testInfo) => {
    //     await howTo.clickHowToBetgames();
    //     await ScreenshotHelper(howTo.page, screenshotDir, 'T43.png', testInfo);
    // });
    // test('T44-Verify that User should able to click on any option available on "How to Betgames" section', async ({ howTo }, testInfo) => {
    //     await howTo.clickHowToBetgames();
    //     await highlightElementBorder(howTo.page.getByText('Dice duel').first().locator('..'));
    //     await howTo.page.getByText('Dice duel').first().locator('..').click();
    //     await ScreenshotHelper(howTo.page, screenshotDir, 'T44.png', testInfo);
    // });
    // test('T45-Verify that User should able to click on "How to Register" on the How To page', async ({ howTo }, testInfo) => {
    //     await howTo.clickHowToRegister();
    //     await ScreenshotHelper(howTo.page, screenshotDir, 'T45.png', testInfo);
    // });
    // test('T46-Verify that User should able to click on any option available on "How to Register" section', async ({ howTo }, testInfo) => {
    //     await howTo.clickHowToRegister();
    //     await highlightElementBorder(howTo.page.getByText('How to Sign Up').first().locator('..'));
    //     await howTo.page.getByText('How to Sign Up').first().locator('..').click();
    //     await ScreenshotHelper(howTo.page, screenshotDir, 'T46.png', testInfo);
    // });
    // test('T47-Verify that User should able to click on "How to Deposit" on the How To page', async ({ howTo }, testInfo) => {
    //     await howTo.clickHowToDeposit();
    //     await ScreenshotHelper(howTo.page, screenshotDir, 'T47.png', testInfo);
    // });
    // test('T48-Verify that User should able to click on any option available on "How to Deposit" section', async ({ howTo }, testInfo) => {
    //     await howTo.clickHowToDeposit();
    //     await highlightElementBorder(howTo.page.getByText('Ozow').first().locator('..'));
    //     await howTo.page.getByText('Ozow').first().locator('..').click();
    //     await ScreenshotHelper(howTo.page, screenshotDir, 'T48.png', testInfo);
    // });
    // test('T49-Verify that User should able to click on "How to Reset Password" on the How To page', async ({ howTo }, testInfo) => {
    //     await howTo.clickHowToResetPassword();
    //     await ScreenshotHelper(howTo.page, screenshotDir, 'T49.png', testInfo);
    // });

    // test('T50-Verify that User should able to click on any option available on "How to Reset Password" section', async ({ howTo }, testInfo) => {
    //     await howTo.clickHowToResetPassword();
    //     await highlightElementBorder(howTo.page.getByText('How to reset your password').first().locator('..'));
    //     await howTo.page.getByText('How to reset your password').first().locator('..').click();
    //     await ScreenshotHelper(howTo.page, screenshotDir, 'T50.png', testInfo);
    // });

    // test('T51-Verify that User should able to click on "How to Withdraw" on the How To page', async ({ howTo }, testInfo) => {
    //     await howTo.clickHowToWithdraw();
    //     await ScreenshotHelper(howTo.page, screenshotDir, 'T51.png', testInfo);
    // });

    // test('T52-Verify that User should able to click on any option available on "How to Withdraw" section', async ({ howTo }, testInfo) => {
    //     await howTo.clickHowToWithdraw();
    //     await highlightElementBorder(howTo.page.getByText('Via EFT').first().locator('..'));
    //     await howTo.page.getByText('Via EFT').first().locator('..').click();
    //     await ScreenshotHelper(howTo.page, screenshotDir, 'T52.png', testInfo);
    // });

    // // test('T53-Verify that User should able to click on "How to Jackpots" on the How To page', async ({ howTo }, testInfo) => {
    // //     await howTo.verifyHowToJackpot();
    // //     await howTo.clickHowToJackpot()
    // //     await ScreenshotHelper(howTo.page, screenshotDir, 'T53.png', testInfo);
    // // });

    // // test('T54-Verify that User should able to click on any option available on "How to Jackpots" section', async ({ howTo }, testInfo) => {
    // //     await howTo.clickHowToJackpot();
    // //     await highlightElementBorder(howTo.page.getByText('How to Jacpots').first().locator('..'));
    // //     await ScreenshotHelper(howTo.page, screenshotDir, 'T54.png', testInfo);
    // // });

    // test('T55-Verify that User should able to click on "How to Casino" on the How To page', async ({ howTo }, testInfo) => {
    //     await howTo.clickHowToCasino();
    //     await ScreenshotHelper(howTo.page, screenshotDir, 'T55.png', testInfo);
    // });
    // test('T56-Verify that User should able to click on "How to Casino" on the How To page', async ({ howTo }, testInfo) => {
    //     await howTo.clickHowToFica();
    //     await ScreenshotHelper(howTo.page, screenshotDir, 'T55.png', testInfo);
    // });

    // test('T56-Verify that User should able to click on any option available on "How to Casino" section', async ({ howTo }, testInfo) => {
    //     await howTo.clickHowToCasino();
    //     await highlightElementBorder(howTo.page.getByText('How to Play').first().locator('..'));
    //     await howTo.page.getByText('How to Play').first().locator('..').click();
    //     await ScreenshotHelper(howTo.page, screenshotDir, 'T56.png', testInfo);
    // });

    // // ---------------------------------------------------------------------------------------------------------------------
    // test('T57-Verify functionality of "Affiliate Program" button at the Footer section', async ({ homePage }, testInfo) => {
    //     await homePage.verifyAffiliateProgram();
    //     await ScreenshotHelper(homePage.page, screenshotDir, 'T57-a.png', testInfo);
    // });

    // test('T64-Verify presence of Legal information about Betway at footer section', async ({ homePage }, testInfo) => {
    //     await highlightElements(await homePage.page.getByText('Raging River Trading (Pty) Ltd').first().locator('..'));
    //     await ScreenshotHelper(homePage.page, screenshotDir, 'T64.png', testInfo);
    // });

    // test('T65-Verify presence of version information of Betway application at footer section', async ({ homePage }, testInfo) => {
    //     await homePage.verifyVersion();
    //     await ScreenshotHelper(homePage.page, screenshotDir, 'T65.png', testInfo);
    // });

    // test('T66-Verify presence of Current time at footer section', async ({ homePage }, testInfo) => {
    //     await homePage.verifyCurrentTime();
    //     await ScreenshotHelper(homePage.page, screenshotDir, 'T66.png', testInfo);
    // });

    // test('T67-Verify presence and functionality of "Betway App QR code " at footer section', async ({ homePage }, testInfo) => {
    //     await homePage.verifyBetwayQR();
    //     await ScreenshotHelper(homePage.page, screenshotDir, 'T61.png', testInfo);
    // });

    // test('T68-Verify functionality of "App store" icons from the footer section', async ({ homePage }, testInfo) => {
    //     await homePage.verifyAppStoreLogo();
    //     await ScreenshotHelper(homePage.page, screenshotDir, 'T62-a.png', testInfo);
    // });

    // test('T69-Verify presence and functionality of social media icons at footer section', async ({ homePage }, testInfo) => {
    //     await homePage.verifySocialMediaIcons();
    //     await ScreenshotHelper(homePage.page, screenshotDir, 'T63-a.png', testInfo);
    // });

    // test('T64-Verify functionality of "18" logo at footer section', async ({ homePage }, testInfo) => {
    //     await homePage.verify18Logo()
    //     await ScreenshotHelper(homePage.page, screenshotDir, 'T70-a.png', testInfo);
    // });
});
// npx playwright test src/regions/ZA/tests/modules/footer/footer.spec.ts --config=playwright.ZA.config.ts --headed
// 2.allure generate allure-results --clean -o allure-report
// 3.allure open src/regions/ZA/reports/allure-report 