// const data = require('../links/navbarLinks.json')[0];
const apidata = require('../apis/Sign-upPage/api.json')[0];

const userData = require('../json-data/userData.json');
import { expect } from '@playwright/test';
import { loginLocators } from '../locators/loginPageLocators';
import { time } from 'console';


const config = process.env.BASE_URL || 'https://betway.co.za/';
import { loadLocatorsFromExcel } from "../../../global/utils/file-utils/excelReader";
import { getLocator } from "../../../global/utils/file-utils/locatorResolver";
import { highlightElementBorder, highlightElements } from '../../Common-Flows/HighlightElements';
import { HomePage } from './HomePage';
const LOCATOR_URL = "https://github.com/athrvzoz/LocatorFile/raw/refs/heads/main/locators.xlsx"

export class LoginPage extends HomePage {

    readonly LoginPagelocatorsRegistry: Record<string, import('@playwright/test').Locator>;
    page: import('@playwright/test').Page;

    constructor(page: import('@playwright/test').Page) {
        super(page);
        this.page = page;
        const configs = loadLocatorsFromExcel(LOCATOR_URL, "LoginPage");

        this.LoginPagelocatorsRegistry = {
            ...this.HomePagelocatorsRegistry,
            mobileInput: getLocator(page, configs["mobileInput"]),
            formPasswordInput: getLocator(page, configs["formPasswordInput"]),
            passwordInput: getLocator(page, configs["passwordInput"]),
            formMobileInput: getLocator(page, configs["formMobileInput"]),
            loginButton: getLocator(page, configs["loginButton"]),
            hamburgerloginButton: getLocator(page, configs["loginButtonfromHeader"]),
            signUpButton: getLocator(page, configs["signUpButton"]),
            hamburgerMenu: getLocator(page, configs["hamburgerMenu"]),
            SportButton: getLocator(page, configs["SportButton"]),
            CasinoButton: getLocator(page, configs["CasinoButton"]),
            signUpButtonfromHamburger: getLocator(page, configs["signUpButtonfromHamburger"]),
            loginButtonFromPopup: getLocator(page, configs["loginButtonFromPopup"]),
            welcomeUser: getLocator(page, configs["welcomeUser"]),
            username: getLocator(page, configs["username"]),
            eyeButton: getLocator(page, configs["formPasswordInput"]).locator('..').getByRole('img').first(),
            BetInfluencer: getLocator(page, configs["betInfluencer"]),
        };
    }

    // Verify presence functions
    async verifyLoginWindow() {
        await this.LoginPagelocatorsRegistry.formMobileInput.waitFor({ state: 'visible', timeout: 15000 });
        await highlightElements(this.LoginPagelocatorsRegistry.formMobileInput.locator('..').locator('..').locator('..').locator('..'));
    }

    async verifyHamburgerLoginButton() {
        await this.LoginPagelocatorsRegistry.hamburgerloginButton.waitFor({ state: 'visible', timeout: 15000 });
        await highlightElements(this.LoginPagelocatorsRegistry.hamburgerloginButton);
    }

    async verifyHeaderLoginButton() {
        await expect(this.LoginPagelocatorsRegistry.loginButton).toBeVisible({ timeout: 15000 });
        await highlightElements(this.LoginPagelocatorsRegistry.loginButton);
    }

    async verifyLoginButtonFromPopupThroughHamburger() {
        const loginButtonSignUpPopup = this.page.getByRole('button', { name: 'Login' }).nth(2);
        await expect(loginButtonSignUpPopup).toBeVisible({ timeout: 15000 });
        await highlightElementBorder(loginButtonSignUpPopup);
    }
    async verifyLoginButtonFromPopupWithoutHamburger() {
        await expect(this.LoginPagelocatorsRegistry.loginButtonFromPopup).toBeVisible({ timeout: 15000 });
        await this.LoginPagelocatorsRegistry.loginButtonFromPopup.click();
        await highlightElementBorder(this.LoginPagelocatorsRegistry.loginButtonFromPopup);
    }

    async verifyLoginButtonInSignUp() {
        await this.LoginPagelocatorsRegistry.loginButtonFromPopup.waitFor({ state: 'visible', timeout: 15000 });
        await highlightElementBorder(this.LoginPagelocatorsRegistry.loginButtonFromPopup);
    }

    async verifyWelcomeUser(username: string) {
        await expect(this.page.getByText(`${username}`)).toBeVisible({ timeout: 15000 });
        await highlightElements(this.page.getByText(`${username}`).locator('..'));
    }

    // Navigation Functions
    async gotoSignUpfromLoginPopUp() {
        await this.LoginPagelocatorsRegistry.signUpButtonfromHamburger.click();
    }

