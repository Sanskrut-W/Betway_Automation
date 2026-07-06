import { LoginPage } from "./LoginPage";
import { casinoPageLocators } from '../locators/casinoPageLocators';
import { SportsPage } from "./SportsPage";
import { virtualPageLocators } from "../locators/virtualPageLocators";
import { loadLocatorsFromExcel } from "../tests/modules/footer/excelReader";
import { getLocator } from "../tests/modules/footer/locatorResolver";
import { highlightElements } from "../../Common-Flows/HighlightElements";
import { HomePage } from "./HomePage";
import { expect } from "@playwright/test";
const file = "src/global/utils/file-utils/locators.xlsx";


export class HowToPage extends HomePage {
    howToPageLocatorRegistry: Record<string, import('@playwright/test').Locator>;

    constructor(page: import('@playwright/test').Page) {
        super(page);
        this.page = page;
        this.howToPageLocatorRegistry = {
            ...this.HomePagelocatorsRegistry,
            howToBet: this.page.getByText(/How To Bet/i).first(),
            howToResetPassword: this.page.getByText(/How To Reset Password/i).first(),
            howToDeposit: this.page.getByText(/How To Deposit/i).first(),
            howToRegister: this.page.getByText(/How To Register/i).first(),
            howToWithdraw: this.page.getByText(/How To Withdraw/i).first(),
            howToCasino: this.page.getByText(/How to Casino/i).first(),
            howToJackpot: this.page.getByText(/How To Jackpot/i).first(),
            howToCashOut: this.page.getByText(/how-to-cash-out/i).first(),
        }
    }

    async verifyHowToPageOptions() {
        await this.howToPageLocatorRegistry.howToBet.waitFor({ state: 'visible', timeout: 10000 });
        await highlightElements(this.howToPageLocatorRegistry.howToBet);
        await this.howToPageLocatorRegistry.howToResetPassword.waitFor({ state: 'visible', timeout: 10000 });
        await highlightElements(this.howToPageLocatorRegistry.howToResetPassword);
        await this.howToPageLocatorRegistry.howToDeposit.waitFor({ state: 'visible', timeout: 10000 });
        await highlightElements(this.howToPageLocatorRegistry.howToDeposit);
        await this.howToPageLocatorRegistry.howToRegister.waitFor({ state: 'visible', timeout: 10000 });
        await highlightElements(this.howToPageLocatorRegistry.howToRegister);
        await this.howToPageLocatorRegistry.howToWithdraw.waitFor({ state: 'visible', timeout: 10000 });
        await highlightElements(this.howToPageLocatorRegistry.howToWithdraw);
        await this.howToPageLocatorRegistry.howToBetgames.waitFor({ state: 'visible', timeout: 10000 });
        await highlightElements(this.howToPageLocatorRegistry.howToBetgames);
        await this.howToPageLocatorRegistry.howToCasino.waitFor({ state: 'visible', timeout: 10000 });
        await highlightElements(this.howToPageLocatorRegistry.howToCasino);
        await this.howToPageLocatorRegistry.howToFica.waitFor({ state: 'visible', timeout: 10000 });
        await highlightElements(this.howToPageLocatorRegistry.howToFica);
        await this.howToPageLocatorRegistry.howToSMS.waitFor({ state: 'visible', timeout: 10000 });
        await highlightElements(this.howToPageLocatorRegistry.howToSMS);
    }

