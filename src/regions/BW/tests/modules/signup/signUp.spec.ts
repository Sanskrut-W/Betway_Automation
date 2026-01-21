// npx playwright test src/regions/ZA/tests/modules/signUp/signUp.spec.ts --config=playwright.ZA.config.ts --headed
// import { expect } from '@playwright/test';
// import path from 'path';
// import { test } from '../../../fixtures/MasterFixtureFile';
// import { ScreenshotHelper } from '../../../../Common-Flows/ScreenshotHelper';

// const projectRoot = path.resolve(__dirname, '../../..');
// const screenshotDir = path.join(projectRoot, 'screenshots/module/signUp');

// function setupSignupTestSuite(_name: string) {
//     // no-op
// }

// // Global hook: Runs AFTER every test in this file
// test.afterEach(async ({ signupUtils }) => {
//     // Automatically clear highlights after each test
//     await signupUtils.clearHighlights();
// });


// // SUITE 1: Homepage Navigation
// setupSignupTestSuite('ZALogin Signup Tests');

// test.describe.serial('Homepage Navigation', () => {
//     // Runs before each test in this 'describe' block
//     test.beforeEach(async ({ signupPage, signupUtils }) => {
//         await signupPage.goto();
//         // Assumes resetModalState() closes cookie popups, etc.
//         await signupUtils.resetModalState();
//     });

//     test("T1-Verify Sign-Up Button is visible on Homepage.", async ({ signupPage }, testInfo) => {
//         await signupPage.highlightSignUpButton();
//         await ScreenshotHelper(signupPage.page, screenshotDir, 'T1-signup', testInfo);
//     });

//     test("T2-Verify Login Button is visible on Homepage.", async ({ signupPage }, testInfo) => {
//         await signupPage.highlightLoginButton();
//         await ScreenshotHelper(signupPage.page, screenshotDir, 'T2-signup', testInfo);
//     });

//     test('T39-Hamburger Menu Sign Up Button Visibility', async ({ signupPage }, testInfo) => {
//         await signupPage.highlightHamburgerMenu();
//         await signupPage.clickHamburgerMenu();
//         await signupPage.highlightHamburgerSignupBtn();
//         await ScreenshotHelper(signupPage.page, screenshotDir, 'T39-signup', testInfo);
//     });
// });


// // // SUITE 2: Main Sign-Up Flow (Step 1 Validation)
// test.describe('Main Sign-Up Flow - Step 1', () => {
//     // Runs before each test in this 'describe' block
//     test.beforeEach(async ({ signupPage, signupUtils }) => {
//         await signupPage.goto();
//         await signupUtils.resetModalState();
//         await signupPage.clickSignUp();
//     });

//     test('T3-Verify Sign page after clicking.', async ({ signupPage }, testInfo) => {
//         // await expect(signupPage.getForm()).toBeVisible();
//         await ScreenshotHelper(signupPage.page, screenshotDir, 'T3-signup', testInfo);
//     });

//     test('T4-Verify Sign Up Form is visible.', async ({ signupPage }, testInfo) => {
//         // await expect(signupPage.getMobileInput()).toBeVisible();
//         // await expect(signupPage.getPasswordInput()).toBeVisible();
//         // await expect(signupPage.getFirstNameInput()).toBeVisible();
//         // await expect(signupPage.getLastNameInput()).toBeVisible();

//         await signupPage.highlightMobileInput();
//         await signupPage.highlightPasswordInput();
//         await signupPage.highlightFirstNameInput();
//         await signupPage.highlightLastNameInput();
//         await ScreenshotHelper(signupPage.page, screenshotDir, 'T4-signup', testInfo);
//     });

//     test('T8-Dialling Code.', async ({ signupPage }, testInfo) => {
//         await signupPage.page.waitForTimeout(2000); // Wait for element
//         await signupPage.highlightDiallingCode();
//         await ScreenshotHelper(signupPage.page, screenshotDir, 'T8-signup', testInfo);
//     });

//     // --- Mobile Validation Tests ---
//     test('T9-Valid Mobile Number Format', async ({ signupPage, testData }, testInfo) => {
//         await signupPage.testMobileNumberValidation(testData.mobileValidation.valid, testData.basicInfo.password);
//         await ScreenshotHelper(signupPage.page, screenshotDir, 'T9-signup', testInfo);
//     });

//     test('T10-Short Mobile Number Validation', async ({ signupPage, testData }, testInfo) => {
//         await signupPage.testMobileNumberValidation(testData.mobileValidation.short, testData.basicInfo.password);
//         await ScreenshotHelper(signupPage.page, screenshotDir, 'T10-signup', testInfo);
//     });

