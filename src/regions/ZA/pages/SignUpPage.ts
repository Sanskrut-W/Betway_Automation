import { Page, Locator, expect } from '@playwright/test';
import { highlightElements } from '../../../regions/Common-Flows/HighlightElements';
import { loadLocatorsFromExcel } from "../../../global/utils/file-utils/excelReader"; // Adjust path as needed
import { getLocator } from "../../../global/utils/file-utils/locatorResolver"; // Adjust path as needed
import { BasePage } from './BasePage';

// URL for your central locator file
const LOCATOR_URL = "https://zensar-my.sharepoint.com/:x:/r/personal/ujjval_kulkarni_zensar_com/_layouts/15/Doc.aspx?sourcedoc=%7B02896C8A-EC0B-46AF-98B2-F988B799B72C%7D&file=locators.xlsx&action=default&mobileredirect=true&wdPreviousSession=1b46a5c7-0487-4ac7-bf58-931cb3e4f21d&wdOrigin=BROWSELINK%2COFU.EXCEL.EDIT-A-COPY&wdPreviousSessionSrc=OFU";
const file = "src/global/utils/file-utils/locators(2).xlsx";

// ------------------------------------------------------------------
// MOCK DATA: This simulates the data read from your Excel file.
// You MUST add a "SignUpPage" sheet to your 'locators.xlsx' 
// file with the keys/values defined below.
// ------------------------------------------------------------------
const mockSignUpConfigs = {
    // key: { type, value, options, nth }
    "mobileInput": { type: "role", value: "textbox", options: '{"name":"MobileNumber"}', nth: 1 },
    "passwordInput": { type: "role", value: "textbox", options: '{"name":"Enter Password"}', nth: 1 },
    "firstNameInput": { type: "role", value: "textbox", options: '{"name":"First Name"}', nth: 0 },
    "lastNameInput": { type: "role", value: "textbox", options: '{"name":"Surname"}', nth: 0 },
    "emailInput": { type: "role", value: "textbox", options: '{"name":"Email"}', nth: 0 },
    "loginButton": { type: "role", value: "button", options: '{"name":"Login"}', nth: 0 },
    "signUpButton": { type: "role", value: "button", options: '{"name":"Sign Up"}', nth: 0 },
    "nextButton": { type: "role", value: "button", options: '{"name":"Next"}', nth: 0 },
    "previousButton": { type: "role", value: "button", options: '{"name":"Previous"}', nth: 0 },
    "registerButton": { type: "role", value: "button", options: '{"name":"Register"}', nth: 0 },
    "hamburgerMenu": { type: "locator", value: "#header-hamburger-btn", options: '{}', nth: 0 },
    "hamburgerSignupBtn": { type: "role", value: "button", options: '{"name":"Sign Up"}', nth: 1 },
    "idDropdownBase": { type: "role", value: "combobox", options: '{"name":"South African ID"}', nth: 0 },
    "saIdOptionBase": { type: "role", value: "option", options: '{"name":"South African ID"}', nth: 0 },
    "passportOption": { type: "text", value: "Passport", options: '{}', nth: 0 },
    "saIdInput": { type: "role", value: "textbox", options: '{"name":"South African ID"}', nth: 0 },
    "passportInput": { type: "role", value: "textbox", options: '{"name":"Passport"}', nth: 0 },
    "dobDropdown": { type: "role", value: "combobox", options: '{"name":"Date of Birth"}', nth: 0 },
    "signupCodeToggle": { type: "text", value: "I have a signup code", options: '{}', nth: 0 },
    "voucherCodeField": { type: "role", value: "textbox", options: '{"name":"Voucher Code"}', nth: 0 },
    "referralCodeField": { type: "role", value: "textbox", options: '{"name":"Referral Code"}', nth: 0 },
    "agreeToAllCheckbox": { type: "label", value: "Agree to All", options: '{"exact":false}', nth: 0 },
    "diallingCode": { type: "text", value: "+27", options: '{}', nth: 1 },
    "forms": { type: "role", value: "form", options: '{}', nth: 0 },
    // Locators for Regex patterns
    "signUpCodeField": { type: "role", value: "textbox", options: '{"name": "/sign.?up.?code|signup.?code|referral.?code/i"}', nth: 0 },
    "idNumberField": { type: "role", value: "textbox", options: '{"name": "/ID Number|IDNumber/i"}', nth: 0 }
};
// ------------------------------------------------------------------