    async verifyHowToSMS(){
        await this.howToPageLocatorRegistry.howToSMS.waitFor({ state: 'visible', timeout: 10000 });
        await highlightElements(this.howToPageLocatorRegistry.howToSMS)
    }
    async verifyHowToFica(){
        await this.howToPageLocatorRegistry.howToFica.waitFor({ state: 'visible', timeout: 10000 });
        await highlightElements(this.howToPageLocatorRegistry.howToFica)
    }
    async verifyHowToCasino(){
        await this.howToPageLocatorRegistry.howToCasino.waitFor({ state: 'visible', timeout: 10000 });
        await highlightElements(this.howToPageLocatorRegistry.howToCasino)
    }
    async verifyHowToBetgames(){
        await this.howToPageLocatorRegistry.howToBetgames.waitFor({ state: 'visible', timeout: 10000 });
        await highlightElements(this.howToPageLocatorRegistry.howToBetgames)
    }
    async verifyHowToWithdraw(){
        await this.howToPageLocatorRegistry.howToWithdraw.waitFor({ state: 'visible', timeout: 10000 });
        await highlightElements(this.howToPageLocatorRegistry.howToWithdraw)
    }
    async verifyHowToRegister(){
        await this.howToPageLocatorRegistry.howToRegister.waitFor({ state: 'visible', timeout: 10000 });
        await highlightElements(this.howToPageLocatorRegistry.howToRegister)
    }
    async verifyHowToDeposit(){
        await this.howToPageLocatorRegistry.howToDeposit.waitFor({ state: 'visible', timeout: 10000 });
        await highlightElements(this.howToPageLocatorRegistry.howToDeposit)
    }
    async verifyHowToResetPassword(){
        await this.howToPageLocatorRegistry.howToResetPassword.waitFor({ state: 'visible', timeout: 10000 });
        await highlightElements(this.howToPageLocatorRegistry.howToResetPassword)
    }
    async verifyHowToBet(){
        await this.howToPageLocatorRegistry.howToBet.waitFor({ state: 'visible', timeout: 10000 });
        await highlightElements(this.howToPageLocatorRegistry.howToBet)
    }
    async verifyHowToJackpot(){
        await this.howToPageLocatorRegistry.howToJackpot.waitFor({ state: 'visible', timeout: 10000 });
        await highlightElements(this.howToPageLocatorRegistry.howToJackpot)
    }

    async clickHowToSMS() {
        await this.howToPageLocatorRegistry.howToSMS.click();
        await expect(this.page).toHaveURL(/.*how-to-bet-sms*/, { timeout: 15000 });
        await this.verifyHowToSMS();
    }

    async clickHowToJackpot() {
        await this.verifyHowToJackpot();
        await this.howToPageLocatorRegistry.howToJackpot.click();
        await expect(this.page).toHaveURL(/.*how-to-jackpot.*/i, { timeout: 15000 });
        await this.verifyHowToJackpot();
    }

    async verifyHowToCashOut() {
        await this.howToPageLocatorRegistry.howToCashOut.waitFor({ state: 'visible', timeout: 10000 });
        await highlightElements(this.howToPageLocatorRegistry.howToCashOut);
    }

    async clickHowToCashOut() {
        await this.howToPageLocatorRegistry.howToCashOut.click();
        await expect(this.page).toHaveURL(/.*cash.out.*/i, { timeout: 15000 });
        await this.verifyHowToCashOut();
    }
    async clickHowToBetOption() {
        await this.howToPageLocatorRegistry.howToBet.click();
        await expect(this.page).toHaveURL(/.*how-to-bet*/, { timeout: 15000 });
        await this.verifyHowToBet();
    }
    async clickHowToResetPassword() {
        await this.howToPageLocatorRegistry.howToResetPassword.click();
        await expect(this.page).toHaveURL(/.*how-to-reset.*password.*/i, { timeout: 15000 });
        await this.verifyHowToResetPassword();
    }
    async clickHowToDeposit() {
        await this.howToPageLocatorRegistry.howToDeposit.click();
        await expect(this.page).toHaveURL(/.*how-to-deposit*/, { timeout: 15000 });
        await this.verifyHowToDeposit();
    }
    async clickHowToRegister() {
        await this.howToPageLocatorRegistry.howToRegister.click();
        await expect(this.page).toHaveURL(/.*how-to-register*/, { timeout: 15000 });
        await this.verifyHowToRegister();
    }
    async clickHowToWithdraw() {
        await this.howToPageLocatorRegistry.howToWithdraw.click();
        await expect(this.page).toHaveURL(/.*how-to-withdraw*/, { timeout: 15000 });
        await this.verifyHowToWithdraw();
    }
    async clickHowToBetgames() {
        await this.howToPageLocatorRegistry.howToBetgames.click();
        await expect(this.page).toHaveURL(/.*how-to-betgames*/, { timeout: 15000 });
        await this.verifyHowToBetgames();
    }
    async clickHowToCasino() {
        await this.howToPageLocatorRegistry.howToCasino.click();
        await expect(this.page).toHaveURL(/.*how-to-casino*/, { timeout: 15000 });
        await this.verifyHowToCasino();
    }
    async clickHowToFica() {
        await this.howToPageLocatorRegistry.howToFica.click();
        await expect(this.page).toHaveURL(/.*how-to-fica*/, { timeout: 15000 });
        await this.verifyHowToFica();
    }

    async gotoHowTo() {
        await this.goto('/how-to-bet');
    }


}