//     test('T11-Long Mobile Number Validation', async ({ signupPage, testData }, testInfo) => {
//         await signupPage.testMobileNumberValidation(testData.mobileValidation.long, testData.basicInfo.password);
//         await ScreenshotHelper(signupPage.page, screenshotDir, 'T11-signup', testInfo);
//     });

//     test('T12-Alphabetic Characters in Mobile Number', async ({ signupPage, testData }, testInfo) => {
//         await signupPage.testMobileNumberValidation(testData.mobileValidation.alphabetic, testData.basicInfo.password);
//         await ScreenshotHelper(signupPage.page, screenshotDir, 'T12-signup', testInfo);
//     });

//     test('T13-Special Characters in Mobile Number', async ({ signupPage, testData }, testInfo) => {
//         await signupPage.testMobileNumberValidation(testData.mobileValidation.specialChar, testData.basicInfo.password);
//         await ScreenshotHelper(signupPage.page, screenshotDir, 'T13-signup', testInfo);
//     });

//     // --- Password Validation Tests ---
//     test('T15-Strong Password with Mixed Case', async ({ signupPage, testData }, testInfo) => {
//         await signupPage.testPasswordValidation(testData.passwordValidation.strong, testData.mobileValidation.valid, testData.basicInfo);
//         await ScreenshotHelper(signupPage.page, screenshotDir, 'T15-signup', testInfo);
//     });

//     test('T16-Password with Numeric Characters', async ({ signupPage, testData }, testInfo) => {
//         await signupPage.testPasswordValidation(testData.passwordValidation.withNumbers, testData.mobileValidation.valid, testData.basicInfo);
//         await ScreenshotHelper(signupPage.page, screenshotDir, 'T16-signup', testInfo);
//     });

//     test('T17-Password with Special Characters', async ({ signupPage, testData }, testInfo) => {
//         await signupPage.testPasswordValidation(testData.passwordValidation.withSpecialChars, testData.mobileValidation.valid, testData.basicInfo);
//         await ScreenshotHelper(signupPage.page, screenshotDir, 'T17-signup', testInfo);
//     });

//     test('T18-Password Minimum Length', async ({ signupPage, testData }, testInfo) => {
//         await signupPage.testPasswordValidation(testData.passwordValidation.minLen, testData.mobileValidation.valid, testData.basicInfo);
//         await ScreenshotHelper(signupPage.page, screenshotDir, 'T18-signup', testInfo);
//     });

//     test('T19-Password Maximum Length', async ({ signupPage, testData }, testInfo) => {
//         await signupPage.testPasswordValidation(testData.passwordValidation.maxLen, testData.mobileValidation.valid, testData.basicInfo);
//         await ScreenshotHelper(signupPage.page, screenshotDir, 'T19-signup', testInfo);
//     });

//     test('T20-Password with All Character Types', async ({ signupPage, testData }, testInfo) => {
//         await signupPage.testPasswordValidation(testData.passwordValidation.allTypes, testData.mobileValidation.valid, testData.basicInfo);
//         await ScreenshotHelper(signupPage.page, screenshotDir, 'T20-signup', testInfo);
//     });

//     test('T21-Password with Spaces', async ({ signupPage, testData }, testInfo) => {
//         await signupPage.testPasswordValidation(testData.passwordValidation.withSpaces, testData.mobileValidation.valid, testData.basicInfo);
//         await ScreenshotHelper(signupPage.page, screenshotDir, 'T21-signup', testInfo);
//     });

//     test('T22-Weak Password Rejection', async ({ signupPage, testData }, testInfo) => {
//         await signupPage.testPasswordValidation(testData.passwordValidation.weak, testData.mobileValidation.valid, testData.basicInfo, { clickNext: true, waitTime: 2000 });
//         await ScreenshotHelper(signupPage.page, screenshotDir, 'T22-signup', testInfo);
//     });

//     test('T23-Blank Password Rejection', async ({ signupPage, testData }, testInfo) => {
//         await signupPage.fillMobileNumber(testData.mobileValidation.valid);
//         await signupPage.fillFirstName(testData.basicInfo.firstName);
//         await signupPage.fillLastName(testData.basicInfo.lastName);
//         await signupPage.clickNext();
//         await signupPage.highlightPasswordInput();
//         await signupPage.page.waitForTimeout(1000);
//         await ScreenshotHelper(signupPage.page, screenshotDir, 'T23-signup', testInfo);
//     });

