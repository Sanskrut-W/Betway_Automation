import { Page, Locator, expect } from '@playwright/test';
import { highlightElements } from '../../../regions/Common-Flows/HighlightElements'; 
import { loadLocatorsFromExcel } from "../../../global/utils/file-utils/excelReader"; 
import { getLocator } from "../../../global/utils/file-utils/locatorResolver"; 

const LOCATOR_URL = "src/global/utils/file-utils/locators(2).xlsx";
const userData = require('../json-data/userData.json');

export class BuildABetPage {
    readonly page: Page;
    readonly buildABetLocatorsRegistry: Record<string, Locator>;

    constructor(page: Page) {
        this.page = page;
        const configs = loadLocatorsFromExcel(LOCATOR_URL, "BuildABetPage"); 
        this.buildABetLocatorsRegistry = {
            mobileInput: getLocator(this.page, configs["mobileInput"]),
            passwordInput: getLocator(this.page, configs["passwordInput"]),
            upcomingTab: getLocator(this.page, configs["upcomingTab"]),
            closePromotionPopup: getLocator(this.page, configs["closePromotionPopup"]),
            firstMatchContainer: getLocator(this.page, configs["firstMatchContainer"]),
            buildABetTab: getLocator(this.page, configs["buildABetTab"]),
            randomMarketButton: getLocator(this.page, configs["randomMarketButton"]),
            infoMessage1x2: getLocator(this.page, configs["infoMessage1x2"]),
            infoMessageDoubleChance: getLocator(this.page, configs["infoMessageDoubleChance"]),
            infoMessageBothTeamsScore: getLocator(this.page, configs["infoMessageBothTeamsScore"]),
            infoMessageTotalGoals: getLocator(this.page, configs["infoMessageTotalGoals"]),
            favoriteButton: getLocator(this.page, configs["favoriteButton"]),
            infoButton: getLocator(this.page, configs["infoButton"]),
            marketExpandIcon: getLocator(this.page, configs["marketExpandIcon"]),
            oddOver0_5: getLocator(this.page, configs["oddDraw"]).getByText('Over (0.5)'),
            oddUnder0_5: getLocator(this.page, configs["oddDraw"]).getByText('Under (0.5)'),
            oddOver1_5: getLocator(this.page, configs["oddDraw"]).getByText('Over (1.5)'),
            oddDraw: getLocator(this.page, configs["oddDraw"]),
            totalOddsBar: getLocator(this.page, configs["totalOddsBar"]),
            addToBetslipButton: getLocator(this.page, configs["addToBetslipButton"]),
            clearAllButton: getLocator(this.page, configs["clearAllButton"]),
            selectedOddsScroller: getLocator(this.page, configs["selectedOddsScroller"]),
            removeOddIcon: getLocator(this.page, configs["removeOddIcon"]),
            invalidCombinationMessage: getLocator(this.page, configs["invalidCombinationMessage"]),
        };
    }

    // 1. Navigation & Setup Methods
    async goto() {
         await this.page.goto('https://new.betway.co.za/sport/soccer', { waitUntil: 'domcontentloaded' });
        // await this.page.waitForLoadState('domcontentloaded');
    }

    async login() {
        await this.buildABetLocatorsRegistry.mobileInput.fill(`${userData.user4.mobile}`);
        await this.buildABetLocatorsRegistry.passwordInput.fill(`${userData.user4.password}`);
        await this.page.keyboard.press('Enter');
        // await this.buildABetLocatorsRegistry.closePromotionPopup.waitFor({ state: 'visible',  timeout: 30000});
        // await this.buildABetLocatorsRegistry.closePromotionPopup.click();
        await this.page.waitForLoadState('domcontentloaded');
    }

