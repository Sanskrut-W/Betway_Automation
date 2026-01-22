import { Page, Locator, expect } from '@playwright/test';
import { highlightElements } from '../../Common-Flows/HighlightElements';
import { loadLocatorsFromExcel } from "../../../global/utils/file-utils/excelReader"; 
import { getLocator } from "../../../global/utils/file-utils/locatorResolver"; 
 
// URL for your central locator file
const LOCATOR_URL = "src/global/utils/file-utils/locators(2).xlsx";
const userData = require('../json-data/userData.json');
 
export class MyBetsPage {
    readonly page: Page;
    readonly myBetsLocatorsRegistry: Record<string, Locator>;
 
    constructor(page: Page) {
        this.page = page;
  
        const configs = loadLocatorsFromExcel(LOCATOR_URL, "MyBetPage"); 
        this.myBetsLocatorsRegistry = {
            closePromotionPopup: getLocator(this.page, configs["closePromotionPopup"]),
            mobileInput: getLocator(this.page, configs["mobileInput"]),
            passwordInput: getLocator(this.page, configs["passwordInput"]),
            myBetsButton: getLocator(this.page, configs["myBetsButton"]),
            openBetsTab: getLocator(this.page, configs["openBetsTab"]),
            settledBetsTab: getLocator(this.page, configs["settledBetsTab"]),
            categoryDropdown: getLocator(this.page, configs["categoryDropdown"]),
            betgamesOption: getLocator(this.page, configs["betgamesOption"]).getByText('Betgames'),
            luckyNumbersOption: getLocator(this.page, configs["luckyNumbersOption"]).getByText('Lucky Numbers'),
            jackpotsOption: getLocator(this.page, configs["jackpotsOption"]).getByText('Betway Jackpots'),
            toteOption: getLocator(this.page, configs["toteOption"]),
            filterDropdown: getLocator(this.page, configs["filterDropdown"]),
            cashoutOption: getLocator(this.page, configs["cashoutOption"]),
            winOption: getLocator(this.page, configs["winOption"]),
            lossOption: getLocator(this.page, configs["lossOption"]).getByText('Loss'),
            searchBox: getLocator(this.page, configs["searchBox"]),
            detailViewButton: getLocator(this.page, configs["detailViewButton"]),
            detailViewContainer: getLocator(this.page, configs["detailViewContainer"]),
            shareButton: getLocator(this.page, configs["shareButton"]),
            placeBetButton: getLocator(this.page, configs["placeBetButton"]),
            editBetButton: getLocator(this.page, configs["editBetButton"]),
            editBetCheckbox: getLocator(this.page, configs["editBetCheckbox"]),
            editContinueButton: getLocator(this.page, configs["editContinueButton"]),
            editCancelButton: getLocator(this.page, configs["editCancelButton"]),
            cashoutButton: getLocator(this.page, configs["cashoutButton"]),
            cashoutConfirmButton: getLocator(this.page, configs["cashoutConfirmButton"]),
            cashoutSuccessMessage: getLocator(this.page, configs["cashoutSuccessMessage"]),
            hideLossesToggle: getLocator(this.page, configs["hideLossesToggle"]),
            paginationNext: getLocator(this.page, configs["paginationNext"]),
        };
    }
   
    // ------------------------------------------------------------------
    // 1. Navigation & Login
    // ------------------------------------------------------------------
 
    async gotoSports() {
        await this.page.goto('https://new.betway.co.za/sport/soccer');
        await this.page.waitForLoadState('domcontentloaded');
    }
 
   async login() {
    await this.myBetsLocatorsRegistry.mobileInput.fill(`${userData.user4.mobile}`);
    await this.myBetsLocatorsRegistry.passwordInput.fill(`${userData.user4.password}`);
    await this.page.keyboard.press('Enter');
    // await this.myBetsLocatorsRegistry.closePromotionPopup.waitFor({ state: 'visible', timeout: 30000 });
    // await this.myBetsLocatorsRegistry.closePromotionPopup.click();
    // await this.closePromotionPopup();
    await this.page.waitForLoadState('domcontentloaded');
  }
 