//     test('T24-Password Exceeding Maximum Length', async ({ signupPage, testData }, testInfo) => {
//         await signupPage.testPasswordValidation(testData.passwordValidation.tooLong, testData.mobileValidation.valid, testData.basicInfo, { waitTime: 2000 });
//         await ScreenshotHelper(signupPage.page, screenshotDir, 'T24-signup', testInfo);
//     });

//     test('T25-Password Below Minimum Length', async ({ signupPage, testData }, testInfo) => {
//         await signupPage.testPasswordValidation(testData.passwordValidation.tooShort, testData.mobileValidation.valid, testData.basicInfo, { clickNext: true, waitTime: 2000 });
//         await ScreenshotHelper(signupPage.page, screenshotDir, 'T25-signup', testInfo);
//     });

//     // --- Name Validation Tests ---
//     test('T26-Valid First Name and Surname', async ({ signupPage, testData }, testInfo) => {
//         await signupPage.testNameValidation(testData.nameValidation.validFirst, testData.nameValidation.validLast, testData.mobileValidation.valid, testData.passwordValidation.default);
//         await ScreenshotHelper(signupPage.page, screenshotDir, 'T26-signup', testInfo);
//     });

//     test('T27-Names with Spaces', async ({ signupPage, testData }, testInfo) => {
//         await signupPage.testNameValidation(testData.nameValidation.firstWithSpaces, testData.nameValidation.lastWithSpaces, testData.mobileValidation.valid, testData.passwordValidation.default);
//         await ScreenshotHelper(signupPage.page, screenshotDir, 'T27-signup', testInfo);
//     });

//     test('T28-Names with Hyphens', async ({ signupPage, testData }, testInfo) => {
//         await signupPage.testNameValidation(testData.nameValidation.firstWithHyphen, testData.nameValidation.lastWithHyphen, testData.mobileValidation.valid, testData.passwordValidation.default);
//         await ScreenshotHelper(signupPage.page, screenshotDir, 'T28-signup', testInfo);
//     });

//     test('T29-Blank First Name Rejection', async ({ signupPage, testData }, testInfo) => {
//         await signupPage.testNameValidation('', testData.nameValidation.validLast, testData.mobileValidation.valid, testData.passwordValidation.default, { clickNext: true });
//         await ScreenshotHelper(signupPage.page, screenshotDir, 'T29-signup', testInfo);
//     });

//     test('T30-Blank Surname Rejection', async ({ signupPage, testData }, testInfo) => {
//         await signupPage.testNameValidation(testData.nameValidation.validFirst, '', testData.mobileValidation.valid, testData.passwordValidation.default, { clickNext: true });
//         await ScreenshotHelper(signupPage.page, screenshotDir, 'T30-signup', testInfo);
//     });

//     test('T31-Names with Numeric Characters Rejection', async ({ signupPage, testData }, testInfo) => {
//         await signupPage.testNameValidation(testData.nameValidation.firstWithNumbers, testData.nameValidation.lastWithNumbers, testData.mobileValidation.valid, testData.passwordValidation.default, { clickNext: true, waitTime: 2000 });
//         await ScreenshotHelper(signupPage.page, screenshotDir, 'T31-signup', testInfo);
//     });

//     test('T32-Names with Special Characters Rejection', async ({ signupPage, testData }, testInfo) => {
//         await signupPage.testNameValidation(testData.nameValidation.firstWithSpecial, testData.nameValidation.lastWithSpecial, testData.mobileValidation.valid, testData.passwordValidation.default, { clickNext: true, waitTime: 2000 });
//         await ScreenshotHelper(signupPage.page, screenshotDir, 'T32-signup', testInfo);
//     });
// });

// // // ------------------------------------------------------------------
// // // 🧪 SUITE 3: Main Sign-Up Flow (Step 2 Validation)
// // // ------------------------------------------------------------------
// test.describe('Main Sign-Up Flow - Step 2', () => {
//     // This hook runs before EACH test in THIS group, getting us to Step 2 automatically.
//     test.beforeEach(async ({ signupPage, signupUtils, testData }) => {
//         await signupPage.goto();
//         await signupUtils.resetModalState();
//         await signupPage.clickSignUp();
//         // Fill step 1 with valid data and proceed
//         await signupPage.fillBasicInfo(
//             testData.mobileValidation.valid,
//             testData.passwordValidation.default,
//             testData.basicInfo.firstName,
//             testData.basicInfo.lastName,
//             testData.basicInfo.email
//         );
//         await signupPage.clickNext();
//         // We are now on Step 2
//     });