export class SignUpPage extends BasePage {
    readonly signUpLocatorsRegistry: Record<string, Locator>;

    constructor(page: Page) {
        super(page);

        // ---
        // 🛑 IMPORTANT: This is the MOCKED call.
        // In your real code, you will replace this line with the real call.
        // ---
        // const configs = loadLocatorsFromExcel(LOCATOR_URL, "SignUpPage"); // <-- Your REAL call
        const configs = loadLocatorsFromExcel(file, "signUpPage");        // ---

        // Handle relative locators, like in HomePage.ts
        const idDropdownBase = getLocator(this.page, configs["idDropdownBase"]);
        const saIdOptionBase = getLocator(this.page, configs["saIdOptionBase"]);

        // Initialize the locator registry
        this.signUpLocatorsRegistry = {
            mobileInput: getLocator(this.page, configs["mobileInput"]),
            passwordInput: getLocator(this.page, configs["passwordInput"]),
            firstNameInput: getLocator(this.page, configs["firstNameInput"]),
            lastNameInput: getLocator(this.page, configs["lastNameInput"]),
            loginButton: getLocator(this.page, configs["loginButton"]),
            signUpButton: getLocator(this.page, configs["signUpButton"]),
            nextButton: getLocator(this.page, configs["nextButton"]),
            previousButton: getLocator(this.page, configs["previousButton"]),
            registerButton: getLocator(this.page, configs["registerButton"]),
            hamburgerMenu: getLocator(this.page, configs["hamburgerMenu"]),
            hamburgerSignupBtn: getLocator(this.page, configs["hamburgerSignupBtn"]),
            emailInput: getLocator(this.page, configs["emailInput"]),

            // Relative locators
            idDropdown: getLocator(this.page, configs["idDropdownBase"]),
            saIdOption: getLocator(this.page, configs["saIdOptionBase"]),

            passportOption: getLocator(this.page, configs["passportOption"]),
            saIdInput: getLocator(this.page, configs["saIdInput"]),
            passportInput: getLocator(this.page, configs["passportInput"]),
            dobDropdown: getLocator(this.page, configs["dobDropdown"]),
            signupCodeToggle: getLocator(this.page, configs["signupCodeToggle"]),
            voucherCodeField: getLocator(this.page, configs["voucherCodeField"]),
            referralCodeField: getLocator(this.page, configs["referralCodeField"]),
            agreeToAllCheckbox: getLocator(this.page, configs["agreeToAllCheckbox"]),
            diallingCode: getLocator(this.page, configs["diallingCode"]),
            forms: getLocator(this.page, configs["forms"]),
            signUpCodeField: getLocator(this.page, configs["signUpCodeField"]),
            idNumberField: getLocator(this.page, configs["idNumberField"]),
        };
    }

    // ------------------------------------------------------------------
    // 1. Navigation Methods
    // ------------------------------------------------------------------

    async goto() {
        // Always land on the sports page (never the home page)
        await super.goto('/sport/soccer');
    }

    // ------------------------------------------------------------------
    // 2. Click Actions
    // ------------------------------------------------------------------

    async clickSignUp() {
        await this.signUpLocatorsRegistry.signUpButton.click();
        await this.page.waitForTimeout(500);
    }

    async clickLogin() {
        await this.signUpLocatorsRegistry.loginButton.click();
    }

