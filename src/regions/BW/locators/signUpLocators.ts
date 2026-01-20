import { Page, Locator } from '@playwright/test';

export class SignUpLocators {
    readonly page: Page;

    // Basic form inputs
    readonly mobileInput: Locator;
    readonly passwordInput: Locator;
    readonly firstNameInput: Locator;
    readonly lastNameInput: Locator;

    // Navigation buttons
    readonly loginButton: Locator;
    readonly signUpButton: Locator;
    readonly sportButton: Locator;
    readonly casinoButton: Locator;
    readonly nextButton: Locator;
    readonly previousButton: Locator;
    readonly registerButton: Locator;

    // Hamburger menu elements
    readonly hamburgerMenu: Locator;
    readonly hamburgerSignupBtn: Locator;

    // ID Document elements
    readonly idDropdown: Locator;
    readonly saIdOption: Locator;
    readonly passportOption: Locator;
    readonly saIdInput: Locator;
    readonly passportInput: Locator;

    // Date of Birth elements
    readonly dobDropdown: Locator;

    // Code/Referral elements
    readonly signupCodeToggle: Locator;
    readonly voucherCodeField: Locator;
    readonly referralCodeField: Locator;

    // Checkboxes
    readonly agreeToAllCheckbox: Locator;

    // Other elements
    readonly diallingCode: Locator;
    readonly signUpPageTitle: Locator;
    readonly forms: Locator;

    // Modal close elements
    readonly modalCloseBtn: Locator;
    readonly modalBackdrop: Locator;

    constructor(page: Page) {
        this.page = page;

        // Basic form inputs
        this.mobileInput = page.getByRole('textbox', { name: 'Mobile Number' }).nth(1);
        this.passwordInput = page.getByRole('textbox', { name: 'Password' }).nth(1);
        this.firstNameInput = page.getByRole('textbox', { name: 'First Name' });
        this.lastNameInput = page.getByRole('textbox', { name: 'Surname' });

        // Navigation buttons
        this.loginButton = page.getByRole('button', { name: 'Login' });
        this.signUpButton = page.getByRole('button', { name: 'Sign Up' }).first();
        this.sportButton = page.getByRole('button', { name: 'Sport' });
        this.casinoButton = page.getByRole('button', { name: 'Casino' });
        this.nextButton = page.getByRole('button', { name: 'Next' });
        this.previousButton = page.getByRole('button', { name: 'Previous' });
        this.registerButton = page.getByRole('button', { name: 'Register' });

        // Hamburger menu elements
        this.hamburgerMenu = page.locator('#header-hamburger-btn');
        this.hamburgerSignupBtn = page.getByRole('button', { name: 'Sign Up' }).nth(1);

        // ID Document elements
        this.idDropdown = page.getByRole('combobox', { name: 'South African ID' }).locator('div');
        this.saIdOption = page.getByRole('option', { name: 'South African ID' }).locator('div');
        this.passportOption = page.getByText('Passport');
        this.saIdInput = page.getByRole('textbox', { name: 'South African ID' });
        this.passportInput = page.getByRole('textbox', { name: 'Passport' });

        // Date of Birth elements
        this.dobDropdown = page.getByRole('combobox', { name: 'Date of Birth' });

        // Code/Referral elements
        this.signupCodeToggle = page.getByText('I have a signup code');
        this.voucherCodeField = page.getByRole('textbox', { name: 'Voucher Code' });
        this.referralCodeField = page.getByRole('textbox', { name: 'Referral Code' });

        // Checkboxes
        this.agreeToAllCheckbox = page.getByLabel('Agree to All', { exact: false }).first();

        // Other elements
        this.diallingCode = page.getByText('+27').nth(1);
        this.signUpPageTitle = page.getByText('Sign Up').first();
        this.forms = page.getByRole('form').first();

        // Modal close elements
        this.modalCloseBtn = page.locator('#modal-close-btn');
        this.modalBackdrop = page.locator('.modal-backdrop, .overlay, [class*="backdrop"]').first();
    }

    // Dynamic locators that might change based on context
    getCloseButtonSelectors(): string[] {
        return [
            '#modal-close-btn',
            '.modal-close',
            '[data-testid="close"]',
            '[aria-label="Close"]',
            'button[class*="close"]',
            '.close',
            '[data-dismiss="modal"]'
        ];
    }

    getModalSelectors(): string[] {
        return [
            '.modal',
            '[role="dialog"]',
            '[data-testid*="modal"]',
            '[class*="modal"]'
        ];
    }

    getBackdropSelectors(): string[] {
        return [
            '.modal-backdrop',
            '.backdrop',
            '.overlay',
            '[class*="backdrop"]'
        ];
    }

    // Method to get sign-up code field with flexible naming
    getSignUpCodeField(): Locator {
        return this.page.getByRole('textbox', { name: /sign.?up.?code|signup.?code|referral.?code/i }).first();
    }

    // Method to get ID number field with flexible naming
    getIdNumberField(): Locator {
        return this.page.getByRole('textbox', { name: /ID Number|IDNumber/i }).first();
    }

    // Method to get dialling code with multiple options
    getDiallingCodeOptions(): Locator {
        return this.page.getByText('+27');
    }
}