//     // test('T5-Register Button (Step 2 Entry)', async ({ signupPage }, testInfo) => {
//     //     // This test is re-purposed from the original T5 to just check Step 2 visibility
//     //     // await expect(signupPage.getRegisterButton()).toBeVisible();
//     //     await signupPage.highlightRegisterButton();
//     //     await ScreenshotHelper(signupPage.page, screenshotDir, 'T5-signup-step2', testInfo);
//     //     await signupPage.clickPrevious(); // Cleanup
//     // });

//     // test('T7-Register Button (Step 2 Full)', async ({ signupPage, testData }, testInfo) => {
//     //     await signupPage.agreeToAll();
//     //     await signupPage.fillIdNumber(testData.idValidation.miscID);
//     //     // await expect(signupPage.getRegisterButton()).toBeVisible();
//     //     await signupPage.highlightRegisterButton();
//     //     await signupPage.page.waitForTimeout(1000);
//     //     await ScreenshotHelper(signupPage.page, screenshotDir, 'T7-signup', testInfo);
//     //     await signupPage.clickPrevious(); // Cleanup
//     // });

//     // test('T33-ID Document Dropdown Selection and Valid SA ID', async ({ signupPage, testData }, testInfo) => {
//     //     // await signupPage.highlightIdDropdown();
//     //     await signupPage.selectSouthAfricanID();
//     //     await signupPage.highlightSAIdOption();
//     //     await signupPage.testSAIdValidation(testData.idValidation.validSAId);
//     //     await ScreenshotHelper(signupPage.page, screenshotDir, 'T33-signup', testInfo);
//     // });

//     // test('T34-Invalid South African ID Validation', async ({ signupPage, testData }, testInfo) => {

//     //     await signupPage.selectSouthAfricanID();
//     //     await signupPage.testSAIdValidation(testData.idValidation.shortSAId);
//     //     await signupPage.testSAIdValidation(testData.idValidation.saIdWithLetters, { clearFirst: true });
//     //     await signupPage.testSAIdValidation(testData.idValidation.saIdWithSpecialChars, { clearFirst: true, clickRegister: true, waitTime: 2000 });
//     //     await ScreenshotHelper(signupPage.page, screenshotDir, 'T34-signup', testInfo);
//     // });

//     // test('T35-Valid Passport Number Format', async ({ signupPage, testData }, testInfo) => {
//     //     await signupPage.highlightIdDropdown();
//     //     await signupPage.selectPassport();
//     //     await signupPage.highlightPassportOption();
//     //     await signupPage.testPassportValidation(testData.idValidation.validPassport);
//     //     await ScreenshotHelper(signupPage.page, screenshotDir, 'T35-signup', testInfo);
//     // });

//     // test('T36-Invalid Passport Number Validation', async ({ signupPage, testData }, testInfo) => {
//     //     await signupPage.selectPassport();
//     //     await signupPage.testPassportValidation(testData.idValidation.shortPassport);
//     //     await signupPage.testPassportValidation(testData.idValidation.passportWithSpecial, { clearFirst: true });
//     //     await signupPage.testPassportValidation(testData.idValidation.allNumericPassport, { clearFirst: true, clickRegister: true, waitTime: 2000 });
//     //     await ScreenshotHelper(signupPage.page, screenshotDir, 'T36-signup', testInfo);
//     // });

//     // test('T37-Date of Birth Selection and Complete Registration', async ({ signupPage, testData }, testInfo) => {
//     //     await signupPage.selectSouthAfricanID();
//     //     await signupPage.fillSouthAfricanID(testData.idValidation.validSAId);
//     //     await signupPage.highlightDobDropdown();
//     //     await signupPage.selectDateOfBirth();
//     //     await signupPage.agreeToAll();
//     //     await signupPage.highlightRegisterButton();
//     //     await signupPage.page.waitForTimeout(1000);
//     //     await ScreenshotHelper(signupPage.page, screenshotDir, 'T37-signup', testInfo);
//     // });

//     // test('T38-Empty ID Number Field Validation', async ({ signupPage, testData }, testInfo) => {
//     //     await signupPage.selectSouthAfricanID();
//     //     await signupPage.highlightSAIdInput();
//     //     await signupPage.clickRegister();
//     //     await signupPage.page.waitForTimeout(2000);
//     //     await ScreenshotHelper(signupPage.page, screenshotDir, 'T38-signup', testInfo);
//     // });
// });