    async clickHamburgerMenu() {
        await this.signUpLocatorsRegistry.hamburgerMenu.click();
        await this.page.waitForTimeout(500);
    }

    async clickHamburgerSignUp() {
        await this.clickHamburgerMenu();
        await this.signUpLocatorsRegistry.hamburgerSignupBtn.click();
        await this.page.waitForTimeout(1000);
    }

    async clickNext() {
        const nextButton = this.signUpLocatorsRegistry.nextButton;
        if (await nextButton.isVisible({ timeout: 2000 })) {
            await nextButton.click();
            await this.page.waitForTimeout(1000);
        }
    }

    async clickPrevious() {
        const previousButton = this.signUpLocatorsRegistry.previousButton;
        if (await previousButton.isVisible({ timeout: 1000 })) {
            await previousButton.click();
            await this.page.waitForTimeout(500);
        }
    }

    async clickRegister() {
        const registerButton = this.signUpLocatorsRegistry.registerButton;
        if (await registerButton.isVisible({ timeout: 2000 })) {
            await registerButton.click();
        }
    }

    // ------------------------------------------------------------------
    // 3. Form Filling Methods
    // ------------------------------------------------------------------

    async fillBasicInfo(mobile: string, password: string, firstName: string, lastName: string, email: string) {
        await this.signUpLocatorsRegistry.mobileInput.fill(mobile);
        await this.signUpLocatorsRegistry.passwordInput.fill(password);
        await this.signUpLocatorsRegistry.firstNameInput.fill(firstName);
        await this.signUpLocatorsRegistry.lastNameInput.fill(lastName);
        await this.signUpLocatorsRegistry.emailInput.fill(email);
    }

    async fillEmail(email: string) {
        await this.signUpLocatorsRegistry.emailInput.fill(email);
    }

    async fillMobileNumber(mobile: string) {
        await this.signUpLocatorsRegistry.mobileInput.fill(mobile);
    }

    async fillPassword(password: string) {
        await this.signUpLocatorsRegistry.passwordInput.fill(password);
    }

    async fillFirstName(firstName: string) {
        await this.signUpLocatorsRegistry.firstNameInput.fill(firstName);
    }

    async fillLastName(lastName: string) {
        await this.signUpLocatorsRegistry.lastNameInput.fill(lastName);
    }

    async fillReferralCode(code: string) {
        await this.signUpLocatorsRegistry.referralCodeField.fill(code);
    }

    async clearReferralCode() {
        await this.signUpLocatorsRegistry.referralCodeField.clear();
    }

    async fillVoucherCode(code: string) {
        await this.signUpLocatorsRegistry.voucherCodeField.fill(code);
    }

    async fillSignUpCode(code: string) {
        try {
            const codeField = this.signUpLocatorsRegistry.signUpCodeField;
            if (await codeField.isVisible({ timeout: 2000 })) {
                await codeField.fill(code);
            }
        } catch (error) {
            console.log('Sign-up code field not found');
        }
    }

    // ------------------------------------------------------------------
    // 4. ID Document Methods
    // ------------------------------------------------------------------

    async selectSouthAfricanID() {
        await this.signUpLocatorsRegistry.idDropdown.click();
        await this.page.waitForTimeout(500);
        await this.signUpLocatorsRegistry.saIdOption.click();
        await this.page.waitForTimeout(500);
    }

    async selectPassport() {
        await this.signUpLocatorsRegistry.idDropdown.click();
        await this.page.waitForTimeout(500);
        await this.signUpLocatorsRegistry.passportOption.click();
        await this.page.waitForTimeout(500);
    }

    async fillSouthAfricanID(idNumber: string) {
        await this.signUpLocatorsRegistry.saIdInput.fill(idNumber);
    }

    async clearSAIdInput() {
        await this.signUpLocatorsRegistry.saIdInput.clear();
    }

    async fillPassportNumber(passportNumber: string) {
        await this.signUpLocatorsRegistry.passportInput.fill(passportNumber);
    }

