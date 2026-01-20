import { test as base, expect, Page, BrowserContext } from '@playwright/test';
import path from 'path';
import * as fs from 'fs';

// --- Page Object Imports ---
import { LoginPage } from '../pages/LoginPage';
import { SportsPage } from '../pages/SportsPage';
import { CasinoPage } from '../pages/CasinoPage';
import { VirtualsPage } from '../pages/VirtualsPage';
import { PromotionPage } from '../pages/PromotionPage';
import { BetgamesPage } from '../pages/BetGamesPage';
import { SignUpPage } from '../pages/SignUpPage';
import { SignupUtils } from '../commonflows/signupUtils';
import { HomePage } from '../pages/HomePage';
import { HeaderPage } from '../pages/HeaderPage';
import { BetslipPage } from '../pages/BetslipPage';
import { BetInfluencerModal } from '../pages/BetInfluencerModal';
import { ContactUsPage } from '../pages/ContactUsPage';
import { HowToPage } from '../pages/HowToPage';
import { MyBetsPage } from '../pages/MyBetsPage';
import { BuildABetPage } from '../pages/BuildABetPage';
import { BookABetPage } from '../pages/BookABetPage';
import { BetSaverPage } from '../pages/BetSaverPage';
import { TransactionHistoryPage } from '../pages/TransactionHistoryPage';
import { HamburgerMenuPage } from '../pages/HamburgerMenuPage';
import { FeedsPage } from '../pages/FeedsPage';
import { GamingLobbyPage } from '../pages/GamingLobbyPage';

// Define the shape of the data file
export interface FullTestData {
  basicInfo: {
    mobile: string;
    password: string;
    firstName: string;
    lastName: string;
    email: string;
  };
  mobileValidation: { [key: string]: string };
  passwordValidation: { [key: string]: string };
  nameValidation: { [key: string]: string };
  idValidation: { [key: string]: string };
  codeValidation: { [key: string]: string };
  myBetsCredentials: {
    mobile: string;
    password: string;
  };
  buildABetCredentials: { // <--- 2. ADD NEW DATA INTERFACE
    mobile: string;
    password: string;
  };
}

// Path to your JSON data file
const testDataPath = path.resolve(__dirname, '../json-data/SignUpData.json');

// Helper check
if (!fs.existsSync(testDataPath)) {
  console.error(`\n[MasterFixtureFile Error]`);
  console.error(`Could not find the JSON data file at the specified path.`);
  console.error(`Path tried: ${testDataPath}`);
  process.exit(1);
}

const testDataFile = fs.readFileSync(testDataPath, 'utf-8');
const allTestData: FullTestData = JSON.parse(testDataFile);

// DEPRECATED: For backward compatibility
export const TestDataVariations = allTestData;

type PageFixtures = {
  homePage: HomePage;
  loginPage: LoginPage;
  sportsPage: SportsPage;
  casinoPage: CasinoPage;
  virtualsPage: VirtualsPage;
  promotionPage: PromotionPage;
  betgamesPage: BetgamesPage;
  betinfluencerModal: BetInfluencerModal;
  contactUs: ContactUsPage;
  howTo: HowToPage;
  myBetsPage: MyBetsPage;
  buildABetPage: BuildABetPage;
  bookABetPage: BookABetPage;
  betSaverPage: BetSaverPage;
  transactionHistoryPage: TransactionHistoryPage;
  headerPage: HeaderPage;
  betslipPage: BetslipPage;
  hamburgerMenuPage: HamburgerMenuPage;
  feedsPage: FeedsPage;
  gamingLobbyPage: GamingLobbyPage;
  // Signup-specific fixtures
  signupPage: SignUpPage;
  signupUtils: SignupUtils;
  screenshotDir: string;
  testData: FullTestData;
};

