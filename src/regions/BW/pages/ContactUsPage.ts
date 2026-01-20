import { HomePage } from "./HomePage";
import { contactUsPageLocators } from "../locators/contactusPageLocators";
import { loadLocatorsFromExcel } from "../../../global/utils/file-utils/excelReader";
import { getLocator } from "../../../global/utils/file-utils/locatorResolver";
import { highlightElementBorder } from "../../Common-Flows/HighlightElements";
import { expect } from "@playwright/test";
// import { loadLocatorsFromExcel } from "../../../global/utils/file-utils/excelReader";
// import { getLocator } from "../../../global/utils/file-utils/locatorResolver";
const file = "src/global/utils/file-utils/locators.xlsx";

export class ContactUsPage extends HomePage {
    // page: import('@playwright/test').Page;
    ContactUsPagelocatorRegistry: Record<string, import('@playwright/test').Locator>;
    constructor(page: import('@playwright/test').Page) {
        super(page);
        this.page = page;
        const configs = loadLocatorsFromExcel(file, "ContactUsPage");
        this.ContactUsPagelocatorRegistry = {
            ...this.HomePagelocatorsRegistry,
            chatToLiveSupport : getLocator(this.page, configs["chatToLiveSupport"]),
            email : getLocator(this.page, configs["email"]),
            X : getLocator(this.page, configs["X"]),
            facebook : getLocator(this.page, configs["facebook"]),
            call : getLocator(this.page, configs["call"]),
            formMobileInput : getLocator(this.page, configs["formMobileInput"]),
            formEmailInput : getLocator(this.page, configs["formEmailInput"]),
            formQueryType : getLocator(this.page, configs["formQueryType"]),
            formQueryInput : getLocator(this.page, configs["formQueryInput"]),
            formSubmitButton : getLocator(this.page, configs["formSubmitButton"]),
        }

        // this.contactUsForm = page.getByText(contactUsPageLocators.contactUsForm?.selector || 'form#contact-us-form');
        // this.chatToLiveSupport = page.getByText(contactUsPageLocators.chatToLiveSupport.options.name).nth(contactUsPageLocators.chatToLiveSupport.nth || 0);
        // this.email = page.getByText(contactUsPageLocators.email.options.name);
        // this.X = page.getByText(contactUsPageLocators.X.options.name);
        // this.facebook = page.getByText(contactUsPageLocators.facebook.options.name);
        // this.call = page.getByText(contactUsPageLocators.call.options.name);
    }
    
    // Verification Methods
    async verifyAllContent(){
        await expect(this.ContactUsPagelocatorRegistry.X).toBeVisible({ timeout: 15000 });
        await highlightElementBorder(this.ContactUsPagelocatorRegistry.X)
        await expect(this.ContactUsPagelocatorRegistry.email).toBeVisible({ timeout: 15000 });
        await highlightElementBorder(this.ContactUsPagelocatorRegistry.email)
        await expect(this.ContactUsPagelocatorRegistry.call).toBeVisible({ timeout: 15000 });
        await highlightElementBorder(this.ContactUsPagelocatorRegistry.call)
        await expect(this.ContactUsPagelocatorRegistry.facebook).toBeVisible({ timeout: 15000 });
        await highlightElementBorder(this.ContactUsPagelocatorRegistry.facebook)
        await expect(this.ContactUsPagelocatorRegistry.chatToLiveSupport).toBeVisible({ timeout: 15000 });
        await highlightElementBorder(this.ContactUsPagelocatorRegistry.chatToLiveSupport)
        await expect(this.ContactUsPagelocatorRegistry.formEmailInput).toBeVisible({ timeout: 15000 });
        await highlightElementBorder(this.ContactUsPagelocatorRegistry.formEmailInput)
        await expect(this.ContactUsPagelocatorRegistry.formMobileInput).toBeVisible({ timeout: 15000 });
        await highlightElementBorder(this.ContactUsPagelocatorRegistry.formMobileInput)
        await expect(this.ContactUsPagelocatorRegistry.formQueryInput).toBeVisible({ timeout: 15000 });
        await highlightElementBorder(this.ContactUsPagelocatorRegistry.formQueryType)
        await expect(this.ContactUsPagelocatorRegistry.formQueryType).toBeVisible({ timeout: 15000 });
        await highlightElementBorder(this.ContactUsPagelocatorRegistry.formQueryInput)
        await expect(this.ContactUsPagelocatorRegistry.formSubmitButton).toBeVisible({ timeout: 15000 });
        await highlightElementBorder(this.ContactUsPagelocatorRegistry.formSubmitButton)
    }