    async clearPassportInput() {
        await this.signUpLocatorsRegistry.passportInput.clear();
    }

    async fillIdNumber(idNumber: string) {
        try {
            const idField = this.signUpLocatorsRegistry.idNumberField;
            await idField.waitFor({ state: 'visible', timeout: 5000 });
            await idField.fill(idNumber);
        } catch (error) {
            console.log('ID Number field not found');
        }
    }

    // ------------------------------------------------------------------
    // 5. Date of Birth Methods
    // ------------------------------------------------------------------

    async selectDateOfBirth() {
        await this.signUpLocatorsRegistry.dobDropdown.click();
        await this.page.waitForTimeout(500);
        // Date selection logic can be added here if needed
    }

    // ------------------------------------------------------------------
    // 6. Checkbox Methods
    // ------------------------------------------------------------------

    async clickSignupCodeToggle() {
        await this.signUpLocatorsRegistry.signupCodeToggle.click();
        await this.page.waitForTimeout(500);
    }

    async agreeToAll() {
        try {
            const agreeToAll = this.signUpLocatorsRegistry.agreeToAllCheckbox;
            if (await agreeToAll.isVisible({ timeout: 2000 })) {
                await agreeToAll.click();
            }
        } catch (error) {
            console.log('Agree to All checkbox not found');
        }
    }

    // ------------------------------------------------------------------
    // 7. Clear Form Methods
    // ------------------------------------------------------------------

    async clearAllFields() {
        try {
            await this.signUpLocatorsRegistry.mobileInput.clear();
            await this.signUpLocatorsRegistry.passwordInput.clear();
            await this.signUpLocatorsRegistry.firstNameInput.clear();
            await this.signUpLocatorsRegistry.lastNameInput.clear();
        } catch (e) {
            console.log('Could not clear form fields');
        }
    }

    // ------------------------------------------------------------------
    // 8. Locator Accessor (Get) Methods
    // ------------------------------------------------------------------

    getMobileInput(): Locator {
        return this.signUpLocatorsRegistry.mobileInput;
    }
    getPasswordInput(): Locator {
        return this.signUpLocatorsRegistry.passwordInput;
    }
    getFirstNameInput(): Locator {
        return this.signUpLocatorsRegistry.firstNameInput;
    }
    getLastNameInput(): Locator {
        return this.signUpLocatorsRegistry.lastNameInput;
    }
    getEmailInput(): Locator {
        return this.signUpLocatorsRegistry.emailInput;
    }
    getSignUpButton(): Locator {
        return this.signUpLocatorsRegistry.signUpButton;
    }
    getLoginButton(): Locator {
        return this.signUpLocatorsRegistry.loginButton;
    }
    getRegisterButton(): Locator {
        return this.signUpLocatorsRegistry.registerButton;
    }
    getReferralCodeField(): Locator {
        return this.signUpLocatorsRegistry.referralCodeField;
    }
    getVoucherCodeField(): Locator {
        return this.signUpLocatorsRegistry.voucherCodeField;
    }
    getSAIdInput(): Locator {
        return this.signUpLocatorsRegistry.saIdInput;
    }
    getPassportInput(): Locator {
        return this.signUpLocatorsRegistry.passportInput;
    }
    getIdDropdown(): Locator {
        return this.signUpLocatorsRegistry.idDropdown;
    }
    getDobDropdown(): Locator {
        return this.signUpLocatorsRegistry.dobDropdown;
    }
    getForm(): Locator {
        return this.signUpLocatorsRegistry.forms;
    }
    getHamburgerSignupBtn(): Locator {
        return this.signUpLocatorsRegistry.hamburgerSignupBtn;
    }

    // ------------------------------------------------------------------
    // 9. Highlighting Methods
    // ------------------------------------------------------------------

