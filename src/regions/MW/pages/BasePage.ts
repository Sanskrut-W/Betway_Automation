import { Page, Locator } from '@playwright/test';

const userData = require('../json-data/userData.json');

/**
 * Shared base for every MW page object.
 * Owns the flows that are identical site-wide:
 *  - goto(path)  : baseURL-relative navigation + promotion-popup dismissal
 *  - Login(user) : header login form + promotion-popup dismissal
 *
 * The promotion popup ("Bet Now" toast with #modal-close-btn) appears ONCE,
 * shortly after landing (and can reappear right after login). It is closed
 * only at those two points. It must NOT be auto-closed later, because other
 * modals in the test flow (booking code, share, etc.) reuse the same
 * #modal-close-btn and are asserted/used by the tests themselves.
 *
 * The login form locators are hardcoded here because the header login form
 * is the same on every page of the site. Move them to config later when
 * genericizing across regions.
 */
export class BasePage {
    page: Page;
    protected readonly baseLoginLocators: {
        mobileNumber: Locator;
        password: Locator;
    };

    constructor(page: Page) {
        this.page = page;
        this.baseLoginLocators = {
            mobileNumber: page.getByRole('textbox', { name: 'Mobile Number' }).first(),
            password: page.getByRole('textbox', { name: 'Enter Password' }).first(),
        };
    }

    /**
     * Wait for the promotion popup to appear and close it.
     * No-op if it does not show within the timeout.
     */
    protected async closePromotionPopupIfVisible(timeout: number = 10000) {
        const closeBtn = this.page.locator('#modal-close-btn').filter({ visible: true }).first();
        try {
            await closeBtn.waitFor({ state: 'visible', timeout });
            await closeBtn.click({ timeout: 3000 });
        } catch {
            // Popup did not appear → ignore
        }
    }

    async goto(path: string = '/sport/soccer') {
        await this.page.goto(path, { waitUntil: 'domcontentloaded' });

        // The promotion popup shows once, shortly after landing — wait for it and close it
        await this.closePromotionPopupIfVisible();
    }

    async Login(user: { mobile: string; password: string } = userData.user4) {
        await this.baseLoginLocators.mobileNumber.fill(user.mobile);
        await this.baseLoginLocators.password.fill(user.password);
        await this.page.keyboard.press('Enter');

        // The popup can also show right after logging in
        await this.closePromotionPopupIfVisible(9000);

        await this.page.waitForLoadState('domcontentloaded');
    }

    /** Alias — some specs call the lowercase variant. */
    async login(user?: { mobile: string; password: string }) {
        await this.Login(user);
    }
}
