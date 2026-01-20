import { LoginPage } from "./LoginPage";
import { casinoPageLocators } from '../locators/casinoPageLocators';
import { SportsPage } from "./SportsPage";
import { betgamesPageLocators } from "../locators/betgamesPageLocator";
import { loadLocatorsFromExcel } from "../tests/modules/footer/excelReader";
import { getLocator } from "../tests/modules/footer/locatorResolver";
const file = "src/global/utils/file-utils/locators.xlsx";


export class BetgamesPage extends SportsPage {
    page: import('@playwright/test').Page;
    BetGamesPagelocatorsRegistry: Record<string, import('@playwright/test').Locator>;

    constructor(page: import('@playwright/test').Page) {
        super(page);
        this.page = page;
        const configs = loadLocatorsFromExcel(file, "BetGamesPage");
        this.BetGamesPagelocatorsRegistry = {
            ...this.SportsPagelocatorRegistry,
            searchBox: getLocator(page, configs["searchBox"]),
            playButton: getLocator(page, configs["playButton"]),
            // casinoGames: getLocator(page, configs["casinoGames"]),
            // homePage: getLocator(page, configs["homePage"]),
            favouriteGames: getLocator(page, configs["favouriteGames"]),
        }
    }

    async gotoBetgames() {
        await this.page.goto('/lobby/betgames');
    }

    async searchgame(gameName: string) {
        await this.BetGamesPagelocatorsRegistry.searchBox.fill(gameName);
        await this.page.keyboard.press('Enter');
        await this.page.waitForTimeout(2000);
    }

    async playGame(gameName: string) {
        await this.page.getByText(gameName).first().hover();
        await this.page.getByText('Play').first().click();
        await this.BetGamesPagelocatorsRegistry.formMobileInput.waitFor({state:'visible', timeout: 15000});
    }

    async FavouriteGame() {
        await this.BetGamesPagelocatorsRegistry.favouriteGames.click();
        await this.page.waitForLoadState('domcontentloaded');
    }

}