    async highlightMobileInput() {
        await highlightElements(this.signUpLocatorsRegistry.mobileInput);
    }
    async highlightPasswordInput() {
        await highlightElements(this.signUpLocatorsRegistry.passwordInput);
    }
    async highlightFirstNameInput() {
        await highlightElements(this.signUpLocatorsRegistry.firstNameInput);
    }
    async highlightLastNameInput() {
        await highlightElements(this.signUpLocatorsRegistry.lastNameInput);
    }
    async highlightEmailInput() {
        await highlightElements(this.signUpLocatorsRegistry.emailInput);
    }
    async highlightSignUpButton() {
        await highlightElements(this.signUpLocatorsRegistry.signUpButton);
    }
    async highlightLoginButton() {
        await highlightElements(this.signUpLocatorsRegistry.loginButton);
    }
    async highlightRegisterButton() {
        await highlightElements(this.signUpLocatorsRegistry.registerButton);
    }
    async highlightSAIdInput() {
        await highlightElements(this.signUpLocatorsRegistry.saIdInput);
    }
    async highlightPassportInput() {
        await highlightElements(this.signUpLocatorsRegistry.passportInput);
    }
    async highlightIdDropdown() {
        await highlightElements(this.signUpLocatorsRegistry.idDropdown);
    }
    async highlightSAIdOption() {
        await highlightElements(this.signUpLocatorsRegistry.saIdOption);
    }
    async highlightPassportOption() {
        await highlightElements(this.signUpLocatorsRegistry.passportOption);
    }
    async highlightDobDropdown() {
        await highlightElements(this.signUpLocatorsRegistry.dobDropdown);
    }
    async highlightHamburgerMenu() {
        await highlightElements(this.signUpLocatorsRegistry.hamburgerMenu);
    }
    async highlightHamburgerSignupBtn() {
        await highlightElements(this.signUpLocatorsRegistry.hamburgerSignupBtn);
    }
    async highlightSignupCodeToggle() {
        await highlightElements(this.signUpLocatorsRegistry.signupCodeToggle);
    }
    async highlightVoucherCodeField() {
        await highlightElements(this.signUpLocatorsRegistry.voucherCodeField);
    }
    async highlightReferralCodeField() {
        await highlightElements(this.signUpLocatorsRegistry.referralCodeField);
    }
    async highlightSignUpCodeField() {
        try {
            const codeField = this.signUpLocatorsRegistry.signUpCodeField;
            if (await codeField.isVisible({ timeout: 2000 })) {
                await highlightElements(codeField);
            }
        } catch (error) {
            console.log('Sign-up code field not found for highlighting');
        }
    }
    async highlightDiallingCode() {
        try {
            if (await this.signUpLocatorsRegistry.diallingCode.isVisible({ timeout: 1000 })) {
                await highlightElements(this.signUpLocatorsRegistry.diallingCode);
            }
        } catch (e) {
            console.log('Dialling code not found for highlighting');
        }
    }

    // ------------------------------------------------------------------
    // 10. Task-Oriented Helper Methods
    // ------------------------------------------------------------------

    async testMobileNumberValidation(mobile: string, defaultPassword: string) {
        await this.fillMobileNumber(mobile);
        await this.fillPassword(defaultPassword);
        await this.highlightMobileInput();
        await this.page.waitForTimeout(1000);
    }

    async testPasswordValidation(
        password: string,
        validMobile: string,
        basicInfo: { firstName: string, lastName: string, email: string },
        options?: { clickNext?: boolean, waitTime?: number }
    ) {
        await this.fillBasicInfo(validMobile, password, basicInfo.firstName, basicInfo.lastName, basicInfo.email);
        if (options?.clickNext) await this.clickNext();
        await this.highlightPasswordInput();
        await this.page.waitForTimeout(options?.waitTime || 1000);
    }

