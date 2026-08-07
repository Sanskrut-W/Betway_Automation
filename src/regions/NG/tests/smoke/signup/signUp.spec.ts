// npx playwright test src/regions/NG/tests/smoke/signup/signUp.spec.ts --config=playwright.NG.config.ts --headed
import path from 'path';
import { test } from '../../../fixtures/MasterFixtureFile';
import { ScreenshotHelper } from '../../../../Common-Flows/ScreenshotHelper';

const projectRoot = path.resolve(__dirname, '../../..');
const screenshotDir = path.join(projectRoot, 'screenshots/module/signUp');

test.afterEach(async ({ signupUtils }) => {
    await signupUtils.clearHighlights();
});

// NG's signup modal (id="reg-content", form="partial-reg-form") is a single step with
// Mobile Number / Password / ConfirmPassword / Date of Birth / Territory / an age-confirmation
// checkbox / Continue button. It does not have the multi-step South African ID / Passport
// flow this file previously assumed (copied from ZA) — that flow doesn't exist on NG's site.
test.describe('Main Sign-Up Flow', () => {
    test.beforeEach(async ({ signupPage, signupUtils }) => {
        await signupPage.goto();
        await signupUtils.resetModalState();
        await signupPage.clickSignUp();
    });

    test('T5-Verify Sign Up form fields are visible', async ({ signupPage }, testInfo) => {
        await signupPage.highlightMobileInput();
        await signupPage.highlightPasswordInput();
        await signupPage.highlightConfirmPasswordInput();
        await ScreenshotHelper(signupPage.page, screenshotDir, 'T5-signup-form', testInfo);
    });

    test('T7-Fill Mobile, Password and Confirm Password', async ({ signupPage, testData }, testInfo) => {
        await signupPage.fillBasicInfoNG(
            testData.mobileValidation.valid,
            testData.passwordValidation.default,
            testData.passwordValidation.default
        );
        await signupPage.highlightConfirmPasswordInput();
        await ScreenshotHelper(signupPage.page, screenshotDir, 'T7-signup', testInfo);
    });

    test('T33-Mismatched Confirm Password', async ({ signupPage, testData }, testInfo) => {
        await signupPage.fillBasicInfoNG(
            testData.mobileValidation.valid,
            testData.passwordValidation.default,
            testData.passwordValidation.weak // deliberately different from the password above
        );
        await signupPage.highlightConfirmPasswordInput();
        await ScreenshotHelper(signupPage.page, screenshotDir, 'T33-signup-mismatch', testInfo);
    });

    test('T34-Select Date of Birth', async ({ signupPage, testData }, testInfo) => {
        await signupPage.fillBasicInfoNG(
            testData.mobileValidation.valid,
            testData.passwordValidation.default,
            testData.passwordValidation.default
        );
        await signupPage.selectDateOfBirth();
        await signupPage.highlightDobInput();
        await ScreenshotHelper(signupPage.page, screenshotDir, 'T34-signup-dob', testInfo);
    });

    test('T35-Select Territory', async ({ signupPage, testData }, testInfo) => {
        await signupPage.fillBasicInfoNG(
            testData.mobileValidation.valid,
            testData.passwordValidation.default,
            testData.passwordValidation.default
        );
        await signupPage.selectTerritory();
        await signupPage.highlightTerritoryDropdown();
        await ScreenshotHelper(signupPage.page, screenshotDir, 'T35-signup-territory', testInfo);
    });

    test('T36-Age Confirmation Checkbox', async ({ signupPage, testData }, testInfo) => {
        await signupPage.fillBasicInfoNG(
            testData.mobileValidation.valid,
            testData.passwordValidation.default,
            testData.passwordValidation.default
        );
        await signupPage.checkAgeConfirmation();
        await signupPage.highlightAgeCheckbox();
        await ScreenshotHelper(signupPage.page, screenshotDir, 'T36-signup-age', testInfo);
    });

    test('T37-Complete Registration Form', async ({ signupPage, testData }, testInfo) => {
        await signupPage.fillBasicInfoNG(
            testData.mobileValidation.valid,
            testData.passwordValidation.default,
            testData.passwordValidation.default
        );
        await signupPage.selectDateOfBirth();
        await signupPage.selectTerritory();
        await signupPage.checkAgeConfirmation();
        await signupPage.highlightContinueButton();
        await ScreenshotHelper(signupPage.page, screenshotDir, 'T37-signup-complete', testInfo);
    });

    test('T38-Empty Mobile Number Field Validation', async ({ signupPage }, testInfo) => {
        await signupPage.highlightMobileInput();
        await signupPage.clickContinue();
        await signupPage.page.waitForTimeout(1000);
        await ScreenshotHelper(signupPage.page, screenshotDir, 'T38-signup-empty', testInfo);
    });
});
