import { Page, Locator } from '@playwright/test';
import { SignUpPage } from '../pages/SignUpPage';

export class SignupUtils {
    readonly page: Page;
    readonly signupPage: SignUpPage;

    constructor(page: Page) {
        this.page = page;
        this.signupPage = new SignUpPage(page);
    }

    // Helper function to clear all highlights - EXACT original logic
    async clearHighlights() {
        await this.page.evaluate(() => {
            const elements = document.querySelectorAll('*');
            elements.forEach(el => {
                const element = el as HTMLElement;
                element.style.outline = '';
                element.style.backgroundColor = '';
            });
        });
    }

    // Helper function to highlight element - EXACT original logic
    async highlightElement(locator: Locator) {
        await locator.evaluate((el: HTMLElement) => {
            el.style.outline = '4px solid red';
            el.style.backgroundColor = 'rgba(255,255,0,0.3)';
        });
    }

    // Enhanced modal cleanup function that handles multi-step forms - EXACT original logic
    async resetModalState() {
        try {
            // Method 0: If we're on step 2 of the form, go back to step 1 first
            try {
                const previousButton = this.page.getByRole('button', { name: 'Previous' });
                if (await previousButton.isVisible({ timeout: 1000 })) {
                    await previousButton.click();
                    await this.page.waitForTimeout(500);
                }
            } catch (e) {
                // Previous button not found, continue with other methods
            }

            // Method 1: Try all possible close button selectors
            const closeSelectors = [
                '#modal-close-btn',
                '.modal-close',
                '[data-testid="close"]',
                '[aria-label="Close"]',
                'button[class*="close"]',
                '.close',
                '[data-dismiss="modal"]'
            ];

            for (const selector of closeSelectors) {
                const elements = await this.page.locator(selector);
                const count = await elements.count();
                for (let i = 0; i < count; i++) {
                    try {
                        if (await elements.nth(i).isVisible()) {
                            await elements.nth(i).click();
                            await this.page.waitForTimeout(200);
                        }
                    } catch (e) {
                        // Continue to next element
                    }
                }
            }

            // Method 2: Press Escape multiple times
            await this.page.keyboard.press('Escape');
            await this.page.waitForTimeout(100);
            await this.page.keyboard.press('Escape');
            await this.page.waitForTimeout(100);

            // Method 3: Click on backdrop/overlay to close modal
            try {
                const backdrop = this.page.locator('.modal-backdrop, .overlay, [class*="backdrop"]').first();
                if (await backdrop.isVisible()) {
                    await backdrop.click();
                    await this.page.waitForTimeout(200);
                }
            } catch (e) {
                // Ignore if backdrop not found
            }

            // Method 4: Direct DOM manipulation to remove modals
            await this.page.evaluate(() => {
                // Remove modal elements
                const modals = document.querySelectorAll(
                    '.modal, [role="dialog"], [data-testid*="modal"], [class*="modal"]'
                );
                modals.forEach(modal => {
                    if (modal instanceof HTMLElement) {
                        modal.style.display = 'none';
                        modal.classList.remove('show', 'active', 'open');
                    }
                });

                // Remove backdrop elements
                const backdrops = document.querySelectorAll(
                    '.modal-backdrop, .backdrop, .overlay, [class*="backdrop"]'
                );
                backdrops.forEach(backdrop => backdrop.remove());

                // Reset body styles that might be applied when modal is open
                document.body.classList.remove('modal-open');
                document.body.style.overflow = '';
                document.body.style.paddingRight = '';
            });

            // Method 5: Clear any potential focus traps
            await this.page.evaluate(() => {
                const activeElement = document.activeElement as HTMLElement;
                if (activeElement) {
                    activeElement.blur();
                }
            });

            await this.page.waitForTimeout(300);
        } catch (error) {
            if (error && typeof error === 'object' && 'message' in error) {
                console.log('Modal reset error (non-fatal):', (error as { message: string }).message);
            } else {
                console.log('Modal reset error (non-fatal):', error);
            }
        }
    }

    // Function to ensure clean signup modal opening - EXACT original logic
    async ensureCleanSignupOpen() {
        // First reset any existing modal state
        await this.resetModalState();

        // Click signup button using the fixed POM method
        await this.signupPage.clickSignUp();

        // Wait a bit more for modal to fully load
        await this.page.waitForTimeout(500);

        // Verify signup form is actually loaded
        try {
            await this.page.waitForSelector('form', { timeout: 5000 });
        } catch (e) {
            // If form not found, try clicking signup again
            console.log('Signup form not found, retrying...');
            await this.resetModalState();
            await this.page.waitForTimeout(500);
            await this.signupPage.clickSignUp();
            await this.page.waitForTimeout(1000);
        }
    }