// // // ------------------------------------------------------------------
// // // 🧪 SUITE 4: Hamburger Menu Sign-Up Flow
// // // ------------------------------------------------------------------
// test.describe('Hamburger Menu Sign-Up Flow', () => {
//     // Runs before each test in this 'describe' block
//     test.beforeEach(async ({ signupPage, signupUtils }) => {
//         await signupPage.goto();
//         await signupUtils.resetModalState();
//         await signupPage.clickHamburgerSignUp();
//     });

//     test('T40-Sign Up Code Mixed Case Letters', async ({ signupPage, testData }, testInfo) => {
//         const info = { mobile: testData.mobileValidation.valid, pass: testData.passwordValidation.default, fName: testData.basicInfo.firstName, lName: testData.basicInfo.lastName, email: testData.basicInfo.email };
//         await signupPage.testVoucherCode(testData.codeValidation.mixedCase, info);
//         await ScreenshotHelper(signupPage.page, screenshotDir, 'T40-signup', testInfo);
//     });

//     test('T41-Sign Up Code with Numeric Characters', async ({ signupPage, testData }, testInfo) => {
//         const info = { mobile: testData.mobileValidation.valid, pass: testData.passwordValidation.default, fName: testData.basicInfo.firstName, lName: testData.basicInfo.lastName, email: testData.basicInfo.email };
//         await signupPage.testVoucherCode(testData.codeValidation.withNumbers, info);
//         await ScreenshotHelper(signupPage.page, screenshotDir, 'T41-signup', testInfo);
//     });

//     test('T42-Sign Up Code with Special Characters (Step 2)', async ({ signupPage, testData }, testInfo) => {
//         // This test is unique as it's the only one in this group that goes to step 2
//         await signupPage.fillBasicInfo(
//             testData.mobileValidation.valid,
//             testData.passwordValidation.default,
//             testData.basicInfo.firstName,
//             testData.basicInfo.lastName,
//             testData.basicInfo.email
//         );
//         await signupPage.clickNext();
//         await signupPage.testStep2SignUpCode(testData.codeValidation.withSpecial);
//         await ScreenshotHelper(signupPage.page, screenshotDir, 'T42-signup', testInfo);
//     });

//     test('T43-Valid Referral Code', async ({ signupPage, testData }, testInfo) => {
//         const info = { mobile: testData.mobileValidation.valid, pass: testData.passwordValidation.default, fName: testData.basicInfo.firstName, lName: testData.basicInfo.lastName, email: testData.basicInfo.email };
//         await signupPage.testReferralCode(testData.codeValidation.validReferral, info);
//         await ScreenshotHelper(signupPage.page, screenshotDir, 'T43-signup', testInfo);
//     });

//     test('T44-Referral Code Case Insensitive', async ({ signupPage, testData }, testInfo) => {
//         const info = { mobile: testData.mobileValidation.valid, pass: testData.passwordValidation.default, fName: testData.basicInfo.firstName, lName: testData.basicInfo.lastName, email: testData.basicInfo.email };
//         await signupPage.testReferralCode(testData.codeValidation.validReferral, info);
//         // We only care about the final state for the screenshot
//         await signupPage.testReferralCode(testData.codeValidation.uppercaseReferral, info, { clearFirst: true });
//         await ScreenshotHelper(signupPage.page, screenshotDir, 'T44-signup', testInfo);
//     });

//     test('T45-Referral Code with Numeric Characters', async ({ signupPage, testData }, testInfo) => {
//         const info = { mobile: testData.mobileValidation.valid, pass: testData.passwordValidation.default, fName: testData.basicInfo.firstName, lName: testData.basicInfo.lastName, email: testData.basicInfo.email };
//         await signupPage.testReferralCode(testData.codeValidation.referralWithNumbers, info);
//         await ScreenshotHelper(signupPage.page, screenshotDir, 'T45-signup', testInfo);
//     });

//     test('T46-Referral Code with Special Characters', async ({ signupPage, testData }, testInfo) => {
//         const info = { mobile: testData.mobileValidation.valid, pass: testData.passwordValidation.default, fName: testData.basicInfo.firstName, lName: testData.basicInfo.lastName, email: testData.basicInfo.email };
//         await signupPage.testReferralCode(testData.codeValidation.referralWithHyphen, info);
//         await ScreenshotHelper(signupPage.page, screenshotDir, 'T46-signup', testInfo);
//     });
// });