    // ------------------------------------------------------------------
    // 2. Main Actions
    // ------------------------------------------------------------------
 
    async clickMyBets() {
        await this.myBetsLocatorsRegistry.myBetsButton.click();
    }
 
    async clickOpenBetsTab() {
        await this.myBetsLocatorsRegistry.openBetsTab.click();
    }
 
    async clickSettledBetsTab() {
        await this.myBetsLocatorsRegistry.settledBetsTab.click();
    }
 
    async selectCategory(categoryName: 'Betgames' | 'Lucky Numbers' | 'Jackpots' | 'Tote' | 'Sports') {
        let currentDropdown = this.myBetsLocatorsRegistry.categoryDropdown;
       
        switch (categoryName) {
            case 'Betgames':
                await currentDropdown.click();
                await this.myBetsLocatorsRegistry.betgamesOption.click();
                break;
            case 'Lucky Numbers':
                await this.myBetsLocatorsRegistry.betgamesOption.click(); // Click previous to open
                await this.myBetsLocatorsRegistry.luckyNumbersOption.click();
                break;
            case 'Jackpots':
                await this.myBetsLocatorsRegistry.luckyNumbersOption.click(); // Click previous to open
                await this.myBetsLocatorsRegistry.jackpotsOption.click();
                break;
            case 'Tote':
                await this.myBetsLocatorsRegistry.jackpotsOption.click(); // Click previous to open
                await this.myBetsLocatorsRegistry.toteOption.click();
                break;
            case 'Sports':
                await this.myBetsLocatorsRegistry.toteOption.click(); // Click previous to open
                await this.myBetsLocatorsRegistry.categoryDropdown.click(); // 'categoryDropdown' is 'Sports'
                break;
        }
        await this.page.waitForTimeout(1000);
    }
 
    async selectFilter(filterName: 'All' | 'Cashout' | 'Win' | 'Loss') {
        let currentDropdown = this.myBetsLocatorsRegistry.filterDropdown;
 
        switch (filterName) {
            case 'All':
                await currentDropdown.click();
                break;
            case 'Cashout':
                await currentDropdown.click();
                await this.myBetsLocatorsRegistry.cashoutOption.click();
                break;
            case 'Win':
                await this.myBetsLocatorsRegistry.cashoutOption.click(); // Click previous to open
                await this.myBetsLocatorsRegistry.winOption.click();
                break;
            case 'Loss':
                await this.myBetsLocatorsRegistry.winOption.click(); // Click previous to open
                await this.myBetsLocatorsRegistry.lossOption.click();
                break;
        }
        await this.page.waitForTimeout(1000);
    }
 
    async searchFor(term: string) {
        await this.myBetsLocatorsRegistry.searchBox.fill(term);
        await this.myBetsLocatorsRegistry.searchBox.press('Enter');
        await this.page.waitForTimeout(3000);
    }
 
    async clickDetailView(index = 0) {
        await this.myBetsLocatorsRegistry.detailViewButton.nth(index).click();
        await this.page.waitForTimeout(1000);
    }
 
    async clickShare(index = 0) {
        await this.myBetsLocatorsRegistry.shareButton.nth(index).click();
    }
 
    async placeBet() {
        await this.myBetsLocatorsRegistry.placeBetButton.click();
        await this.page.waitForTimeout(1000);
    }
 
    async performEditBetFlow(action: 'continue' | 'cancel', checkboxIndex = 0) {
        await this.clickDetailView(0);
        await this.myBetsLocatorsRegistry.editBetButton.click();
        await this.page.waitForTimeout(800);
       
        await this.myBetsLocatorsRegistry.editBetCheckbox.nth(checkboxIndex).click({ force: true });
        await this.page.waitForTimeout(500);
 
        if (action === 'continue') {
            await this.myBetsLocatorsRegistry.editContinueButton.click();
        } else {
            await this.myBetsLocatorsRegistry.editCancelButton.click();
        }
        await this.page.waitForTimeout(1000);
    }
 
