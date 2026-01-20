import { count } from "console";
import { selectors } from "playwright";

export const headerLocators = {
  betwayLogoHeader: { selector: 'img[alt="Betway Logo"]' },
  mobileInput2: { selector: 'textbox', options: { name: 'Mobile Number' }, nth: 0 },
  closePromotionPopup: { selector: '#close-toast' },
  hamburgerMenu: { selector: '#header-hamburger-btn' },
  loginButton: '#login-btn',
  loginButtonFromPopup: { selector: 'button', options: { name: 'Login' }, nth: 1 },
  //Hamburger menu locators
  loginButtonfromHamburger: { selector: 'button', options: { name: 'Login' }, nth: 1 },
  signUpButton: { selector: 'button', options: { name: 'Sign Up' } },
  signUpButtonfromHamburger: { selector: 'button', options: { name: 'Sign Up' }, nth: 1 },
  closeHamburgerMenu: { selector: '.flex > svg:nth-child(2)' },
  quickLinks: { selector: 'text', options: { name: 'Quick Links' } },
  myAccount: { selector: 'text', options: { name: 'My Account' } },
  bettingRules: { selector: 'text', options: { name: 'Betting Rules and Tips' } },
  statistics: { selector: 'text', options: { name: 'Statistics' } },
  oddsFormat: { selector: 'text', options: { name: 'Decimal' } },

  countryCode: { selector: 'text', options: { name: '+27' } },
  usernameInput: { selector: '#header-username' },
  passwordInput: { selector: '#header-password' },
  eyeButton: { selector: 'xpath', options: { namespace: 'http://www.w3.org/2000/svg', tag: 'svg' }, nth: 0 },
  forgetPasswordLink: { selector: 'text', options: { name: 'Forgot Password?' } },
  betslipButton: { text: 'Betslip 0' },
  gotItButton: { selector: 'text', options: { name: 'Got it' }, nth: 0 },

  //Hamburger menu - My Account options locators
  depositFund: { selector: 'text', options: { name: 'Deposit funds' } },
  withdrawFund: { selector: 'text', options: { name: 'Withdraw funds' } },
  closeWithdrawalAlert: { selector: '#modal-close-btn', nth: 1 },
  myBets: { selector: '#My\\ Bets-hamburger-menu-btn' },
  MyCasinoBigWun: { selector: '#My\\ Casino\\ Big\\ Wins-hamburger-menu-btn' },
  bonusSummary: { selector: 'text', options: { name: ' Bonus Summary' } },
  transactionsHistory: { selector: 'text', options: { name: 'Transaction History' } },
  myCoupons: { selector: 'text', options: { name: 'My Coupons' } },
  betInfluencer: { selector: 'text', options: { name: 'Bet Influencer' } },
  promoVouchers: { selector: 'text', options: { name: 'Promo Voucher' } },
  updateDetails: { selector: 'text', options: { name: 'Update Details' } },
  responsibleGaming: { selector: '#Responsible\\ Gaming-hamburger-menu-btn' },
  documentVerification: { selector: 'text', options: { name: 'Document Verification' } },
  betwayBenefits: { selector: '#Betway\\ Benefits-hamburger-menu-btn' },
  betwayRewards: { selector: '#Betway\\ Rewards-hamburger-menu-btn' },
  changePassword: { selector: '#Change\\ password-hamburger-menu-btn' },
  logOut: { selector: '#Log\\ out-hamburger-menu-btn' },

  closeMyAccountOptions: { selector: '#modal-close-btn', nth: 0 },

  accountsButton: { selector: 'img[alt="Profile picture"]' },
  balanceField: { selector: 'text', options: { name: 'Balance' } },
  balanceValue: { selector: '.balance-amount' },

  freebetField: { text: 'Freebet' },
  freebetAmount: { selector: '.freebet-amount' },
  freebetCurrency: { selector: 'text', options: { name: 'R' } },
  freeBetRefreshBtn: {
    selector: (page: import('@playwright/test').Page) =>
      page.locator('div').filter({ hasText: /^Freebet/ }).locator('svg').first(),
  },

  casinoBonusField: { selector: 'text', options: { name: 'Casino Bonus' } },
  casinoBonusAmount: { selector: 'text', options: { name: 'Casino Bonus' }, nth: 1 },
  casinoCurrency: { selector: 'text', options: { name: 'R' } },
  casinoRefreshBtn: {
    selector: (page: import('@playwright/test').Page) =>
      page.locator('div').filter({ hasText: /^Casino/ }).locator('svg').first(),
  },

  depositButton: { selector: 'button', options: { name: 'Deposit' } },
  notificationIcon: {selector: 'role=banner >> role=img',nth: 4},
  liveChatIcon: { selector: 'a[href="/sport/soccer?livechat=true"] svg'},
};