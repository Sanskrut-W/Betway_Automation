import { selectors } from "@playwright/test";
import { version } from "os";

const userData = require('../json-data/userData.json');
export const homepageLocators = {
    howtobet: { selector: 'link', options: { name: 'How to Bet' }, nth: 1 },
    FAQs: { selector: 'link', options: { name: 'Frequently asked questions' }, nth: 0 },
    TermsAndConditions: { selector: 'text', options: { name: 'Terms & Conditions' }, nth: 0 },
    BettingRules: { selector: 'link', options: { name: 'Betting Rules' }, nth: 0 },
    BetwayApp: { selector: 'link', options: { name: 'Betway App' }, nth: 1},
    AffiliateProgram: { selector: 'link', options: { name: 'Affiliate Program' }, nth: 0 },
    ResponsibleGaming: { selector: 'text', options: { name: 'Responsible Gaming' }, nth: 0 },
    PrivacyPolicy: { selector: 'text', options: { name: 'Privacy Policy' }, nth: 0 },
    Sponsorships: { selector: 'text', options: { name: 'Sponsorship' }, nth: 0 },
    ContactUs: {selector: 'link',options: { name: 'Contact Us'},nth: 0},
    betwayLogo: { selector: 'img[alt="Betway Logo"]' },
    footer: { selector: 'footer' },
    arsenalLogo: { selector: 'img[alt="Arsenal Logo"]' },
    currentTime: { selector: 'text', options: { name: 'Current time'} },
    version: { selector: 'text', options: { name: `Version` }, nth: 0 },
    downloadBetwayApp:{selector : 'text', options: { name: 'Scan the QR code' }, nth: 0},
    appleLogo: { selector: 'img[alt="apple-logo"]' },
    linkToSocials: { selector: 'a[href="https://x.com/betway"]' },

}