    async attemptCashout(action: 'confirm' | 'cancel', index = 0) {
        await this.clickDetailView(index);
        await this.myBetsLocatorsRegistry.cashoutButton.nth(index).click();
        await this.page.waitForTimeout(800);
        await this.myBetsLocatorsRegistry.cashoutConfirmButton.click();
 
        if (action === 'confirm') {
            await this.myBetsLocatorsRegistry.cashoutConfirmButton.click();
        } else {
            // No "Cancel" button in this flow, clicking confirm to proceed
            // A real "Cancel" would be `this.page.getByRole('button', { name: 'Cancel' }).click();`
            await this.myBetsLocatorsRegistry.cashoutConfirmButton.click();
        }
        await this.page.waitForTimeout(800);
    }
 
    async toggleHideLosses() {
        await this.myBetsLocatorsRegistry.hideLossesToggle.click();
        await this.page.waitForTimeout(5000);
    }
 
    async clickNextPage() {
        await this.myBetsLocatorsRegistry.paginationNext.click();
    }
 
    // ------------------------------------------------------------------
    // 3. Highlight & Accessor (Get) Methods
    // ------------------------------------------------------------------
 
    async highlightOpenBetsTab() {
        await highlightElements(this.myBetsLocatorsRegistry.openBetsTab);
    }
   
    async highlightSettledBetsTab() {
        await highlightElements(this.myBetsLocatorsRegistry.settledBetsTab);
    }
 
    async highlightSearchBox() {
        await highlightElements(this.myBetsLocatorsRegistry.searchBox);
    }
 
    async highlightDetailViewContainer(index = 0) {
        await highlightElements(this.myBetsLocatorsRegistry.detailViewContainer.nth(index));
    }
 
    async highlightCashoutSuccess() {
        await highlightElements(this.myBetsLocatorsRegistry.cashoutSuccessMessage);
    }
   
    async highlightHideLossesToggle() {
        await highlightElements(this.myBetsLocatorsRegistry.hideLossesToggle);
    }
 
    getOpenBetsTab(): Locator {
        return this.myBetsLocatorsRegistry.openBetsTab;
    }
 
    getSettledBetsTab(): Locator {
        return this.myBetsLocatorsRegistry.settledBetsTab;
    }
 
    getCashoutSuccessMessage(): Locator {
        return this.myBetsLocatorsRegistry.cashoutSuccessMessage;
    }

