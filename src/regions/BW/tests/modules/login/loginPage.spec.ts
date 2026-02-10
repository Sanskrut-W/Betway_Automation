import { test } from '../../../fixtures/MasterFixtureFile';
import { expect } from '@playwright/test';
import { log } from 'console';
import path from 'path';
import { highlightElementBorder, highlightElements } from '../../../../Common-Flows/HighlightElements';
import { ScreenshotHelper } from '../../../../Common-Flows/ScreenshotHelper';
import { OddsSelection } from '../../../../Common-Flows/OddSelection';

const highlights = require('../../../apis/Highlights.json');
const fakerdata = require('../../../json-data/faker.json');
const userData = require('../../../json-data/userData.json');
const projectRoot = path.resolve(__dirname, '../../..');
const screenshotDir = path.join(projectRoot, 'screenshots/module/login');

test.describe.serial('Login Page Tests', () => {

  // test("T1-Verify Login Button is visible on Homepage.", async ({ loginPage }, testInfo) => {
  //   await loginPage.verifyHeaderLoginButton();
  //   await ScreenshotHelper(loginPage.page, screenshotDir, 'T1-loginPage', testInfo);
  // });

  // test('T2 - Verify that user should able to click on "Login" button', async ({ loginPage }, testInfo) => {
  //   await loginPage.clickLogin();
  //   await ScreenshotHelper(loginPage.page, screenshotDir, 'T2-loginPage', testInfo);
  // });


  // test('T3 - Verify that user should able to see the "Login" button in Hamburger menu', async ({ loginPage }, testInfo) => {
  //   await loginPage.clickHamburgerMenu();
  //   await loginPage.verifyHamburgerLoginButton();
  //   await ScreenshotHelper(loginPage.page, screenshotDir, 'T3-loginPage', testInfo);
  // });


  // test('T4 - Verify that user should able to click on "Login" button in Hamburger menu', async ({ loginPage }, testInfo) => {
  //   await loginPage.clickLoginButtonFromHamburger();
  //   await ScreenshotHelper(loginPage.page, screenshotDir, 'T4-loginPage', testInfo);
  // });


  // test('T5 - Verify that user should able to see the "Login" button on signup popup window', async ({ loginPage }, testInfo) => {
  //   await loginPage.clickLoginButtonFromHamburger();
  //   await loginPage.verifyLoginButtonFromPopupThroughHamburger();
  //   await ScreenshotHelper(loginPage.page, screenshotDir, 'T5-loginPage', testInfo);
  // });


  // test('T6 - Verify that user should able to click on "Login" button on signup popup window', async ({ loginPage }, testInfo) => {
  //   await loginPage.clickSignUp();
  //   await loginPage.verifyLoginButtonInSignUp();
  //   await ScreenshotHelper(loginPage.page, screenshotDir, 'T6-loginPage', testInfo);
  // });


  test('T7 - Verify that user should able to see the "Login" button on login popup window when clicked on aviator from carousel', async ({ sportsPage }, testInfo) => {
    await sportsPage.gotoAviator();
    await sportsPage.verifyLoginButtonFromPopupWithoutHamburger();
    await ScreenshotHelper(sportsPage.page, screenshotDir, 'T7-loginPage', testInfo);
  });


  test('T8 - Verify that user is able to see login button on signup popup window on aviator page', async ({ sportsPage }, testInfo) => {
    await sportsPage.gotoAviator();
    await sportsPage.gotoSignUpfromLoginPopUp();
    await sportsPage.verifyLoginButtonInSignUp();
    await ScreenshotHelper(sportsPage.page, screenshotDir, 'T8-loginPage', testInfo);
  });

  test('T9 - Verify user is able to login', async ({ loginPage }, testInfo) => {
    await loginPage.Login();
    await ScreenshotHelper(loginPage.page, screenshotDir, 'T9-loginPage', testInfo);
  });

  test('T10 - Verify user is able to login from hamburger menu', async ({ loginPage }, testInfo) => {
    await loginPage.LoginFromHamburgerMenu(userData.user1.mobile, userData.user1.password);
    await ScreenshotHelper(loginPage.page, screenshotDir, 'T10-loginPage', testInfo);
  });

  test('T11 - Verify user is able to login from signup popup', async ({ loginPage }, testInfo) => {
    await loginPage.LoginThroughPopUp();
    await ScreenshotHelper(loginPage.page, screenshotDir, 'T11-loginPage', testInfo);
  });

  test('T12  - Verify that user is able to login from login button available on signup popup window through hamburger menu', async ({ loginPage }, testInfo) => {
    await loginPage.LoginFromSignupPopupHamburgerMenu();
    await ScreenshotHelper(loginPage.page, screenshotDir, 'T12-loginPage', testInfo);
  });

  test('T13 - Verify that user is able to login from  signup popup window from aviator page', async ({ sportsPage }, testInfo) => {
    await sportsPage.gotoAviator();
    await sportsPage.LoginFromPopUp();
    await ScreenshotHelper(sportsPage.page, screenshotDir, 'T13-loginPage', testInfo);
  });

  test('T14 - Verify that user is not able to login if mobile number field is empty', async ({ loginPage }, testInfo) => {
    await loginPage.LoginFromSignupPopupHamburgerMenuArgs(fakerdata.user1.mobile, fakerdata.user1.password);
    await ScreenshotHelper(loginPage.page, screenshotDir, 'T14-loginPage', testInfo);
  });

  test('T15 - Verify that user is not able to login if mobile number field has less than 9 numeric characters', async ({ loginPage }, testInfo) => {
    await loginPage.LoginFromSignupPopupHamburgerMenuArgs(fakerdata.user2.mobile, fakerdata.user2.password);
    await ScreenshotHelper(loginPage.page, screenshotDir, 'T15-loginPage', testInfo);
  });

  test('T16 - Verify that user is not able to login if mobile number field has more than 9 numeric characters', async ({ loginPage }, testInfo) => {
    await loginPage.LoginFromSignupPopupHamburgerMenuArgs(fakerdata.user3.mobile, fakerdata.user3.password);
    await ScreenshotHelper(loginPage.page, screenshotDir, 'T16-loginPage', testInfo);
  });

  test('T17 - Verify that user is not able to login if mobile number field has alphanumeric characters', async ({ loginPage }, testInfo) => {
    await loginPage.LoginFromSignupPopupHamburgerMenuArgs(fakerdata.user4.mobile, fakerdata.user4.password);
    await ScreenshotHelper(loginPage.page, screenshotDir, 'T17-loginPage', testInfo);
  });

  test('T18 -Verify that user is not able to enter special character in mobile number field', async ({ loginPage }, testInfo) => {
    await loginPage.LoginFromSignupPopupHamburgerMenuArgs(fakerdata.user5.mobile, fakerdata.user5.password);
    await ScreenshotHelper(loginPage.page, screenshotDir, 'T18-loginPage', testInfo);
  });

  test('T19 -Verify that user is not able to login if password field is empty', async ({ loginPage }, testInfo) => {
    await loginPage.LoginFromSignupPopupHamburgerMenuArgs(fakerdata.user6.mobile, fakerdata.user6.password);
    await ScreenshotHelper(loginPage.page, screenshotDir, 'T19-loginPage', testInfo);
  });

  test('T20 - Verify that user is not able to login if password field has less than 5 characters', async ({ loginPage }, testInfo) => {
    await loginPage.LoginFromSignupPopupHamburgerMenuArgs(fakerdata.user2.mobile, fakerdata.user2.password);
    await ScreenshotHelper(loginPage.page, screenshotDir, 'T20-loginPage', testInfo);
  });

  test('T21 - Verify that user is not able to login if password field has more than 20 characters', async ({ loginPage }, testInfo) => {
    await loginPage.LoginFromSignupPopupHamburgerMenuArgs(fakerdata.user8.mobile, fakerdata.user8.password);
    await ScreenshotHelper(loginPage.page, screenshotDir, 'T21-loginPage', testInfo);
  });
  test('T22 - Verify that user is not able to login when mobile number field is empty when navigated from aviator page', async ({ sportsPage }, testInfo) => {
    await sportsPage.gotoAviator();
    await sportsPage.AviatorLoginPopUpArgs(fakerdata.user9.mobile, fakerdata.user9.password);
    await ScreenshotHelper(sportsPage.page, screenshotDir, 'T22-loginPage', testInfo);
  });
  test('T23 - Verify that user is not able to login if mobile number field has less than 9 numeric characters when navigated from signup popup window from  aviator page', async ({ sportsPage }, testInfo) => {
    await sportsPage.gotoAviator();
    await sportsPage.AviatorLoginPopUpArgs(fakerdata.user10.mobile, fakerdata.user10.password);
    await ScreenshotHelper(sportsPage.page, screenshotDir, 'T23-loginPage', testInfo);
  });
  test('T24 - Verify that user is not able to login if mobile number field has more than 9 numeric characters when navigated from signup popup window  from  aviator page', async ({ sportsPage }, testInfo) => {
    await sportsPage.gotoAviator();
    await sportsPage.AviatorLoginPopUpArgs(fakerdata.user11.mobile, fakerdata.user11.password);
    await ScreenshotHelper(sportsPage.page, screenshotDir, 'T24-loginPage', testInfo);
  });
  test('T25 -Verify that user is not able to login if mobile number field has alphanumeric characters when navigated from signup popup window  from  aviator page', async ({ sportsPage }, testInfo) => {
    await sportsPage.gotoAviator();
    await sportsPage.AviatorLoginPopUpArgs(fakerdata.user12.mobile, fakerdata.user12.password);
    await ScreenshotHelper(sportsPage.page, screenshotDir, 'T25-loginPage', testInfo);
  });
  test('T26 - Verify that user is not able to enter special character in mobile number field when navigated from signup popup window  from  aviator page', async ({ sportsPage }, testInfo) => {
    await sportsPage.gotoAviator();
    await sportsPage.AviatorLoginPopUpArgs(fakerdata.user13.mobile, fakerdata.user13.password);
    await ScreenshotHelper(sportsPage.page, screenshotDir, 'T26-loginPage', testInfo);
  });
  test('T27 - Verify that user is not able to login if password field is empty when navigated from signup popup window  from  aviator page', async ({ sportsPage }, testInfo) => {
    await sportsPage.gotoAviator();
    await sportsPage.AviatorLoginPopUpArgs(fakerdata.user14.mobile, fakerdata.user14.password);
    await ScreenshotHelper(sportsPage.page, screenshotDir, 'T27-loginPage', testInfo);
  });
  test('T28 - Verify that user is not able to login if password field has less than 5 character when navigated from signup popup window  from  aviator page', async ({ sportsPage }, testInfo) => {
    await sportsPage.gotoAviator();
    await sportsPage.AviatorLoginPopUpArgs(fakerdata.user7.mobile, fakerdata.user7.password);
    await ScreenshotHelper(sportsPage.page, screenshotDir, 'T28-loginPage', testInfo);
  });
  test('T29 - Verify that user is not able to login if password field has more than 20 characters when navigated from signup popup window  from  aviator page', async ({ sportsPage }, testInfo) => {
    await sportsPage.gotoAviator();
    await sportsPage.AviatorLoginPopUpArgs(fakerdata.user8.mobile, fakerdata.user8.password);
    await ScreenshotHelper(sportsPage.page, screenshotDir, 'T29-loginPage', testInfo);
  });

  test('T39- Verify that user is able to see the "Login" window when clicked on "Play" button on game banner while on "casino" page', async ({ casinoPage }, testInfo) => {
    await casinoPage.playGame('The Chicken game');
    await ScreenshotHelper(casinoPage.page, screenshotDir, 'T39-loginPage', testInfo);
  });
  test('T40- Verify that user is able  to click "Login"  from popup window when clicked on "Play" button on game banner while on "casino" page', async ({ casinoPage }, testInfo) => {
    await casinoPage.playGame('The Chicken game');
    await casinoPage.LoginFromPopUp();
    await ScreenshotHelper(casinoPage.page, screenshotDir, 'T40-loginPage', testInfo);
  });

  test('T41- Verify that user is able to see the "Login" window when clicked on "Play" button on game banner while on "Virtuals" page', async ({ virtualsPage }, testInfo) => {
    await virtualsPage.playGame('Goal Football English');
    await ScreenshotHelper(virtualsPage.page, screenshotDir, 'T41-loginPage', testInfo);
  });
  test('T42 - Verify that user is able to see the "Login" window from signup popup window when clicked on "Play" button on game banner while on "Virtuals" page', async ({ virtualsPage }, testInfo) => {
    await virtualsPage.playGame('Goal Football English');
    await virtualsPage.gotoSignUpfromLoginPopUp();
    await virtualsPage.verifyLoginButtonInSignUp();
    await ScreenshotHelper(virtualsPage.page, screenshotDir, 'T42-loginPage', testInfo);
  });
  test('T43 -Verify that user is able to click "Login" from popup window when clicked on "Play" button on game banner while on "Virtuals" page', async ({ virtualsPage }, testInfo) => {
    await virtualsPage.playGame('Goal Football English');
    await virtualsPage.LoginFromPopUp();
    await ScreenshotHelper(virtualsPage.page, screenshotDir, 'T43-loginPage', testInfo);
  });

  test('T44 - Verify that user is able to click "Login" from signup popup window when clicked on "Play" button  on game banner while on "Virtuals" page', async ({ virtualsPage }, testInfo) => {
    await virtualsPage.playGame('Goal Football English');
    await virtualsPage.gotoSignUpfromLoginPopUp();
    await virtualsPage.gotoLoginFromSignUp();
    await virtualsPage.LoginFromPopUp();
    await ScreenshotHelper(virtualsPage.page, screenshotDir, 'T44-loginPage', testInfo);
  });

  test('T45 - Verify that user is able to see the "Login" window when clicked on "Login" from signup popup window while on "Promotions" page', async ({ promotionPage }, testInfo) => {
    await promotionPage.gotoPromotionPages();
    await promotionPage.LoginFromPromotions(userData.user1.mobile, userData.user1.password);
    await expect(promotionPage.LoginPagelocatorsRegistry.welcomeUser).toBeVisible({ timeout: 100000 });
    await highlightElements(promotionPage.LoginPagelocatorsRegistry.welcomeUser.locator('..'));
    await ScreenshotHelper(promotionPage.page, screenshotDir, 'T45-loginPage', testInfo);
  });
  test('T46 - Verify user is able to hide or show password when clicked on eye hide button when on homepage', async ({ loginPage }, testInfo) => {
    await loginPage.clickLoginButtonFromHamburger();
    await loginPage.LoginPagelocatorsRegistry.formMobileInput.fill(userData.user1.mobile);
    await loginPage.LoginPagelocatorsRegistry.formPasswordInput.fill(userData.user1.password);
    await highlightElementBorder(loginPage.LoginPagelocatorsRegistry.eyeButton)
    await ScreenshotHelper(loginPage.page, screenshotDir, 'T46-Hide', testInfo)
    await loginPage.LoginPagelocatorsRegistry.eyeButton.click();
    await highlightElementBorder(loginPage.LoginPagelocatorsRegistry.eyeButton)
    await ScreenshotHelper(loginPage.page, screenshotDir, 'T46-Visible', testInfo)
  });
  test('T47 - Verify user is able to show password when clicked on eye hide button when on homepage', async ({ loginPage }, testInfo) => {
    await loginPage.clickLoginButtonFromHamburger();
    await loginPage.LoginPagelocatorsRegistry.formMobileInput.fill(userData.user1.mobile);
    await loginPage.LoginPagelocatorsRegistry.formPasswordInput.fill(userData.user1.password);
    await highlightElementBorder(loginPage.LoginPagelocatorsRegistry.eyeButton)
    await ScreenshotHelper(loginPage.page, screenshotDir, 'T47-Hide', testInfo)
    await loginPage.LoginPagelocatorsRegistry.eyeButton.click();
    await highlightElementBorder(loginPage.LoginPagelocatorsRegistry.eyeButton)
    await ScreenshotHelper(loginPage.page, screenshotDir, 'T47-', testInfo)
  });

  test('T48 - Verify that user is able to see the "Login" window when clicked on "Play" button on game banner while on "betgames" page', async ({ betgamesPage }, testInfo) => {
    await betgamesPage.playGame('Bad Baboons');
    await ScreenshotHelper(betgamesPage.page, screenshotDir, 'T48-loginPage', testInfo);
  });
  test('T49 - Verify that user is able to see the "Login" window from signup popup window when clicked on "Play" button on game banner while on "betgames" page', async ({ betgamesPage }, testInfo) => {
    await betgamesPage.playGame('Bad Baboons');
    await betgamesPage.gotoSignUpfromLoginPopUp();
    await betgamesPage.gotoLoginFromSignUp();
    await ScreenshotHelper(betgamesPage.page, screenshotDir, 'T49-loginPage', testInfo);
  });

  test('T50 - Verify that user is able  to click "Login"  from popup window when clicked on "Play" button on game banner while on "betgames" page', async ({ betgamesPage }, testInfo) => {
    await betgamesPage.playGame('Bad Baboons');
    await betgamesPage.LoginFromPopUp();
    await ScreenshotHelper(betgamesPage.page, screenshotDir, 'T50-loginPage', testInfo);
  });

  test('T51- Verify that user is able to see the "Login" popup window', async ({ sportsPage }, testInfo) => {
    await OddsSelection(5,sportsPage.page)
    await sportsPage.page.locator('#betslip-container').getByRole('button',{name:"Login"}).click();
    await sportsPage.LoginFromPopUp();
    await ScreenshotHelper(sportsPage.page, screenshotDir, 'T51-loginPage', testInfo);
  });

  test('T54/58/62 - Verify that user is able to see the "Login" window when clicked on "Favorite icon" button on game banner while on "Aviator" page', async ({ casinoPage }, testInfo) => {
    await casinoPage.FavouriteGame();
    await ScreenshotHelper(casinoPage.page, screenshotDir, 'T54-loginPage', testInfo);
  });

  test('T55/59/63 - Verify that user is able to see the "Login" window from signup popup window when clicked on "Favorite icon" button on game banner while on "Aviator" page', async ({ casinoPage }, testInfo) => {
    await casinoPage.FavouriteGame();
    await casinoPage.gotoSignUpfromLoginPopUp();
    await casinoPage.gotoLoginFromSignUp();
    await casinoPage.verifyLoginWindow();
    await ScreenshotHelper(casinoPage.page, screenshotDir, 'T55-loginPage', testInfo);
  });

  test('T56/60/64 - Verify that user is able  to click "Login"  from popup window when clicked on "Favorite icon" button on game banner while on "Aviator" page ', async ({ casinoPage }, testInfo) => {
    await casinoPage.FavouriteGame();
    await casinoPage.LoginFromPopUp();
    await ScreenshotHelper(casinoPage.page, screenshotDir, 'T56-loginPage', testInfo);
  });

  test('T57/61/65 - Verify that user is able  to click "Login"  from sign up popup window when clicked on "Favorite icon" button on game banner while on "Aviator" page ', async ({ casinoPage }, testInfo) => {
    await casinoPage.FavouriteGame();
    await casinoPage.gotoSignUpfromLoginPopUp();
    await casinoPage.gotoLoginFromSignUp();
    await casinoPage.verifyLoginButtonFromPopupWithoutHamburger();
    await ScreenshotHelper(casinoPage.page, screenshotDir, 'T57-loginPage', testInfo);
  });

  test('T66- Verify that user is able to see the "Login" window when clicked on "Favorite icon" button on game banner while on "Virtuals" page', async ({ virtualsPage }, testInfo) => {
    await virtualsPage.FavouriteGame();
    await ScreenshotHelper(virtualsPage.page, screenshotDir, 'T66-loginPage', testInfo);
  });
  test('T67 - Verify that user is able to see the "Login" window from signup popup window when clicked on "Favorite icon" button on game banner while on "Virtuals" page', async ({ virtualsPage }, testInfo) => {
    await virtualsPage.FavouriteGame();
    await virtualsPage.gotoSignUpfromLoginPopUp();
    await virtualsPage.gotoLoginFromSignUp();
    await virtualsPage.verifyLoginWindow();
    await ScreenshotHelper(virtualsPage.page, screenshotDir, 'T67-loginPage', testInfo);
  });

  test('T68 - Verify that user is able  to "Login"  from popup window when clicked on "Favorite icon" button on game banner while on "Virtuals" page', async ({ virtualsPage }, testInfo) => {
    await virtualsPage.FavouriteGame();
    await virtualsPage.gotoSignUpfromLoginPopUp();
    await virtualsPage.gotoLoginFromSignUp();
    await virtualsPage.verifyLoginButtonFromPopupWithoutHamburger();
    await ScreenshotHelper(virtualsPage.page, screenshotDir, 'T57-loginPage', testInfo);
  });
});