export const test = base.extend<PageFixtures>({
  homePage: async ({ page }, use) => {
    const homePage = new HomePage(page);
    await homePage.gotoHomePage();
    // await homePage.page.setViewportSize({ width: 1300, height: 780 });
    await homePage.page.getByText('Got it').first().click();
    await use(homePage);
  },

  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    // await loginPage.page.setViewportSize({ width: 1300, height: 780 });
    await loginPage.goto();
    await loginPage.page.getByText('Got it').first().click();
    await use(loginPage);
  },

  sportsPage: async ({ page }, use) => {
    const sportsPage = new SportsPage(page);
    // await sportsPage.page.setViewportSize({ width: 1300, height: 780 });
    await sportsPage.gotoSportsPage();
    await sportsPage.page.getByText('Got it').first().click();
    await use(sportsPage);
  },

  casinoPage: async ({ page }, use) => {
    const casinoPage = new CasinoPage(page);
    // await casinoPage.page.setViewportSize({ width: 1300, height: 780 });
    await casinoPage.gotoCasino();
    await casinoPage.page.getByText('Got it').first().click();
    await use(casinoPage);
  },

  virtualsPage: async ({ page }, use) => {
    const virtualsPage = new VirtualsPage(page);
    // await virtualsPage.page.setViewportSize({ width: 1300, height: 780 });
    await virtualsPage.gotoVirtuals();
    await use(virtualsPage);
  },

  promotionPage: async ({ page }, use) => {
    const promotionPage = new PromotionPage(page);
    await use(promotionPage);
  },

  contactUs: async ({ page }, use) => {
    const contactUsPage = new ContactUsPage(page);
    // await contactUsPage.page.setViewportSize({ width: 1300, height: 780 });
    await contactUsPage.gotoContactUs();
    await use(contactUsPage)
  },

  howTo: async ({ page }, use) => {
    const howTo = new HowToPage(page);
    // await howTo.page.setViewportSize({ width: 1300, height: 780 });
    await howTo.gotoHowTo();
    await use(howTo)
  },

  betgamesPage: async ({ page }, use) => {
    const betgamesPage = new BetgamesPage(page);
    // await betgamesPage.page.setViewportSize({ width: 1300, height: 780 });
    await betgamesPage.gotoBetgames();
    await use(betgamesPage);
  },

  betinfluencerModal: async ({ page }, use) => {
    const betinfluencerModal = new BetInfluencerModal(page);
    await betinfluencerModal.goto();
    // await betinfluencerModal.page.setViewportSize({ width: 1300, height: 780 });
    await betinfluencerModal.page.getByText('Got it').first().click();
    await use(betinfluencerModal);
  },

  headerPage: async ({ page }, use) => {
    const headerPage = new HeaderPage(page);
    // await headerPage.page.setViewportSize({ width: 1300, height: 780 });
    await headerPage.goto();
    await use(headerPage);
  },

  betslipPage: async ({ page }, use) => {
    const betslipPage = new BetslipPage(page);
    // await betslipPage.page.setViewportSize({ width: 1300, height: 780 });
    await betslipPage.goto();
    await use(betslipPage);
  },
  buildABetPage: async ({ page }, use) => {
    // await page.setViewportSize({ width: 1300, height: 780 });
    const buildABetPage = new BuildABetPage(page);
    await buildABetPage.goto();
    await use(buildABetPage);
  },

  screenshotDir: async ({ }, use) => {
    const projectRoot = path.resolve(__dirname, '../../..');
    const screenshotDir = path.join(projectRoot, 'screenshots/module/sign-up');
    await use(screenshotDir);
  },

  testData: async ({ }, use) => {
    await use(allTestData);
  },

  signupPage: async ({ page }, use) => {
    // await page.setViewportSize({ width: 1300, height: 780 });
    const signupPage = new SignUpPage(page);
    await use(signupPage);
  },

  signupUtils: async ({ page }, use) => {
    // await page.setViewportSize({ width: 1300, height: 780 });
    const signupUtils = new SignupUtils(page);
    await use(signupUtils);
  },

  myBetsPage: async ({ page }, use) => {
    // await page.setViewportSize({ width: 1300, height: 780 });
    const myBetsPage = new MyBetsPage(page);
    await myBetsPage.gotoSports();
    await use(myBetsPage);
  },

  bookABetPage: async ({ page }, use) => {
    // await page.setViewportSize({ width: 1300, height: 780 });
    const bookABetPage = new BookABetPage(page);
    await bookABetPage.goto();
    await use(bookABetPage);
  },

  betSaverPage: async ({ page }, use) => {
    // await page.setViewportSize({ width: 1300, height: 780 });
    const betSaverPage = new BetSaverPage(page);
    await betSaverPage.goto();
    await betSaverPage.Login();
    await use(betSaverPage);
  },

  transactionHistoryPage: async ({ page }, use) => {
    // await page.setViewportSize({ width: 1300, height: 780 });
    const transactionHistoryPage = new TransactionHistoryPage(page);
    await transactionHistoryPage.goto();
    await transactionHistoryPage.Login();
    await use(transactionHistoryPage);
  },

  hamburgerMenuPage: async ({ page }, use) => {
    // await page.setViewportSize({ width: 1300, height: 780 });
    const hamburgerMenuPage = new HamburgerMenuPage(page);
    await hamburgerMenuPage.goto();
    await use(hamburgerMenuPage);
  },

  feedsPage: async ({ page }, use) => {
    // await page.setViewportSize({ width: 1300, height: 780 });
    const feedsPage = new FeedsPage(page);
    await feedsPage.goto();
    await feedsPage.Login();
    await use(feedsPage);
  },

  gamingLobbyPage: async ({ page }, use) => {
    // await page.setViewportSize({ width: 1300, height: 780 });
    const gamingLobbyPage = new GamingLobbyPage(page);
    await gamingLobbyPage.goto();
    await gamingLobbyPage.Login();
    await use(gamingLobbyPage);
  }

});
