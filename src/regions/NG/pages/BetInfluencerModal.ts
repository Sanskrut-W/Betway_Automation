import { betInfluencerModalLocators } from '../locators/betInfluencerModalLocators';
import { loadLocatorsFromExcel } from "../../../global/utils/file-utils/excelReader";
import { getLocator } from "../../../global/utils/file-utils/locatorResolver";
import { LoginPage } from './LoginPage';
// const userData = require('../../../json-data/userData.json');

import { SportsPage } from './SportsPage';
import { highlightElements } from '../../Common-Flows/HighlightElements';
import { ScreenshotHelper } from '../../Common-Flows/ScreenshotHelper';
import { getFirstBookingCode } from '../commonflows/storeAllBookingCode';
import { BetslipPage } from './BetslipPage';
import { GetBookingCode } from '../../Common-Flows/GetBookingCode';
import { OddsSelection } from '../commonflows/OddSelection';
const LOCATOR_URL = "https://github.com/athrvzoz/LocatorFile/raw/refs/heads/main/locators.xlsx"
const userData = require('../json-data/userData.json');


export class BetInfluencerModal extends BetslipPage {
    page: import('@playwright/test').Page;
    BetInfluencerModalLocatorRegistry: Record<string, import('@playwright/test').Locator>;
    revenue: any;


    constructor(page: import('@playwright/test').Page) {
        super(page);
        this.page = page;
        this.revenue = this.page.getByText('Revenue').nth(0);
        const configs = loadLocatorsFromExcel(LOCATOR_URL, "BetInfluencerModalPage");
        this.BetInfluencerModalLocatorRegistry = {
            ...this.BetslipPageLocatorsRegistry,
            summaryButton: getLocator(page, configs["summaryButton"]),
            detailButton: getLocator(page, configs["detailButton"]),
            lastFourWeeksCanvas: getLocator(page, configs["lastFourWeeksCanvas"]),
            detailedBreakdownButton: getLocator(page, configs["detailedBreakdownButton"]),
            totalMonthlyRevenue: getLocator(page, configs["totalMonthlyRevenue"]),
            sortBySelector: getLocator(page, configs["sortBySelector"]),
            // monthsSelector : getLocator(page, configs["monthsSelector"]),
            codesUsed: getLocator(page, configs["codesUsed"]),
            betsTaken: getLocator(page, configs["betsTaken"]),
            nextButton: getLocator(page, configs["nextButton"]),
            previousButton: getLocator(page, configs["previousButton"]),
            // revenueGraph : getLocator(page, configs["revenueGraph"])
        }
    }

    async verifyBookingCodeDropDown() {
        const bookingCode = getFirstBookingCode();
        await this.page.locator(`#${bookingCode}`).locator('summary').click();
        await this.page.waitForTimeout(5000);
        await highlightElements(this.page.locator(`#${bookingCode}`).locator('summary'));
    }

    async verifyPresenceofBetInfluencerinHamburgerMenu() {
        await this.toggleHambergerMenu();
        await highlightElements(this.BetInfluencerModalLocatorRegistry.BetInfluencer);
    }

    async verifyBetInfluencerFromAccountPopup(mobile: any) {
        await this.toggleHambergerMenu();
        await this.page.getByText('My Bets').nth(0).click();
        await this.page.getByText(`Account Options: ${mobile} `)
        const windowBetInfluencer = await this.page.locator('#booking-codes-account-nav');
        await windowBetInfluencer.waitFor({ state: 'visible', timeout: 5000 });
        await highlightElements(windowBetInfluencer);
    }

    async verifyAndClickDetailedBreakdown() {
        await highlightElements(this.BetInfluencerModalLocatorRegistry.detailedBreakdownButton);
        await this.BetInfluencerModalLocatorRegistry.detailedBreakdownButton.click();
        await this.page.waitForSelector('text=Total monthly revenue', { state: 'visible' });
    }

    async verifyNextButton(screenshotDir: string, testInfo: import('@playwright/test').TestInfo) {
        await highlightElements(this.BetInfluencerModalLocatorRegistry.nextButton);
    }