    async closePromotionPopup(){
        await this.myBetsLocatorsRegistry.closePromotionPopup.click();
    }
 
 
    // ------------------------------------------------------------------
    // Mock Data Function (Delete this when your Excel is ready)
    // ------------------------------------------------------------------
    private getMockLocatorData(): Record<string, any> {
        // This simulates the data read from your Excel file.
        return {
            "mobileInput": { type: "role", value: "textbox", options: '{"name":"Mobile Number"}', nth: 0 },
            "passwordInput": { type: "role", value: "textbox", options: '{"name":"Enter Password"}', nth: 0 },
            "myBetsButton": { type: "text", value: "My Bets", options: '{}', nth: 0 },
            "openBetsTab": { type: "text", value: "Open Bets", options: '{}', nth: 0 },
            "settledBetsTab": { type: "text", value: "Settled Bets", options: '{}', nth: 0 },
            "categoryDropdown": { type: "text", value: "Sports", options: '{"exact":true}', nth: 0 },
            "betgamesOption": { type: "label", value: "Betgames", options: '{}', nth: 0 },
            "luckyNumbersOption": { type: "label", value: "Lucky Numbers", options: '{}', nth: 0 },
            "jackpotsOption": { type: "label", value: "Betway Jackpots", options: '{}', nth: 0 },
            "toteOption": { type: "text", value: "Tote", options: '{"exact":true}', nth: 0 },
            "filterDropdown": { type: "text", value: "All", options: '{"exact":true}', nth: 0 },
            "cashoutOption": { type: "text", value: "Cashout", options: '{}', nth: 0 },
            "winOption": { type: "text", value: "Win", options: '{"exact":true}', nth: 0 },
            "lossOption": { type: "label", value: "Loss", options: '{}', nth: 0 },
            "searchBox": { type: "role", value: "textbox", options: '{"name":"Search bets..."}', nth: 0 },
            "detailViewButton": { type: "text", value: "Detail View", options: '{}', nth: 0 },
            "detailViewContainer": { type: "locator", value: ".w-full.px-2.bg-light-100", options: '{}', nth: 0 },
            "shareButton": { type: "locator", value: ".cursor-pointer.w-5.h-5.rounded", options: '{}', nth: 0 },
            "placeBetButton": { type: "role", value: "button", options: '{"name":"Bet Now"}', nth: 0 },
            "editBetButton": { type: "text", value: "Edit", options: '{"exact":true}', nth: 0 },
            "editBetCheckbox": { type: "locator", value: "div.flex.justify-between.font-bold.text-right.text-dark-800.dark\\:text-light-50", options: '{}', nth: 0 },
            "editContinueButton": { type: "role", value: "button", options: '{"name":"Continue"}', nth: 0 },
            "editCancelButton": { type: "role", value: "button", options: '{"name":"Cancel"}', nth: 0 },
            "cashoutButton": { type: "text", value: "Cashout", options: '{}', nth: 0 },
            "cashoutConfirmButton": { type: "role", value: "button", options: '{"name":"Cashout"}', nth: 0 },
            "cashoutSuccessMessage": { type: "text", value: "You have successfully cashed", options: '{}', nth: 0 },
            "hideLossesToggle": { type: "locator", value: "#my-bets-container div", options: '{"hasText": "SportsAllHide Losses"}', nth: 0 }, // This is a guess, update it
            "paginationNext": { type: "locator", value: "#transaction-history-next", options: '{}', nth: 0 },
        };
    }
}













// update excel with these locators


// key,type,value,options,nth
// mobileInput,role,textbox,"{""name"":""Mobile Number""}",0
// passwordInput,role,textbox,"{""name"":""Enter Password""}",0
// myBetsButton,text,My Bets,{},0
// openBetsTab,text,Open Bets,{},0
// settledBetsTab,text,Settled Bets,{},0
// categoryDropdown,text,Sports,"{""exact"":true}",0
// betgamesOption,label,Betgames,{},0
// luckyNumbersOption,label,Lucky Numbers,{},0
// jackpotsOption,label,Betway Jackpots,{},0
// toteOption,text,Tote,"{""exact"":true}",0
// filterDropdown,text,All,"{""exact"":true}",0
// cashoutOption,text,Cashout,{},0
// winOption,text,Win,"{""exact"":true}",0
// lossOption,label,Loss,{},0
// searchBox,role,textbox,"{""name"":""Search bets...""}",0
// detailViewButton,text,Detail View,{},0
// detailViewContainer,locator,.w-full.px-2.bg-light-100,{},0
// shareButton,locator,.cursor-pointer.w-5.h-5.rounded,{},0
// placeBetButton,role,button,"{""name"":""Bet Now""}",0
// editBetButton,text,Edit,"{""exact"":true}",0
// editBetCheckbox,locator,div.flex.justify-between.font-bold...,{},0
// editContinueButton,role,button,"{""name"":""Continue""}",0
// editCancelButton,role,button,"{""name"":""Cancel""}",0
// cashoutButton,text,Cashout,{},0
// cashoutConfirmButton,role,button,"{""name"":""Cashout""}",0
// cashoutSuccessMessage,text,You have successfully cashed,{},0
// hideLossesToggle,locator,#my-bets-container div... label span,{},0
// paginationNext,locator,#transaction-history-next,{},0