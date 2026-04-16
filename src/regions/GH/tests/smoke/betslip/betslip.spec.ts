// npx playwright test src/regions/GH/tests/smoke/betslip/betslip.spec.ts --config=playwright.GH.config.ts --headed
import { test } from '../../../fixtures/MasterFixtureFile';
import path from 'path';
import { ScreenshotHelper } from '../../../../Common-Flows/ScreenshotHelper';
import { OddsSelection, OddsSelectionAbove } from '../../../commonflows/OddSelection';

const projectRoot = path.resolve(__dirname, '../../..');
const screenshotDir = path.join(projectRoot, 'screenshots/smoke/betslip');

test.describe('Betslip Module - GH', () => {

  test('T1-Verify Betslip Section without selecting any odd ', async ({ betslipPage }, testInfo) => {
    await betslipPage.verifyBetslipSection();
    await ScreenshotHelper(betslipPage.page, screenshotDir, 'T1-betslipButton.png', testInfo);
  });

  test('T2-Verify betslip settings section', async ({ betslipPage, page }, testInfo) => {
    await betslipPage.verifyBetslipSettingsSection();
    await ScreenshotHelper(page, screenshotDir, 'T2-betslip-settings-1.png', testInfo);
    await betslipPage.clickContinueButton();
    await betslipPage.clickSettingsButton();
    await betslipPage.clickCloseIcon();
  });

  test('T3-Verify functionality of "Setting" button on betslip', async ({ betslipPage, page }, testInfo) => {
    await betslipPage.clickBetslipButton();
    await betslipPage.verifySettingsButtonVisible();
    await betslipPage.clickSettingsButton();
    await ScreenshotHelper(page, screenshotDir, 'T3-betslip-settings-button.png', testInfo);
  });

  test('T4-Verify functionality of "Accept all odds & line changes" toggle button', async ({ betslipPage, page }, testInfo) => {
    await betslipPage.clickBetslipButton();
    await betslipPage.clickSettingsButton();
    await betslipPage.verifyAcceptOddsToggleVisible();
    // await betslipPage.clickAcceptOddsToggle();
    await ScreenshotHelper(page, screenshotDir, 'T4-betslip-toggle-button.png', testInfo);
  });

  test('T6-Verify functionality of "Keep bets in betslip" toggle button', async ({ betslipPage, page }, testInfo) => {
    await betslipPage.clickBetslipButton();
    await betslipPage.clickSettingsButton();
    await betslipPage.verifyKeepBetsToggleVisible();
    // await betslipPage.clickKeepBetsToggle();
    await ScreenshotHelper(page, screenshotDir, 'T6-betslip-toggle-button.png', testInfo);
  });

  test('T7-Verify functionality of "Continue" button on betslip settings popup', async ({ betslipPage, page }, testInfo) => {
    await betslipPage.clickBetslipButton();
    await betslipPage.clickSettingsButton();
    await betslipPage.verifyContinueButtonVisible();
    await ScreenshotHelper(page, screenshotDir, 'T7-betslip-continue-button.png', testInfo);
    await betslipPage.clickContinueButton();
    await ScreenshotHelper(page, screenshotDir, 'T7-betslip-continue-button.png', testInfo);
  });

  test('T8-Verify functionality of "Close" icon on betslip settings popup', async ({ betslipPage, page }, testInfo) => {
    await betslipPage.clickBetslipButton();
    await betslipPage.clickSettingsButton();
    await betslipPage.verifyCloseIconVisible();
    await ScreenshotHelper(page, screenshotDir, 'T8-betslip-close-icon.png', testInfo);
    await betslipPage.clickCloseIcon();
  });

  test('T9-Verify functionality of "Delete" icon  on Betslip', async ({ betslipPage, page }, testInfo) => {
    await OddsSelectionAbove(1, 1, page);
    await betslipPage.verifyDeleteIcon();
    await ScreenshotHelper(page, screenshotDir, 'T9-betslip-delete-icon.png', testInfo);
    await betslipPage.clickDeleteIcon();
    await ScreenshotHelper(page, screenshotDir, 'T9-betslip-delete-icon-after-click.png', testInfo); // Renamed for clarity
  });

  test('T10-Verify functionality of "Select All" checkbox on Betslip', async ({ betslipPage, page }, testInfo) => {
    await OddsSelectionAbove(2, 1, page);
    await betslipPage.verifySelectAllCheckbox();
    await betslipPage.uncheckSelectAllCheckbox();
    await ScreenshotHelper(page, screenshotDir, 'T10-betslip-select-all-unchecked.png', testInfo);
    await betslipPage.checkSelectAllCheckbox();
    await ScreenshotHelper(page, screenshotDir, 'T10-betslip-select-all-checked.png', testInfo);
  });

  test('T11-Single section- Verify Content of the of the betslip by selecting odd', async ({ betslipPage, page }, testInfo) => {
    await OddsSelectionAbove(1, 1, page);
    await betslipPage.verifySingleTab();
    await ScreenshotHelper(page, screenshotDir, 'T11-betslip-single-tab.png', testInfo);
  });

  test('T12-Multi section- Verify Content of the of the betslip by selecting odd', async ({ betslipPage, page }, testInfo) => {
    await OddsSelectionAbove(2, 1, page);
    await betslipPage.verifyMultiTab();
    await betslipPage.clickMultiTab();
    await ScreenshotHelper(page, screenshotDir, 'T12-betslip-multi-tab.png', testInfo);
  });

  test('T13-Verify functionality of "Close" button of leg on Betslip inside single section of the betslip', async ({ betslipPage, page }, testInfo) => {
    await OddsSelectionAbove(1, 1, page);
    await betslipPage.verifyRemoveLegIcon();
    await ScreenshotHelper(page, screenshotDir, 'T13-betslip-remove-leg-icon-Single.png', testInfo);
    await betslipPage.clickRemoveLegIcon();
    await betslipPage.clickBetslipButton();
    await ScreenshotHelper(page, screenshotDir, 'T13-betslip-remove-leg-after-click-Single.png', testInfo);
  });

  test('T14-Verify functionality of Wager amount text box inside single section of the betslip', async ({ betslipPage, page }, testInfo) => {
    await OddsSelectionAbove(1, 1, page);
    await betslipPage.verifyBetAmountInput();
    await betslipPage.enterBetAmount('10');
    await ScreenshotHelper(page, screenshotDir, 'T14-betslip-bet-amount-input-Single.png', testInfo);
  });

  test('T35-Verify functionality of Wager amount text box inside multi section of the betslip', async ({ betslipPage, page }, testInfo) => {
    await OddsSelectionAbove(2, 1, page);
    // await betslipPage.clickMultiTab();
    await betslipPage.verifyBetAmountInput();
    await betslipPage.enterBetAmount('10');
    await ScreenshotHelper(page, screenshotDir, 'T35-betslip-bet-amount-input-multi.png', testInfo);
  });

  test('T20-Single- Verify  "Total betway return" Wager(Calculation)', async ({ betslipPage, page }, testInfo) => {
    await OddsSelectionAbove(1, 1, page);
    await betslipPage.verifyTotalBetwayReturnSingle();
    await ScreenshotHelper(page, screenshotDir, 'T20-betslip-total-betway-return-calculation-Single.png', testInfo);
  });

  test('T21-Single-Verify "Potential Return" Wager(Calculation)', async ({ betslipPage, page }, testInfo) => {
    await OddsSelectionAbove(1, 1, page);
    await betslipPage.verifyPotentialReturnsSingle();
    await ScreenshotHelper(page, screenshotDir, 'T21-betslip-Potential-Return-calculation.png', testInfo);
  });

  test('T22-Multi- Verify  "Total betway return" Wager(Calculation)', async ({ betslipPage, page }, testInfo) => {
    await OddsSelectionAbove(1, 1, page);
    await betslipPage.clickMultiTab();
    await betslipPage.verifyTotalBetwayReturnMulti();
    await ScreenshotHelper(page, screenshotDir, 'T22-betslip-total-betway-return-calculation-multi.png', testInfo);
  });

  test('T23-Multi- Verify  "Potential Return" Wager(Calculation)', async ({ betslipPage, page }, testInfo) => {
    await OddsSelectionAbove(1, 1, page);
    await betslipPage.verifyPotentialReturnsMulti();
    await ScreenshotHelper(page, screenshotDir, 'T23-betslip-Potential-Return-calculation-multi.png', testInfo);
  });

  test('T24-Multi- Verify "Win boost" amount calculation on betslip.', async ({ betslipPage, page }, testInfo) => {
    await OddsSelectionAbove(3, 2, page);
    await betslipPage.verifyWinBoostCalculation();
    await ScreenshotHelper(page, screenshotDir, 'T24-betslip-Win-boost-amount-calculation-multi.png', testInfo);
  });


  test('T26-Multi-Verify Win Boost tool tip', async ({ betslipPage, page }, testInfo) => {
    await OddsSelectionAbove(3, 1.21, page);
    await betslipPage.verifyWinBoostToolTip();
    await ScreenshotHelper(page, screenshotDir, 'T26-betslip-Win-boost-tool-tip-multi.png', testInfo);
  });

  test('T27-Multi-Verify Win Boost pop up window', async ({ betslipPage, page }, testInfo) => {
    await OddsSelectionAbove(3, 1.21, page);
    await betslipPage.verifyWinBoostInfoIcon();
    await betslipPage.clickWinBoostInfoIcon();
    await page.waitForTimeout(2000);
    await ScreenshotHelper(page, screenshotDir, 'T27-betslip-Win-boost-pop-up-window-multi.png', testInfo);
  });

  test('T28-Verify functionality of "Login" button on betslip for single tab', async ({ betslipPage, page }, testInfo) => {
    await OddsSelectionAbove(1, 1, page);
    await betslipPage.verifyLoginBtnBetslip();
    await ScreenshotHelper(page, screenshotDir, 'T28-betslip-login-button-Single.png', testInfo);
    await betslipPage.clickLoginBtnBetslip();
    await ScreenshotHelper(page, screenshotDir, 'T28-betslip-login-after-click-Single.png', testInfo);
  });

  test('T38-Verify functionality of "Login" button on betslip for multi tab', async ({ betslipPage, page }, testInfo) => {
    await OddsSelectionAbove(1, 1, page);
    await betslipPage.clickMultiTab();
    await betslipPage.verifyLoginBtnBetslip();
    await betslipPage.clickLoginBtnBetslip();
    await ScreenshotHelper(page, screenshotDir, 'T38-betslip-login-after-click-multi.png', testInfo);
  });


  test('T34-Verify functionality of "Close" button of leg on Betslip inside multi section', async ({ betslipPage, page }, testInfo) => {
    await OddsSelectionAbove(1, 1, page);
    await betslipPage.clickMultiTab();
    await betslipPage.verifyRemoveLegIcon();
    await ScreenshotHelper(page, screenshotDir, 'T34-betslip-remove-leg-icon-multi.png', testInfo);
    await betslipPage.clickRemoveLegIcon();
    await betslipPage.clickBetslipButton();
    await ScreenshotHelper(page, screenshotDir, 'T34-betslip-remove-leg-after-clickmulti.png', testInfo);
  });
});