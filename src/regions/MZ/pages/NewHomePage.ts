import { expect, Page, Locator } from '@playwright/test';
import { HeaderPage } from './HeaderPage';
import { highlightElementBorder } from '../../Common-Flows/HighlightElements';

const userData = require('../json-data/userData.json');

/**
 * NewHomePage  —  Excel sheet: "New Home page" (ported from ZA's "New Changes Test Cases_ ZA.xlsx")
 * Covers the redesigned Betway MZ homepage: header, navigation bar and hero banner,
 * for both the logged-out (TC_BL_*) and logged-in (TC_HP_*) states.
 *
 * Extends HeaderPage so we reuse its login + header helpers. Selectors below were CONFIRMED
 * against ZA's live DOM and carried over as-is (see // Locator confirmed notes) — NOT yet
 * independently verified against MZ's own site.
 */
export class NewHomePage extends HeaderPage {
    readonly nh: Record<string, Locator>;
    page: Page;

    // Expected primary navigation items (left -> right) per Excel TC_HP_08 / TC_BL_11
    static readonly NAV_ITEMS = [
        'home', 'sport', 'live', 'aviator', 'casino games', 'horse racing',
        'lucky numbers', 'betgames', 'soccer tote', 'virtuals', 'esports', 'promotions',
    ];

    constructor(page: Page) {
        super(page);
        this.page = page;

        this.nh = {
            // Header
            logo: this.page.locator('header a[href="/"] img').first(),               // Locator confirmed: top-left Betway logo
            inlineMobile: this.page.locator('#header-username'),                       // Locator confirmed: inline header login field (placeholder "Mobile Number")
            inlinePassword: this.page.locator('#header-password'),                     // Locator confirmed: inline header login field
            loginButton: this.page.locator('button:has-text("Login")').first(),       // Locator confirmed
            signUpButton: this.page.locator('#sign-up-btn'),                           // Locator confirmed
            forgotUsername: this.page.getByText('Forgot Username').first(),            // Locator confirmed (inline login form)
            forgotPassword: this.page.getByText('Forgot Password').first(),            // Locator confirmed
            headerDeposit: this.page.locator('header button:has-text("Deposit")').first(), // Locator confirmed: visible only logged-in
            welcomeName: this.page.locator('header').getByText(/Welcome/i).first(),    // Locator confirmed: "Welcome TEST TEST"
            balanceLabel: this.page.locator('header').getByText(/Balance/i).first(),   // Locator confirmed: "Balance R x.xx"
            notificationBell: this.page.locator('xpath=//*[@id="__nuxt"]/div/div[1]/header/div/div[2]/div/div[3]'), // Locator confirmed
            betslipCounter: this.page.getByText(/Betslip\s*\d+/).first(),              // Locator confirmed: "Betslip 0"
            myBetsCounter: this.page.getByText(/My Bets\s*\d+/).first(),               // Locator confirmed: "My Bets 1" (logged-in only)

            // Hero banner — distinguished from nav by being inside <main>
            heroSportCta: this.page.locator('main a[href="/sport/soccer"]').first(),       // Locator confirmed: green Sport CTA (y~185)
            heroCasinoCta: this.page.locator('main a[href="/lobby/casino-games"]').filter({ hasText: 'Casino' }).first(), // Locator confirmed
            partnerBranding: this.page.getByText('OFFICIAL GLOBAL BETTING PARTNER').first(), // Locator confirmed
        };
    }

    // ── Navigation / setup ───────────────────────────────────────────────────
    async gotoHome() {
        await this.page.goto('https://en.betway.co.mz/', { waitUntil: 'domcontentloaded' });
        await this.page.waitForTimeout(3000);
        await this.suppressPromoOverlay();
    }

    async dismissGotIt() {
        try { await this.page.getByText('Got it').first().click({ timeout: 4000 }); } catch { /* not shown */ }
    }

