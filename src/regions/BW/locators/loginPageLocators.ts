const userData = require('../json-data/userData.json');
export const loginLocators = {
  mobileInput: { selector: 'textbox', options: { name: 'Mobile Number' }, nth: 0 },
  passwordInput: { selector: 'textbox', options: { name: 'Password' }, nth: 0 },
  formMobileInput: { selector: 'textbox', options: { name: 'Mobile Number' }, nth: 1 },
  formPasswordInput: { selector: 'textbox', options: { name: 'Password' }, nth: 1 },
  loginButton: '#login-btn',
  loginButtonFromPopup: { selector: 'button', options: { name: 'Login' }, nth: 1 },
  loginButtonfromHeader: { selector: 'button', options: { name: 'Login' }, nth: 1 },
  signUpButton: '#sign-up-btn',
  signUpButtonfromHamburger: { selector: 'button', options: { name: 'Sign Up' }, nth: 1 },
  hamburgerMenu: '#header-hamburger-btn',
  SportButton:{selector:'text', options: { name: 'Sport' },nth:0},
  CasinoButton:{selector:'text', options: { name: 'Casino' },nth:0},
  welcomeUser: { selector: 'text', options: { name: 'Welcome' },nth: 0 },
  username : { selector: 'text', options: { name: `${userData.user1.username}` }, nth: 0 },
  betInfluencer : {selector: 'text', options: { name: 'Bet Influencer' },nth: 0}
};