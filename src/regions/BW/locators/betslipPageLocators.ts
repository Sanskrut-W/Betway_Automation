import { selectors } from "playwright";
import { text } from "stream/consumers";

export const betslipPageLocator = {
  usernameInput: { selector: '#header-username' },
  passwordInput: { selector: '#header-password' },
  closePromotionPopup: { selector: '#close-toast' },


  sportButton: { selector: 'img[alt="Sport"]' },
  betslipButton: { text: 'Betslip 0' },
  betslipCount: { selector: '[data-testid="betslip-count"]' },
  singleTab: { selector: '#betslip-single-tab' },
  multiTab: { selector: '#betslip-multi-tab' },
  bookingCodeInput: { role: 'textbox', options: { name: 'Booking Code' } },
  settingsButton: { selector: '#betslip-setting-btn' }, // Use with .getByRole('img') in page object for click
  warningText: { text: 'No selected betsYou don\'t' },
  loadButton: { role: 'button', name: 'load' },

  settingsText: { text: 'Betslip Settings' },
  acceptOddsToggleLabel: { text: 'Accept all odds & line changes' },
  acceptOddsToggle: { selector: '.w-\\[52px\\]' },         // first toggle
  keepBetsToggleLabel: { text: 'Keep bets in betslip' },
  keepBetsToggle: { selector: 'div:nth-child(2) > .relative > .w-\\[52px\\]' }, // second toggle
  continueButton: { role: 'button', name: 'Continue' },
  closeIcon: { selector: '#modal-close-btn path' },

  simpleViewToggle: { selector: '#simple-view-toggle' },
  deleteIcon: { selector: '#betslip-remove-all' },
  selectAllCheckbox: { selector: '#betslip-select-all' },

  removeLegIcon: { selector: '#remove-event-betslip' },
  betAmountInput: { selector: '#bet-amount-input' },
  loginBtnBetslip: { selector: '#betslip-container', role: 'button', name: 'Login' },
  betNowBtn: { selector: '#betslip-strike-btn' },
  shareBtn: { selector: '#betslip-share-btn' },
  cashBtnSingle: { selector: '#single-cash-tab' },
  freebetBtnSingle: { selector: '#single-free-tab' },
  cashBtnMulti: { selector: '#multi-cash-balance-tab' },
  freebetBtnMulti: { selector: '#multi-freebet-tab' },
  // cashOutIcon: { selector: '#cashout-icon' },
  cashOutIcon: { selector: '.w-4.h-4.fill-primary-300 > path' },
  winBoostToolTip: { text: 'Win Boost 3%. 1 more for 4% (Min odds 1.2)' },

  winBoostValue: { text: 'Win Boost (3%): R' },
  winBoostInfoIcon: {
    selector: 'div', filter: {
      hasText: /^Win Boost 3%\. 1 more for 4% \(Min odds 1\.2\)Bet Saver not active$/
    }, role: 'img', nth: 1,
  },

  betSaverText: { text: 'Bet Saver is active' },
  totalBetwayReturnMulti: { text: 'Total Betway Return' },
  totalBetwayReturnSingle: {text:'Total Betway Return:' },
  potentialReturnSingle: {text:'Potential Return:' },
  potentialReturnMulti: {text:'Potential Return:'},












};