    async verifyPreviousButton(screenshotDir: string, testInfo: import('@playwright/test').TestInfo) {
        await highlightElements(this.BetInfluencerModalLocatorRegistry.previousButton);
    }

    async verifyNextButtonFunctionality() {
        let activeTag = true;
        while (await this.BetInfluencerModalLocatorRegistry.nextButton.getAttribute('class').then(cls => cls && cls.includes('active'))) {
            await this.BetInfluencerModalLocatorRegistry.nextButton.click();
            await this.page.waitForTimeout(1000);
            activeTag = false;
        }
        return activeTag;
    }

    async toggleHambergerMenu() {
        await this.Login();
        await this.page.waitForLoadState('domcontentloaded');
        await this.BetInfluencerModalLocatorRegistry.hamburgerMenu.click();
    }

    async gotoBetInfluencerModal() {
        await this.toggleHambergerMenu();
        await this.BetInfluencerModalLocatorRegistry.BetInfluencer.click();
        await this.page.waitForSelector('text=Revenue', { state: 'visible' });
    }
    async gotoDetailSectionBetInfluencerModal() {
        await this.toggleHambergerMenu();
        await this.BetInfluencerModalLocatorRegistry.BetInfluencer.click();
        await this.page.waitForSelector('text=Revenue', { state: 'visible' });
        await this.clickDetailButton();
    }
    async goToBetInfluencerWithoutLogin() {
        await this.page.waitForLoadState('domcontentloaded');
        await this.BetInfluencerModalLocatorRegistry.hamburgerMenu.click();
        await this.page.waitForLoadState('domcontentloaded');
        await this.page.waitForTimeout(2000);
        await this.BetInfluencerModalLocatorRegistry.BetInfluencer.click();
        await this.page.waitForSelector('text=Revenue', { state: 'visible' });
        await this.page.waitForTimeout(2000);
    }
    async clickDetailButton() {
        await this.BetInfluencerModalLocatorRegistry.detailButton.click();
        await this.page.waitForSelector('text=Total monthly revenue', { state: 'visible' });
    }

    async sortByDropDownFunctionalityChacek(screenshotDir: string, testInfo: import('@playwright/test').TestInfo) {
        for (let i = 0; i < 6; i++) {
            await this.BetInfluencerModalLocatorRegistry.sortBySelector.click();
            await this.page.keyboard.press('ArrowDown');
            await this.page.keyboard.press('Enter');
            await highlightElements(this.BetInfluencerModalLocatorRegistry.sortBySelector);
            await ScreenshotHelper(this.page, screenshotDir, `T7-${i + 1}-Sort by dropdown after click`, testInfo);
        }
    }


    async User1PlaceBets(legsCount: number) {
        await this.gotoSportsPage();
        await this.LoginArgs(`${userData.user1.mobile}`, `${userData.user1.password}`);
        await OddsSelection(legsCount, this.page);
        await this.clickBetNowBtn();
        const bookingCode = await this.SportsPagelocatorRegistry.bookingCodeMessage.locator('..').innerText();
        console.log(bookingCode);
        await this.page.locator('#modal-close-btn').first().click();
        await this.LogOut();
        return bookingCode;
    }

    async User2PlaceBetsFromBookingCode(bookingCode: any) {
        await this.LoginArgs(`${userData.user4.mobile}`, `${userData.user4.password}`)
        await this.BetInfluencerModalLocatorRegistry.welcomeUser.waitFor({ state: 'visible' })
        await this.BetInfluencerModalLocatorRegistry.betslipButton.click();
        const SharedBookingCode = await GetBookingCode(bookingCode)
        await this.BetInfluencerModalLocatorRegistry.enterBookingCodeTextbox.fill(`${SharedBookingCode}`)
        await this.page.keyboard.press('Enter');
        await this.clickBetNowBtn();
        await this.BetInfluencerModalLocatorRegistry.betConfirmation.locator('..').getByRole('img').first().click();
        await this.LogOut();
        return SharedBookingCode;
    }
}