    async testNameValidation(
        firstName: string,
        lastName: string,
        validMobile: string,
        defaultPassword: string,
        options?: { clickNext?: boolean, waitTime?: number }
    ) {
        await this.fillMobileNumber(validMobile);
        await this.fillPassword(defaultPassword);
        await this.fillFirstName(firstName);
        await this.fillLastName(lastName);
        if (options?.clickNext) await this.clickNext();
        await this.highlightFirstNameInput();
        await this.highlightLastNameInput();
        await this.page.waitForTimeout(options?.waitTime || 1000);
    }

    async testSAIdValidation(idNumber: string, options?: { clearFirst?: boolean, clickRegister?: boolean, waitTime?: number }) {
        if (options?.clearFirst) await this.clearSAIdInput();
        await this.fillSouthAfricanID(idNumber);
        await this.highlightSAIdInput();
        if (options?.clickRegister) await this.clickRegister();
        await this.page.waitForTimeout(options?.waitTime || 1000);
    }

    async testPassportValidation(passportNumber: string, options?: { clearFirst?: boolean, clickRegister?: boolean, waitTime?: number }) {
        if (options?.clearFirst) await this.clearPassportInput();
        await this.fillPassportNumber(passportNumber);
        await this.highlightPassportInput();
        if (options?.clickRegister) await this.clickRegister();
        await this.page.waitForTimeout(options?.waitTime || 1000);
    }

    async testVoucherCode(code: string, basicInfo: { mobile: string, pass: string, fName: string, lName: string, email: string }) {
        await this.fillBasicInfo(basicInfo.mobile, basicInfo.pass, basicInfo.fName, basicInfo.lName, basicInfo.email);
        await this.highlightSignupCodeToggle();
        await this.clickSignupCodeToggle();
        await this.fillVoucherCode(code);
        await this.highlightVoucherCodeField();
        await this.page.waitForTimeout(1000);
    }

    async testReferralCode(code: string, basicInfo: { mobile: string, pass: string, fName: string, lName: string, email: string }, options?: { clearFirst?: boolean }) {
        await this.fillBasicInfo(basicInfo.mobile, basicInfo.pass, basicInfo.fName, basicInfo.lName, basicInfo.email);
        if (options?.clearFirst) await this.clearReferralCode();
        await this.fillReferralCode(code);
        await this.highlightReferralCodeField();
        await this.page.waitForTimeout(1000);
    }

    async testStep2SignUpCode(code: string) {
        await this.fillSignUpCode(code);
        await this.highlightSignUpCodeField();
        await this.page.waitForTimeout(1000);
    }
}


// update excel with these locators



// key type value options nth
// mobileInput role textbox {"name":"MobileNumber"} 1
// passwordInput role textbox {"name":"Password"} 1
// firstNameInput role textbox {"name":"First Name"} 0
// lastNameInput role textbox {"name":"Surname"} 0
// loginButton role button {"name":"Login"} 0
// signUpButton role button {"name":"Sign Up"} 0
// nextButton role button {"name":"Next"} 0
// previousButton role button {"name":"Previous"} 0
// registerButton role button {"name":"Register"} 0
// hamburgerMenu locator #header-hamburger-btn {} 0
// hamburgerSignupBtn role button {"name":"Sign Up"} 1
// idDropdownBase role combobox {"name":"South African ID"} 0
// saIdOptionBase role option {"name":"South African ID"} 0
// passportOption text Passport {} 0
// saIdInput role textbox {"name":"South African ID"} 0
// passportInput role textbox {"name":"Passport"} 0
// dobDropdown role combobox {"name":"Date of Birth"} 0
// signupCodeToggle text I have a signup code {} 0
// voucherCodeField role textbox {"name":"Voucher Code"} 0
// referralCodeField role textbox {"name":"Referral Code"} 0
// agreeToAllCheckbox label Agree to All {"exact":false} 0
// diallingCode text +27 {} 1
// forms role form {} 0
// signUpCodeField role textbox `{"name": "/sign.?up.?code signup.?code
// idNumberField role textbox `{"name": "/ID Number IDNumber/i"}`