    async verifyContactForm(){
        await expect(this.page.getByText('Contact Form').first()).toBeVisible({ timeout: 15000 });
        await highlightElementBorder(this.page.getByText('Contact Form').first());
        await expect(this.ContactUsPagelocatorRegistry.formEmailInput).toBeVisible({ timeout: 15000 });
        await highlightElementBorder(this.ContactUsPagelocatorRegistry.formEmailInput)
        await expect(this.ContactUsPagelocatorRegistry.formMobileInput).toBeVisible({ timeout: 15000 });
        await highlightElementBorder(this.ContactUsPagelocatorRegistry.formMobileInput)
        await expect(this.ContactUsPagelocatorRegistry.formQueryInput).toBeVisible({ timeout: 15000 });
        await highlightElementBorder(this.ContactUsPagelocatorRegistry.formQueryType)
        await expect(this.ContactUsPagelocatorRegistry.formQueryType).toBeVisible({ timeout: 15000 });
        await highlightElementBorder(this.ContactUsPagelocatorRegistry.formQueryInput)
        await expect(this.ContactUsPagelocatorRegistry.formSubmitButton).toBeVisible({ timeout: 15000 });
        await highlightElementBorder(this.ContactUsPagelocatorRegistry.formSubmitButton)
    }

    async verifyChatToLiveSupport(){
        this.ContactUsPagelocatorRegistry.chatToLiveSupport.waitFor({ state: 'visible', timeout: 15000 });
        await highlightElementBorder(this.ContactUsPagelocatorRegistry.chatToLiveSupport);
    }

    async verifyEmail(){
        this.ContactUsPagelocatorRegistry.email.waitFor({ state: 'visible', timeout: 15000 });
        await highlightElementBorder(this.ContactUsPagelocatorRegistry.email);
    }

    async verifyX(){
        this.ContactUsPagelocatorRegistry.X.waitFor({ state: 'visible', timeout: 15000 });
        await highlightElementBorder(this.ContactUsPagelocatorRegistry.X);
    }

    async verifyFacebook(){
        this.ContactUsPagelocatorRegistry.facebook.waitFor({ state: 'visible', timeout: 15000 });
        await highlightElementBorder(this.ContactUsPagelocatorRegistry.facebook);
    }   

    async verifyCall(){
        this.ContactUsPagelocatorRegistry.call.waitFor({ state: 'visible', timeout: 15000 });
        await highlightElementBorder(this.ContactUsPagelocatorRegistry.call);
    }

    async verifyFormEmailInput(){
        this.ContactUsPagelocatorRegistry.formEmailInput.waitFor({ state: 'visible', timeout: 15000 });
        await highlightElementBorder(this.ContactUsPagelocatorRegistry.formEmailInput);
    }

    async verifyFormMobileInput(){
        this.ContactUsPagelocatorRegistry.formMobileInput.waitFor({ state: 'visible', timeout: 15000 });
        await highlightElementBorder(this.ContactUsPagelocatorRegistry.formMobileInput);
    }

    async verifyFormQueryType(){
        this.ContactUsPagelocatorRegistry.formQueryType.waitFor({ state: 'visible', timeout: 15000 });
        await highlightElementBorder(this.ContactUsPagelocatorRegistry.formQueryType);
    }

    async verifyFormQueryInput(){
        this.ContactUsPagelocatorRegistry.formQueryInput.waitFor({ state: 'visible', timeout: 15000 });
        await highlightElementBorder(this.ContactUsPagelocatorRegistry.formQueryInput);
    }

    async verifyFormSubmitButton(){
        this.ContactUsPagelocatorRegistry.formSubmitButton.waitFor({ state: 'visible', timeout: 15000 });
        await highlightElementBorder(this.ContactUsPagelocatorRegistry.formSubmitButton);
    }

    // Clicking Functions :
    async clickOnChatToLiveSupport() {
        await this.ContactUsPagelocatorRegistry.chatToLiveSupport.click();
        await this.page.waitForLoadState('domcontentloaded');
        await this.page.waitForTimeout(2000);
    }

    async clickOnEmail() {
        await this.ContactUsPagelocatorRegistry.email.click();
        await this.page.waitForLoadState('domcontentloaded');
        await this.page.waitForTimeout(2000);
    }

    async clickOnX() {
        await this.ContactUsPagelocatorRegistry.X.click();
        await this.page.waitForLoadState('domcontentloaded');
        await this.page.waitForTimeout(2000);
    }

    async clickOnFacebook() {
        await this.ContactUsPagelocatorRegistry.facebook.click();
        await this.page.waitForLoadState('domcontentloaded');
        await this.page.waitForTimeout(2000);
    }

    async clickOnCall() {
        await this.ContactUsPagelocatorRegistry.call.click();
        await this.page.waitForLoadState('domcontentloaded');
        await this.page.waitForTimeout(2000);
    }

    async gotoContactUs(){
        await this.page.goto('/contact-us')
    }
}