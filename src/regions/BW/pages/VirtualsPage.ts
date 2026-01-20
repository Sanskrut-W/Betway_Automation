import { LoginPage } from "./LoginPage";
import { casinoPageLocators } from '../locators/casinoPageLocators';
import { SportsPage } from "./SportsPage";
import { virtualPageLocators } from "../locators/virtualPageLocators";
import { loadLocatorsFromExcel } from "../tests/modules/footer/excelReader";
import { getLocator } from "../tests/modules/footer/locatorResolver";
import { highlightElements } from "../../Common-Flows/HighlightElements";
const file = "src/global/utils/file-utils/locators.xlsx";


export class VirtualsPage extends SportsPage {
    virtualsPagelocatorsRegistry: Record<string, import('@playwright/test').Locator>;

    constructor(page: import('@playwright/test').Page) {
        super(page);
        this.page = page;
        const configs = loadLocatorsFromExcel(file, "VirtualPage");

        this.virtualsPagelocatorsRegistry = {
            ...this.SportsPagelocatorRegistry,
            searchBox: getLocator(page, configs["searchBox"]),
            playButton: getLocator(page, configs["playButton"]),
            favouriteGames: getLocator(page, configs["favouriteGames"]),
            // casinoGames: page.getByRole('link').filter({ hasText: 'the-chicken-game' }).first(),
            // homePage: page.getByRole('link').filter({ hasText: 'Home' }).first(),
            // searchBox : page.getByRole('textbox', virtualPageLocators.searchBox.options).nth(virtualPageLocators.searchBox.nth),
            // playButton : page.getByRole('button', virtualPageLocators.playButton.options).nth(virtualPageLocators.playButton.nth),
            // favouriteGames : page.getByRole('button', virtualPageLocators.favouriteGames.options).nth(virtualPageLocators.favouriteGames.nth)
        }
    }

    async gotoVirtuals() {
        await this.page.goto('/lobby/virtuals');
    }

    async searchgame(gameName: string) {
        await this.virtualsPagelocatorsRegistry.searchBox.fill(gameName);
        await this.page.keyboard.press('Enter');
        await this.page.waitForTimeout(2000);
    }

    async playGame(gameName: string) {
        await this.page.getByText(gameName).hover();
        await this.page.getByText('Play').first().click();
        await this.virtualsPagelocatorsRegistry.formMobileInput.waitFor({ state: 'visible', timeout: 15000 });
    }

    async FavouriteGame() {
        await this.virtualsPagelocatorsRegistry.favouriteGames.first().click();
        await this.virtualsPagelocatorsRegistry.formMobileInput.waitFor({ state: 'visible', timeout: 15000 });
        await highlightElements(this.virtualsPagelocatorsRegistry.formMobileInput.locator('..').locator('..').locator('..').locator('..'));
    }

}