    async gotoLoginFromSignUp() {
        await this.LoginPagelocatorsRegistry.loginButtonFromPopup.click();
    }

    async goto() {
        await this.page.goto('/');
        await this.page.waitForLoadState('domcontentloaded');
        if (await this.page.locator('#modal-close-btn').nth(1).isVisible()) {
            await this.page.locator('#modal-close-btn').nth(1).waitFor({ state: 'visible', });
            await this.page.locator('#modal-close-btn').nth(1).click();
        }
    }

    async gotoAviatorPage() {
        await this.page.goto('https://new.betway.co.za/lobby/casino-games/game/aviator');
        await this.page.waitForLoadState('domcontentloaded');
    }

    async gotoSportsPage() {
        await this.goto();
        await this.LoginPagelocatorsRegistry.SportButton.click();
        await this.page.waitForLoadState('domcontentloaded');
    }

    // Clicking Functions
    async clickLogin() {
        await this.LoginPagelocatorsRegistry.loginButton.click();
    }

    async clickHamburgerMenu() {
        await this.page.waitForLoadState('domcontentloaded')
        await this.LoginPagelocatorsRegistry.hamburgerMenu.click();
    }

    async clickLoginButtonFromHamburger() {
        await this.clickHamburgerMenu();
        await this.LoginPagelocatorsRegistry.hamburgerloginButton.click();
    }

    async clickSignUp() {
        await this.LoginPagelocatorsRegistry.signUpButton.click();
        const apiPromise = this.page.waitForResponse(response =>
            response.url().includes(apidata.signupButtonClick) && response.status() === 200
        );
        await apiPromise;
    }

    async clickSignUpFromHeader() {
        await this.clickHamburgerMenu();
        await this.LoginPagelocatorsRegistry.signUpButtonfromHamburger.click();
    }



    // Login Functions
    async Login() {
        await this.goto();
        await this.LoginPagelocatorsRegistry.mobileInput.fill(`${userData.user1.mobile}`);
        await this.LoginPagelocatorsRegistry.passwordInput.fill(`${userData.user1.password}`);
        await this.page.keyboard.press('Enter');
        await this.verifyWelcomeUser(userData.user1.name);
    }

    async LoginArgs(mobile: string, password: string) {
        await this.goto();
        await this.LoginPagelocatorsRegistry.mobileInput.fill(`${mobile}`);
        await this.LoginPagelocatorsRegistry.passwordInput.fill(`${password}`);
        await this.page.keyboard.press('Enter');
        await this.page.waitForTimeout(7000); // Wait for login to complete
    }

    async LoginFromSignupPopupHamburgerMenu() {
        await this.clickSignUpFromHeader();
        await this.LoginPagelocatorsRegistry.loginButtonFromPopup.click();
        await this.page.waitForTimeout(2000);
        await this.LoginFromPopUp();
        await this.verifyWelcomeUser(userData.user1.name);
    }
    async LoginFromSignupPopupHamburgerMenuArgs(mobile: string, password: string) {
        await this.clickLoginButtonFromHamburger();
        await this.LoginPagelocatorsRegistry.formMobileInput.fill(`${mobile}`);
        await this.LoginPagelocatorsRegistry.formPasswordInput.fill(`${password}`);
        await this.page.keyboard.press('Enter');
        await this.page.waitForTimeout(2000);
        await this.LoginPagelocatorsRegistry.eyeButton.click();
        await highlightElements(this.LoginPagelocatorsRegistry.formMobileInput);
        await highlightElements(this.LoginPagelocatorsRegistry.formPasswordInput);
    }

    async LoginThroughPopUp() {
        await this.clickSignUp();
        await this.LoginPagelocatorsRegistry.loginButtonFromPopup.click();
        await this.LoginFromPopUp();
    }

    async LoginFromPopUp() {
        await this.LoginPagelocatorsRegistry.formMobileInput.fill(`${userData.user1.mobile}`);
        await this.LoginPagelocatorsRegistry.formPasswordInput.fill(`${userData.user1.password}`);
        await this.page.keyboard.press('Enter');
        await this.page.waitForTimeout(2000); // Wait for login to complete
        await this.verifyWelcomeUser(userData.user1.name);
    }

    async LoginFromHamburgerMenu(mobile: string, password: string) {
        await this.page.waitForLoadState('domcontentloaded');
        await this.clickLoginButtonFromHamburger();
        await this.LoginPagelocatorsRegistry.formMobileInput.fill(`${mobile}`);
        await this.LoginPagelocatorsRegistry.formPasswordInput.fill(`${password}`);
        await this.page.keyboard.press('Enter');
        await this.page.waitForLoadState('domcontentloaded');
        await this.verifyWelcomeUser(userData.user1.name);
    }

}