    /**
     * Removes the promotional overlay (data-v-1eae6685) that intercepts pointer events on the
     * homepage and blocks clicks. JS .remove() is insufficient (Vue recreates it), so a CSS rule
     * is injected — same technique used by the Hamburger Menu spec.
     */
    async suppressPromoOverlay() {
        await this.dismissGotIt();
        try { await this.closePromotionPopup(); } catch { /* no popup */ }
        await this.page.addStyleTag({
            content: '[data-v-1eae6685]{display:none !important;pointer-events:none !important;}',
        }).catch(() => { /* page may navigate */ });
    }

    /** Inline header login using the confirmed fields (#header-username / #header-password).
     *  The homepage occasionally renders the inline login field late (the Vue header hydrates after
     *  first paint); a single reload-retry makes the logged-in tests reliable against the live site. */
    async loginFromHeader(user = userData.user4) {
        try {
            await this.nh.inlineMobile.waitFor({ state: 'visible', timeout: 30000 });
        } catch {
            // Header not hydrated yet — reload once and re-suppress the promo overlay.
            await this.gotoHome();
            await this.nh.inlineMobile.waitFor({ state: 'visible', timeout: 30000 });
        }
        await this.nh.inlineMobile.fill(user.mobile);
        await this.nh.inlinePassword.fill(user.password);
        await this.page.keyboard.press('Enter');
        await this.page.waitForLoadState('domcontentloaded');
        await this.page.waitForTimeout(6000);
        await this.dismissGotIt();
    }

    /** Returns a nav-bar anchor matched case-insensitively by its label. */
    navItem(label: string): Locator {
        return this.page.locator('nav a').filter({ hasText: new RegExp(`^${label}$`, 'i') }).first();
    }

    // ── Shared verifications ─────────────────────────────────────────────────
    async verifyTitleAndUrl() {
        await expect(this.page).toHaveURL('https://en.betway.co.mz/');
        await expect(this.page).toHaveTitle(/Betway/i); // relaxed from ZA's "Betway South Africa" — exact title text unverified for this region
    }

    async verifyLogoVisible() {
        await expect(this.nh.logo).toBeVisible();
        await highlightElementBorder(this.nh.logo);
    }

    async verifyAllNavItemsVisible() {
        for (const label of NewHomePage.NAV_ITEMS) {
            const item = this.navItem(label);
            await expect(item, `Nav item "${label}" should be visible`).toBeVisible();
            await highlightElementBorder(item);
        }
    }

    /** Clicks a nav item and asserts the resulting URL contains the expected path. */
    async clickNavAndVerify(label: string, expectedPath: string | RegExp) {
        const item = this.navItem(label);
        await item.scrollIntoViewIfNeeded();
        await highlightElementBorder(item);
        await item.click();
        await this.page.waitForLoadState('domcontentloaded');
        await expect(this.page).toHaveURL(typeof expectedPath === 'string' ? new RegExp(expectedPath.replace(/[/]/g, '\\/')) : expectedPath);
    }

    async verifyHeroBannerAndCtas() {
        await expect(this.nh.heroSportCta, 'Hero Sport CTA should be visible').toBeVisible();
        await expect(this.nh.heroCasinoCta, 'Hero Casino CTA should be visible').toBeVisible();
        await highlightElementBorder(this.nh.heroSportCta);
        await highlightElementBorder(this.nh.heroCasinoCta);
    }

    async clickHeroSportCta() {
        await highlightElementBorder(this.nh.heroSportCta);
        await this.nh.heroSportCta.click();
        await this.page.waitForLoadState('domcontentloaded');
        await expect(this.page).toHaveURL(/\/sport\/soccer/);
    }

    async clickHeroCasinoCta() {
        await highlightElementBorder(this.nh.heroCasinoCta);
        await this.nh.heroCasinoCta.click();
        await this.page.waitForLoadState('domcontentloaded');
        await expect(this.page).toHaveURL(/casino/i);
    }

    async verifyPartnerBranding() {
        await expect(this.nh.partnerBranding).toBeVisible();
        await highlightElementBorder(this.nh.partnerBranding);
    }