    /**
     * This is the main setup method. It handles all navigation
     * from the sports page to the Build A Bet tab for a match.
     */
    async navigateToBuildABet() {
        await this.buildABetLocatorsRegistry.upcomingTab.click();

        // This logic finds the first match container to click
        const firstMatch = this.buildABetLocatorsRegistry.firstMatchContainer.first();
        await firstMatch.waitFor({ state: 'visible', timeout: 10000 });
        await firstMatch.click();

        // Now that we are on the match page, click the "Build A Bet" tab
        await this.buildABetLocatorsRegistry.buildABetTab.click();
        await this.page.waitForLoadState('domcontentloaded');
    }

    // 2. Action Methods
    async clickRandomMarketButton() {
        await this.buildABetLocatorsRegistry.randomMarketButton.click();
        await this.page.waitForTimeout(7000); // Wait for action
    }

    async clickFavorite() {
        await this.buildABetLocatorsRegistry.favoriteButton.click();
    }

    async clickInfo() {
        await this.buildABetLocatorsRegistry.infoButton.click();
    }

    async expandMarket() {
        await this.buildABetLocatorsRegistry.marketExpandIcon.click();
    }

    async clickOdd(oddName: 'Over (0.5)' | 'Under (0.5)' | 'Over (1.5)' | 'Draw') {
        switch (oddName) {
            case 'Over (0.5)':
                await this.buildABetLocatorsRegistry.oddOver0_5.click();
                break;
            case 'Under (0.5)':
                await this.buildABetLocatorsRegistry.oddUnder0_5.click();
                break;
            case 'Over (1.5)':
                await this.buildABetLocatorsRegistry.oddOver1_5.click();
                break;
            case 'Draw':
                // This assumes the "Draw" locator is inside the #more-market-container
                await this.buildABetLocatorsRegistry.oddDraw.getByText('Draw', { exact: true }).first().click();
                break;
        }
    }

    async clickTotalOddsBar() {
        await this.buildABetLocatorsRegistry.totalOddsBar.click();
    }

    async clickAddToBetslip() {
        await this.buildABetLocatorsRegistry.addToBetslipButton.click();
    }

    async clickClearAll() {
        await this.buildABetLocatorsRegistry.clearAllButton.click();
    }

    async clickRemoveOddIcon() {
        await this.buildABetLocatorsRegistry.removeOddIcon.click();
    }

    // 3. Highlight & Accessor (Get) Methods
    async highlightBuildABetTab() {
        await highlightElements(this.buildABetLocatorsRegistry.buildABetTab);
    }

    async highlightInfoMessages() {
        await highlightElements(this.buildABetLocatorsRegistry.infoMessage1x2);
        await highlightElements(this.buildABetLocatorsRegistry.infoMessageDoubleChance);
        // await highlightElements(this.buildABetLocatorsRegistry.infoMessageBothTeamsScore);
        await highlightElements(this.buildABetLocatorsRegistry.infoMessageTotalGoals);
    }

    async highlightFavorite(index = 0) {
        await highlightElements(this.buildABetLocatorsRegistry.favoriteButton.nth(index));
    }

    async highlightInfo(index = 0) {
        await highlightElements(this.buildABetLocatorsRegistry.infoButton.nth(index));
    }

    async highlightMarket(index = 0) {
        await highlightElements(this.buildABetLocatorsRegistry.marketExpandIcon.nth(index));
    }

    async highlightTotalOddsBar() {
        await highlightElements(this.buildABetLocatorsRegistry.totalOddsBar);
    }

    async highlightAddAndClearButtons() {
        await highlightElements(this.buildABetLocatorsRegistry.addToBetslipButton);
        await highlightElements(this.buildABetLocatorsRegistry.clearAllButton);
    }

    async highlightSelectedOddsScroller() {
        await highlightElements(this.buildABetLocatorsRegistry.selectedOddsScroller);
    }

    async highlightRemoveOddIcon() {
        await highlightElements(this.buildABetLocatorsRegistry.removeOddIcon);
    }

    async highlightInvalidCombinationMessage() {
        await highlightElements(this.buildABetLocatorsRegistry.invalidCombinationMessage);
    }

    getInvalidCombinationMessage(): Locator {
        return this.buildABetLocatorsRegistry.invalidCombinationMessage;
    }
}