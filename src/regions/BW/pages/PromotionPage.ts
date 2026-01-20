import { LoginPage } from "./LoginPage";
import { casinoPageLocators } from '../locators/casinoPageLocators';
import { SportsPage } from "./SportsPage";
import userData from '../json-data/userData.json'; // Adjust the path as needed
import { loadLocatorsFromExcel } from "../../../global/utils/file-utils/excelReader";
import { getLocator } from "../../../global/utils/file-utils/locatorResolver";

export class PromotionPage extends SportsPage {
    promotionPagelocatorsRegistry: Record<string, import('@playwright/test').Locator>;

    constructor(page: import('@playwright/test').Page) {
        super(page);
        this.page = page;
        const configs = loadLocatorsFromExcel("src/global/utils/file-utils/locators.xlsx", "PromotionPage");
        this.promotionPagelocatorsRegistry = {
            ...this.SportsPagelocatorRegistry,
            promotionPage: getLocator(this.page, configs["promotionPage"]),
            mobileInput: getLocator(this.page, configs["mobileInput"]),
            passwordInput: getLocator(this.page, configs["passwordInput"]),
        };
    }
    async gotoPromotionPages() {
        await this.goto();
        await this.promotionPagelocatorsRegistry.SportButton.click();
        await this.promotionPagelocatorsRegistry.promotionPage.click();
        await this.page.waitForLoadState('domcontentloaded');
    }
    async LoginFromPromotions(mobile: string, password: string) {
        await this.promotionPagelocatorsRegistry.mobileInput.fill(`${mobile}`);
        await this.promotionPagelocatorsRegistry.passwordInput.fill(`${password}`);
        await this.page.keyboard.press('Enter');
        await this.page.waitForTimeout(3000); // Wait for login to complete
    }
}