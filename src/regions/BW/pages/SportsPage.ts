import { OddsSelection } from '../../Common-Flows/OddSelection';
import { loginLocators } from '../locators/loginPageLocators';
import { sportsPageLocators } from '../locators/sportsPageLocators';

const userData = require('../json-data/userData.json');
import { LoginPage } from './LoginPage';
import { loadLocatorsFromExcel } from "../../../global/utils/file-utils/excelReader";
import { getLocator } from "../../../global/utils/file-utils/locatorResolver";
import { highlightElements } from '../../Common-Flows/HighlightElements';
const file = "src/global/utils/file-utils/locators.xlsx";

const LOCATOR_URL="https://github.com/athrvzoz/LocatorFile/raw/refs/heads/main/locators.xlsx"


export class SportsPage extends LoginPage {
    SportsPagelocatorRegistry: Record<string, import('@playwright/test').Locator>;
    page: import('@playwright/test').Page;
    
    constructor(page: import('@playwright/test').Page) {
        super(page);
        this.page = page;
        const configs = loadLocatorsFromExcel(LOCATOR_URL, "SportsPage");
        this.SportsPagelocatorRegistry = {
            ...this.LoginPagelocatorsRegistry,
            SportButton: getLocator(this.page, configs["SportButton"]),
            aviator: getLocator(this.page, configs["aviator"]),
            live: getLocator(this.page, configs["live"]),
            esports: getLocator(this.page, configs["esports"]),
            soccerTote: getLocator(this.page, configs["soccerTote"]),
            betwayJackpots: getLocator(this.page, configs["betwayJackpots"]),
            betgames: getLocator(this.page, configs["betgames"]),
            LuckyNumbers: getLocator(this.page, configs["LuckyNumbers"]),
            HorseRacing: getLocator(this.page, configs["HorseRacing"]),
            Jetx: getLocator(this.page, configs["Jetx"]),
            ChickenGame: getLocator(this.page, configs["ChickenGame"]),
            OldSite: getLocator(this.page, configs["OldSite"]),
            Home: getLocator(this.page, configs["Home"]),
            CasinoGames: getLocator(this.page, configs["CasinoGames"]),
            Virtuals: getLocator(this.page, configs["Virtuals"]),
            promotionPage: getLocator(this.page, configs["promotionPage"]),
            betslip: getLocator(this.page, configs["betslip"]),
            betslipButton: getLocator(this.page, configs["betslipButton"]),
            loginButtonFromBetslip: getLocator(this.page, configs["loginButtonFromBetslip"]),
            betNow: getLocator(this.page, configs["betNow"]),
            shareButton: getLocator(this.page, configs["shareButton"]),
            betConfirmation: getLocator(this.page, configs["betConfirmation"]),
            bookingCodeMessage: getLocator(this.page, configs["bookingCodeMessage"]),
            enterBookingCodeTextbox: getLocator(this.page, configs["enterBookingCode"]),
            modalCloseButton: getLocator(this.page, configs["modalCloseButton"]),
        };
    }

    // Clicking Functions :

    async gotoSportsPage() {
        await this.page.goto('/sport/soccer');
    }

    async gotoAviator() {
        await this.page.getByRole('link', { name: 'Aviator' }).first().click();
    }

    async AviatorLoginPopUp() {
        await this.SportsPagelocatorRegistry.formMobileInput.fill(`${userData.user1.mobile}`);
        await this.SportsPagelocatorRegistry.formPasswordInput.fill(`${userData.user1.password}`);
        await this.page.keyboard.press('Enter');
        await this.page.waitForTimeout(2000); // Wait for login to complete
    }

    async AviatorLoginPopUpArgs(mobile: string, password: string) {
        await this.SportsPagelocatorRegistry.formMobileInput.fill(`${mobile}`);
        await this.SportsPagelocatorRegistry.formPasswordInput.fill(`${password}`);
        await this.page.keyboard.press('Enter');
        await this.page.waitForTimeout(2000); // Wait for login to complete
        await this.SportsPagelocatorRegistry.eyeButton.click();
        await highlightElements(this.SportsPagelocatorRegistry.formMobileInput);
        await highlightElements(this.SportsPagelocatorRegistry.formPasswordInput);
    }

    async LogOut() {
        await this.SportsPagelocatorRegistry.hamburgerMenu.click();
        await this.page.getByText('All Balances').waitFor({ state: 'visible' });
        await this.page.getByText('Log out').click();
        await this.page.getByRole('button', { name: 'Proceed' }).click();
        await this.SportsPagelocatorRegistry.loginButton.waitFor({ state: 'visible' });
    }

    async PlaceBets(legsCount: number) {
        await OddsSelection(legsCount, this.page);
        await this.SportsPagelocatorRegistry.betNow.click();
        const bookingCode = await this.SportsPagelocatorRegistry.bookingCodeMessage.innerText();
        console.log(bookingCode);
        await this.SportsPagelocatorRegistry.modalCloseButton.click();
        return bookingCode;
    }

    
}