import { LoginPage } from "./LoginPage";
import { casinoPageLocators } from '../locators/casinoPageLocators';
import userData from '../json-data/userData.json'; // Adjust the path as needed
import { loadLocatorsFromExcel } from "../tests/modules/footer/excelReader";
import { getLocator } from "../tests/modules/footer/locatorResolver";
import { highlightElements } from "../../Common-Flows/HighlightElements";
// import { loadLocatorsFromExcel } from "../../../global/utils/file-utils/excelReader";
// import { getLocator } from "../../../global/utils/file-utils/locatorResolver";
const file = "src/global/utils/file-utils/locators.xlsx";

export class CasinoPage extends LoginPage {
    casinoPagelocatorsRegistry: Record<string, import('@playwright/test').Locator>;
    // searchBox: ReturnType<import('@playwright/test').Page['getByRole']>;
    // playButton: ReturnType<import('@playwright/test').Page['getByRole']>;
    // aviatorLink: ReturnType<import('@playwright/test').Page['getByRole']>;
    // casinoGames: ReturnType<import('@playwright/test').Page['getByRole']>;
    // homePage: ReturnType<import('@playwright/test').Page['getByRole']>;
    // favouriteGames: import('@playwright/test').Locator;


    constructor(page: import('@playwright/test').Page) {
        super(page);
        this.page = page;
        const configs = loadLocatorsFromExcel(file, "CasinoPage");
        this.casinoPagelocatorsRegistry = {
            ...this.LoginPagelocatorsRegistry,
            searchBox : getLocator(page, configs["searchBox"]),
            playButton : getLocator(page, configs["playButton"]),
            aviatorLink : getLocator(page, configs["aviatorLink"]),
            // casinoGames : getLocator(page, configs["casinoGames"]),
            // homePage : getLocator(page, configs["homePage"]),
            favouriteGames : getLocator(page, configs["favouriteGames"]),
        }
        // this.searchBox = page.getByRole('textbox', casinoPageLocators.searchBox.options).nth(casinoPageLocators.searchBox.nth);
        // this.playButton = page.getByRole('button', casinoPageLocators.playButton.options).nth(casinoPageLocators.playButton.nth);
        // this.aviatorLink = page.getByRole('link', casinoPageLocators.aviatorLink.options).nth(casinoPageLocators.aviatorLink.nth);
        // this.casinoGames = page.getByRole('link').filter({ hasText: 'the-chicken-game' }).first();
        // this.homePage = page.getByRole('link').filter({ hasText: 'Home' }).first();
        // this.favouriteGames = page.getByRole('button', casinoPageLocators.favouriteGames.options).nth(casinoPageLocators.favouriteGames.nth)
    }

    async gotoCasino() {
        await this.goto();
        await this.casinoPagelocatorsRegistry.CasinoButton.click();
        await this.page.waitForLoadState('domcontentloaded');
    }

    async searchgame(gameName: string) {
        await this.casinoPagelocatorsRegistry.searchBox.fill(gameName);
        await this.page.keyboard.press('Enter');
        await this.page.waitForTimeout(2000); // Wait for search results to load
    }

    async playGame(gameName: string) {
        await this.page.getByText(gameName).first().hover();
        await this.page.getByText('Play').first().click();
        await this.page.waitForLoadState('domcontentloaded');
    }

    async FavouriteGame() {
        await this.casinoPagelocatorsRegistry.favouriteGames.first().click();
        await this.casinoPagelocatorsRegistry.formMobileInput.waitFor({state:'visible', timeout: 15000});
        await highlightElements(this.casinoPagelocatorsRegistry.formMobileInput.locator('..').locator('..').locator('..').locator('..'));
    }



}