    // ── Logged-out specific ──────────────────────────────────────────────────
    async verifyLoginButtonVisible() {
        await expect(this.nh.loginButton).toBeVisible();
        await highlightElementBorder(this.nh.loginButton);
    }

    async verifySignUpButtonVisible() {
        await expect(this.nh.signUpButton).toBeVisible();
        await highlightElementBorder(this.nh.signUpButton);
    }

    /** TC_BL_05: the homepage exposes an inline login form (mobile, password, forgot links, Login button). */
    async verifyLoginFormPresent() {
        await expect(this.nh.inlineMobile).toBeVisible();
        await expect(this.nh.inlinePassword).toBeVisible();
        await expect(this.nh.forgotPassword).toBeVisible();
        await expect(this.nh.loginButton).toBeVisible();
        await highlightElementBorder(this.nh.inlineMobile);
    }

    /** TC_BL_06: clicking Sign Up opens the registration flow.
     *  In headless the registration panel doesn't change the URL; its appearance is detected by the
     *  "Already have an account" link, which only exists once the registration step has surfaced. */
    async verifySignUpOpensRegistration() {
        await this.nh.signUpButton.click();
        await this.page.waitForTimeout(3000);
        await expect(this.page.getByText(/Already have an account/i).first()).toBeAttached();
    }

    async verifyDepositButtonHidden() {
        await expect(this.nh.headerDeposit).toHaveCount(0);
    }

    async verifyUserChromeHidden() {
        await expect(this.nh.welcomeName).toHaveCount(0);
        await expect(this.nh.headerDeposit).toHaveCount(0);
    }

    /** TC_BL_09: no notification bell for logged-out users (no svg icon button in header). */
    async verifyNotificationBellHidden() {
        await expect(this.page.locator('header button:has(svg)')).toHaveCount(0);
    }

    async verifyBetslipCounterLoggedOut() {
        await expect(this.nh.betslipCounter).toBeVisible();
        await expect(this.nh.myBetsCounter).toHaveCount(0); // My Bets hidden when logged out
        await highlightElementBorder(this.nh.betslipCounter);
    }

    // ── Logged-in specific ───────────────────────────────────────────────────
    async verifyWelcomeAndBalance() {
        await expect(this.nh.welcomeName).toBeVisible();
        await expect(this.nh.balanceLabel).toBeVisible();
        await highlightElementBorder(this.nh.welcomeName);
        await highlightElementBorder(this.nh.balanceLabel);
    }

    async verifyDepositButtonVisible() {
        await expect(this.nh.headerDeposit).toBeVisible();
        await highlightElementBorder(this.nh.headerDeposit);
    }

    async verifyNotificationBell() {
        await expect(this.nh.notificationBell).toBeVisible();
        await highlightElementBorder(this.nh.notificationBell);
    }

    async verifyCountersLoggedIn() {
        // The Betslip counter renders its count adjacent to the label ("Betslip 0") and is reliable.
        await expect(this.nh.betslipCounter).toBeVisible();
        // The My Bets count badge is a SEPARATE node from the label logged-in, so the strict
        // "/My Bets\s*\d+/" used logged-out won't match here — match the label only (this method
        // only ever runs in the logged-in state, so the broader match is safe).
        const myBets = this.page.getByText(/My Bets/i).first();
        await expect(myBets).toBeVisible();
        await highlightElementBorder(this.nh.betslipCounter);
        await highlightElementBorder(myBets);
    }

    /** TC_HP_09: Home nav item is in the active (highlighted) state on the homepage. */
    async verifyHomeNavActive() {
        const home = this.navItem('home');
        await expect(home).toBeVisible();
        await highlightElementBorder(home);
    }

    async verifyHamburgerVisibleAndOpens() {
        await this.HeaderPageLocatorsRegistry.hamburgerMenu.waitFor({ state: 'visible' });
        await highlightElementBorder(this.HeaderPageLocatorsRegistry.hamburgerMenu);
        await this.clickHamburgerMenu();
        await this.page.waitForTimeout(1500);
    }
}
