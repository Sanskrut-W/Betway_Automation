import { Page, Locator, expect, FrameLocator } from '@playwright/test';
import { loadLocatorsFromExcel } from "../../../global/utils/file-utils/excelReader";
import { getLocator } from "../../../global/utils/file-utils/locatorResolver";
import { highlightElements } from '../../Common-Flows/HighlightElements';
import { ScreenshotHelper } from '../../Common-Flows/ScreenshotHelper';
import path from 'path';
import { HeaderPage } from './HeaderPage';

const userData = require('../json-data/userData.json');
// Using path.resolve to ensure the Excel file is found regardless of execution context
const Locator_Url = "src/global/utils/file-utils/locators(2).xlsx";
export class GamingLobbyPage extends HeaderPage {
    readonly locatorsRegistry: Record<string, Locator>;
    readonly page: Page;

    constructor(page: Page) {
        super(page);
        this.page = page;
        const configs = loadLocatorsFromExcel(Locator_Url, "GamingLobbyPage");

        this.locatorsRegistry = {
            mobileNumber: getLocator(this.page, configs['mobileNumber']),
            password: getLocator(this.page, configs['password']),
            loginButton: getLocator(this.page, configs['loginButton']),
            Aviator: getLocator(this.page, configs['Aviator']),
            loginInPopup: getLocator(this.page, configs['loginInPopup']),
            passwordInPopup: getLocator(this.page, configs['passwordInPopup']),
            submitInPopup: getLocator(this.page, configs['submitInPopup']),
            myBetTabSelector: getLocator(this.page, configs['myBetTabSelector']),
            frameSelector: getLocator(this.page, configs['frameSelector']),
            betNowButtonSelector: getLocator(this.page, configs['betNowButtonSelector']),
            casinoGames: getLocator(this.page, configs['casinoGames']),
            promotionsInCasino: getLocator(this.page, configs['promotionsInCasino']),
            casinoSearch: getLocator(this.page, configs['casinoSearch']),
            mostLikedFilter: getLocator(this.page, configs['mostLikedFilter']),
            gameDiv: getLocator(this.page, configs['gameDiv']),
            playButton: getLocator(this.page, configs['playButton']),
            favouriteButton: getLocator(this.page, configs['favouriteButton']),
            betGames: getLocator(this.page, configs['betGames']),
            promotionsInBetGames: getLocator(this.page, configs['promotionsInBetGames']),
            gameDivBetGames: getLocator(this.page, configs['gameDivBetGames']),
            betGamesFilter: getLocator(this.page, configs['betGamesFilter']),
            virtuals: getLocator(this.page, configs['virtuals']),
            promotionsInVirtuals: getLocator(this.page, configs['promotionsInVirtuals']),
            trendingFilter: getLocator(this.page, configs['trendingFilter']),
            gameDivVirtuals: getLocator(this.page, configs['gameDivVirtuals']),
            closePopup: getLocator(this.page, configs['closePopup']),
            logOut: getLocator(this.page, configs['logOut']),
        };
    }

    // goto() and Login() are inherited from BasePage (via HeaderPage)

    async navigateToVertical(verticalKey: string) {
        await this.locatorsRegistry[verticalKey].click();
    }

    async searchGame(term: string) {
        await this.locatorsRegistry.casinoSearch.click();
        await this.locatorsRegistry.casinoSearch.fill(term);
    }

    async selectFilter(filterKey: string) {
        await this.locatorsRegistry[filterKey].click();
    }

    async launchGame(gameDivKey: string) {
        await this.locatorsRegistry[gameDivKey].first().hover();
        await this.locatorsRegistry.playButton.first().waitFor({ state: 'visible' });
        await this.locatorsRegistry.playButton.first().click({ force: true });
    }

    async toggleFavourite() {
        await this.locatorsRegistry.favouriteButton.first().click();
    }

    async clickVisiblePromotion(promoKey: string) {
        const promo = this.locatorsRegistry[promoKey].filter({ visible: true });
        await promo.waitFor({ state: 'visible', timeout: 30000 });
        await promo.click({ force: true });
        await this.page.waitForTimeout(3000);
    }

    async triggerLoginPopupViaAction(actionType: 'play' | 'favourite', gameDivKey?: string) {
        if (actionType === 'play' && gameDivKey) {
            await this.locatorsRegistry[gameDivKey].first().hover();
            await this.locatorsRegistry.playButton.first().click();
        } else {
            await this.locatorsRegistry.favouriteButton.first().click();
        }
    }

    // --- Core Flows ---

    async LogOut() {
        // Only attempt logout if Deposit is visible (logged in state)
        if (await this.page.getByRole('button', { name: 'Deposit' }).isVisible()) {
            await this.HeaderPageLocatorsRegistry.hamburgerMenu.click();
            await this.locatorsRegistry.logOut.click();
            await this.page.getByRole('button', { name: 'Proceed' }).click();
        }
    }

    async loginToAviator() {
        await this.locatorsRegistry.loginInPopup.fill(`${userData.user4.mobile}`);
        await this.locatorsRegistry.passwordInPopup.fill(`${userData.user4.password}`);
        await this.locatorsRegistry.submitInPopup.click();
    }

    async waitForAviatorVisibility() {
        await this.locatorsRegistry.Aviator.waitFor({ state: 'visible' });
    }

    async clickAviatorAndWaitForLoginPopup() {
        await this.locatorsRegistry.Aviator.click();
        await this.page.waitForTimeout(1000);
    }

    async completeAviatorLoginAndInteractionFlow() {
        await this.loginToAviator();
        await this.locatorsRegistry.closePopup.waitFor({ state: 'visible', timeout: 30000 });
        await this.locatorsRegistry.closePopup.click();
        await this.locatorsRegistry.Aviator.click();
        await this.locatorsRegistry.closePopup.waitFor({ state: 'visible', timeout: 30000 });
        await this.locatorsRegistry.closePopup.click();
        await this.interactWithGameFrame();
    }

    async interactWithGameFrame() {
        await this.locatorsRegistry.Aviator.click();
        const frameSelector = 'iframe[id*="lobby_game"]';
        const gameFrame = this.page.frameLocator(frameSelector);
        await gameFrame.locator('//*[@class="btn btn-success bet ng-star-inserted"]').first().waitFor({ state: 'visible' });
        await gameFrame.locator('//*[@class="btn btn-success bet ng-star-inserted"]').first().click();
        await this.page.waitForTimeout(5000);
        await gameFrame.locator('//*[@class="tab ng-star-inserted"]').first().click();
    }

    // --- Screenshot Helpers ---

    async captureScreenshot(locatorName: string, screenshotDir: string, fileName: string, testInfo: any) {
        const locator = this.locatorsRegistry[locatorName];
        await highlightElements(locator);
        await ScreenshotHelper(this.page, screenshotDir, fileName, testInfo);
    }

    async takeScreenshot(screenshotDir: string, fileName: string, testInfo: any) {
        await ScreenshotHelper(this.page, screenshotDir, fileName, testInfo);
    }
}