    // Function specifically for multi-step form reset (for tests that click Next) - EXACT original logic
    async resetMultiStepForm() {
        try {
            // First try to go back to step 1 if we're on step 2
            const previousButton = this.page.getByRole('button', { name: 'Previous' });
            if (await previousButton.isVisible({ timeout: 2000 })) {
                console.log('Found Previous button, going back to step 1...');
                await previousButton.click();
                await this.page.waitForTimeout(1000);

                // Clear the form fields on step 1
                try {
                    await this.signupPage.locators.mobileInput.clear();
                    await this.signupPage.locators.passwordInput.clear();
                    await this.signupPage.locators.firstNameInput.clear();
                    await this.signupPage.locators.lastNameInput.clear();
                } catch (e) {
                    console.log('Could not clear form fields');
                }
            }

            // Then proceed with normal modal reset
            await this.resetModalState();
        } catch (error) {
            if (error && typeof error === 'object' && 'message' in error) {
                console.log('Multi-step form reset error:', (error as { message: string }).message);
            } else {
                console.log('Multi-step form reset error:', error);
            }
            // Fallback to normal reset
            await this.resetModalState();
        }
    }

    // Function to ensure clean signup open via hamburger menu - EXACT original logic
    async ensureCleanHamburgerSignupOpen() {
        // First reset any existing modal state
        await this.resetModalState();

        // Click hamburger menu
        const hamburgerMenu = this.page.locator('#header-hamburger-btn');
        await hamburgerMenu.click();
        await this.page.waitForTimeout(500);

        // Click signup button in hamburger menu (nth(1) as specified)
        const hamburgerSignupBtn = this.page.getByRole('button', { name: 'Sign Up' }).nth(1);
        await hamburgerSignupBtn.click();

        // Wait for modal to fully load
        await this.page.waitForTimeout(1000);

        // Verify signup form is actually loaded
        try {
            await this.page.waitForSelector('form', { timeout: 5000 });
        } catch (e) {
            // If form not found, try clicking signup again
            console.log('Signup form not found, retrying hamburger menu...');
            await this.resetModalState();
            await this.page.waitForTimeout(500);
            await hamburgerMenu.click();
            await this.page.waitForTimeout(500);
            await hamburgerSignupBtn.click();
            await this.page.waitForTimeout(1000);
        }
    }

    // Helper method to determine test type and use appropriate reset
    async performTestReset(testName: string) {
        // For tests that involve multi-step forms (T5, T7), use multi-step reset
        if (testName.includes('T5-') || testName.includes('T7-')) {
            await this.resetMultiStepForm();
        } else {
            // For other tests, use regular reset
            await this.resetModalState();
        }
    }

    // Helper method for going back to step 1 (used in T5, T7)
    async goBackToStepOne() {
        try {
            const previousButton = this.page.getByRole('button', { name: 'Previous' });
            if (await previousButton.isVisible({ timeout: 1000 })) {
                await previousButton.click();
                await this.page.waitForTimeout(500);
            }
        } catch (e) {
            console.log('Previous button not found');
        }
    }

    // Helper method to fill basic form and proceed to step 2
    async fillBasicFormAndProceed(mobile = '999881234', password = '123456789', firstName = 'Test', lastName = 'User') {
        await this.signupPage.locators.mobileInput.fill(mobile);
        await this.signupPage.locators.passwordInput.fill(password);
        await this.signupPage.locators.firstNameInput.fill(firstName);
        await this.signupPage.locators.lastNameInput.fill(lastName);

        const nextButton = this.page.getByRole('button', { name: 'Next' });
        await nextButton.click();
        await this.page.waitForTimeout(1000);
    }

    // Helper method to handle "Agree to All" checkbox
    async handleAgreeToAll() {
        try {
            const agreeToAll = this.page.getByLabel('Agree to All', { exact: false }).first();
            if (await agreeToAll.isVisible({ timeout: 5000 })) {
                await agreeToAll.click();
            }
        } catch (error) {
            console.log('Agree to All checkbox not found or not clickable');
        }
    }

    // Helper method to fill ID number field
    async fillIdNumber(idNumber: string) {
        try {
            const idNumberField = this.page.getByRole('textbox', { name: /ID Number|IDNumber/i }).first();
            await idNumberField.waitFor({ state: 'visible', timeout: 5000 });
            await idNumberField.fill(idNumber);
        } catch (error) {
            console.log('ID Number field not found');
        }
    }
}