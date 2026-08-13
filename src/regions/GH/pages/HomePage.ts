import { expect, Page } from '@playwright/test';
import { loadLocatorsFromExcel } from "../../../global/utils/file-utils/excelReader";
import { getLocator } from "../../../global/utils/file-utils/locatorResolver";
import { highlightElementBorder, highlightElements } from '../../Common-Flows/HighlightElements';
import { BasePage } from './BasePage';


// Was a remote GitHub raw-file download on every construction (HomePage is the base class for
// nearly every page object) — flaky under concurrent workers. The local shared workbook has an
// equivalent "HomePage" sheet.
const LOCATOR_URL = "src/global/utils/file-utils/locators(2).xlsx"

export class HomePage extends BasePage {

    readonly HomePagelocatorsRegistry: Record<string, import('@playwright/test').Locator>;

    footerLinksContainer: any;

    constructor(page: import('@playwright/test').Page) {
        super(page);
        const configs = loadLocatorsFromExcel(LOCATOR_URL, "HomePage");
        this.footerLinksContainer = getLocator(this.page, configs["ContactUs"]).locator('..');
        this.HomePagelocatorsRegistry = {
            ContactUs: this.page.locator('a[href="/contact-us"]').last(),
            howtobet: this.page.locator('a[href="/how-to-bet"]').last(),
            FAQs: this.page.locator('a[href="/frequently-asked-questions"]').last(),
            TermsAndConditions: this.page.locator('a[href="/terms-and-conditions"]').last(),
            BettingRules: this.page.locator('a[href="/betting-rules-and-tips"]').last(),
            BetwayApp: this.page.locator('a[href="/betway-app"]').last(),
            AffiliateProgram: this.page.locator('a[href="https://www.superpartnersafrica.com/"]').last(),
            ResponsibleGaming: this.page.locator('a[href="/responsible-gaming"]').last(),
            PrivacyPolicy: this.page.locator('a[href="/privacy-policy"]').last(),
            Sponsorships: this.page.locator('a[href="/sponsorship"]').last(),
            PlayAviator: this.page.locator('a[href="/aviator"]').last(),
            Sitemap: this.page.locator('a[href="/sitemap"]').last(),
            betwayLogo: getLocator(this.page, configs["betwayLogo"]),
            footer: getLocator(this.page, configs["footer"]),
            arsenalLogo: getLocator(this.page, configs["arsenalLogo"]),
            currentTime: getLocator(this.page, configs["currentTime"]),
            downloadBetwayApp: getLocator(this.page, configs["downloadBetwayApp"]),
            appleLogo: getLocator(this.page, configs["appleLogo"]),
            linkToSocials: getLocator(this.page, configs["linkToSocials"]),
            version: getLocator(this.page, configs["version"])
        };
    }

    // Verification Methods
    async verifyFooter() {
        await this.HomePagelocatorsRegistry.footer.waitFor({ state: 'visible', timeout: 15000 });
        await highlightElements(this.HomePagelocatorsRegistry.footer);
    }

    async verifyFooterBetwayLogo() {
        await this.HomePagelocatorsRegistry.betwayLogo.waitFor({ state: 'visible', timeout: 15000 })
        await highlightElements(this.HomePagelocatorsRegistry.betwayLogo);
    }

    async verifyArsenalLogo() {
        await this.HomePagelocatorsRegistry.arsenalLogo.waitFor({ state: 'visible', timeout: 15000 })
        await highlightElements(this.HomePagelocatorsRegistry.arsenalLogo.locator('..').locator('..'));
    }

    async verifyPrivacyPolicyLink() {
        await this.HomePagelocatorsRegistry.PrivacyPolicy.waitFor({ state: 'visible', timeout: 15000 })
        await highlightElements(this.HomePagelocatorsRegistry.PrivacyPolicy);
    }

    async verifyContactUsink() {
        await this.HomePagelocatorsRegistry.ContactUs.waitFor({ state: 'visible', timeout: 15000 })
        await highlightElements(this.HomePagelocatorsRegistry.ContactUs);
    }

    async verifyFAQLink() {
        await this.HomePagelocatorsRegistry.FAQs.waitFor({ state: 'visible', timeout: 15000 })
        await highlightElements(this.HomePagelocatorsRegistry.FAQs)
    }

    async verifyCurrentTime() {
        await this.HomePagelocatorsRegistry.currentTime.waitFor({ state: 'visible', timeout: 15000 })
        await highlightElements(this.HomePagelocatorsRegistry.currentTime)
    }

    async verifyResponsibleGamingLink() {
        await this.HomePagelocatorsRegistry.ResponsibleGaming.waitFor({ state: 'visible', timeout: 10000 })
        await highlightElements(this.HomePagelocatorsRegistry.ResponsibleGaming);
    }

    async verifyTermsAndConditions() {
        await this.HomePagelocatorsRegistry.TermsAndConditions.waitFor({ state: 'visible', timeout: 10000 });
        await highlightElements(this.HomePagelocatorsRegistry.TermsAndConditions);
    }
    async verifyAffiliateProgram() {
        await this.HomePagelocatorsRegistry.AffiliateProgram.waitFor({ state: 'visible', timeout: 10000 });
        await highlightElements(this.HomePagelocatorsRegistry.AffiliateProgram);
    }

    async verifyVersion() {
        await this.HomePagelocatorsRegistry.version.waitFor({ state: 'visible', timeout: 10000 });
        await highlightElements(this.HomePagelocatorsRegistry.version)
    }

    async verifyBetwayQR() {
        await this.HomePagelocatorsRegistry.downloadBetwayApp.waitFor({ state: 'visible', timeout: 10000 });
        await highlightElements(this.HomePagelocatorsRegistry.downloadBetwayApp)
    }

    async verifyAppStoreLogo() {
        await this.HomePagelocatorsRegistry.appleLogo.waitFor({ state: 'visible', timeout: 10000 });
        await highlightElements(this.HomePagelocatorsRegistry.appleLogo)
    }

    async verifySocialMediaIcons() {
        await this.HomePagelocatorsRegistry.linkToSocials.waitFor({ state: 'visible', timeout: 10000 });
        await highlightElements(this.HomePagelocatorsRegistry.linkToSocials)
    }

    async verify18Logo() {
        const logos = await this.HomePagelocatorsRegistry.arsenalLogo.locator('..').locator('..');
        const eighteenplusLogo = logos.getByRole('link').last();
        await eighteenplusLogo.waitFor({ state: 'visible', timeout: 60000 })
        await highlightElements(eighteenplusLogo);
    }

    async verifyBettingRulesLink() {
        await this.HomePagelocatorsRegistry.BettingRules.waitFor({ state: "visible", timeout: 10000 });
        await highlightElements(this.HomePagelocatorsRegistry.BettingRules);
    }

    async verifyBetwayAppLink() {
        await this.HomePagelocatorsRegistry.BetwayApp.waitFor({ state: "visible", timeout: 10000 });
        await highlightElements(this.HomePagelocatorsRegistry.BetwayApp);
    }

    async verifyHowToLink() {
        await this.HomePagelocatorsRegistry.howtobet.waitFor({ state: "visible", timeout: 10000 });
        await highlightElements(this.HomePagelocatorsRegistry.howtobet);
    }

    async verifySponsorshipContent() {
        await highlightElementBorder(this.page.getByText('Arsenal').first());
        await highlightElementBorder(this.page.getByText('Brighton').first());
        await highlightElementBorder(this.page.getByText('Atletico Madrid').first());
        await highlightElementBorder(this.page.getByText('Manchester City').first());
        await highlightElementBorder(this.page.getByText('The Springboks').first());
        await highlightElementBorder(this.page.getByText('The Betway Premiership').first());
        await highlightElementBorder(this.page.getByText('Betway SA 2020 XX').first());
    }

    // Clicking Methods
    async clickFooterBetwayLogo() {
        await this.HomePagelocatorsRegistry.betwayLogo.waitFor({ state: 'visible', timeout: 10000 });
        await this.HomePagelocatorsRegistry.betwayLogo.click();
        await expect(this.page).toHaveURL('https://www.betway.com.gh/');
        await highlightElementBorder(this.HomePagelocatorsRegistry.betwayLogo);
    }

    async clickArsenalLogo() {
        await this.HomePagelocatorsRegistry.arsenalLogo.click({ force: true });
        await expect(this.page).toHaveURL(/.*sponsorship*/, { timeout: 15000 });
        await this.page.waitForLoadState('domcontentloaded');
        await highlightElementBorder(this.page.getByRole('heading', { name: 'Sponsorship' }));

    }

    async clickSponsorshipBackButton() {
        await highlightElementBorder(this.page.getByRole('heading', { name: 'Sponsorship' }).locator('..').locator('a').first());
        await this.page.getByRole('heading', { name: 'Sponsorship' }).locator('..').locator('a').first().click();
        await this.page.waitForLoadState('domcontentloaded');
        await expect(this.page).toHaveURL('https://www.betway.com.gh/', { timeout: 10000 });
    }

    async clickFooterPrivacyPolicy() {
        await this.HomePagelocatorsRegistry.PrivacyPolicy.click({ force: true });
        await this.page.waitForLoadState('domcontentloaded');
        await expect(this.page).toHaveURL(/.*privacy-policy.*/, { timeout: 15000 });
        await highlightElementBorder(this.page.getByRole('heading', { name: 'Privacy Policy' }));
    }

    async clickPrivacyPolicyBackButton() {
        await highlightElementBorder(this.page.getByRole('heading', { name: 'Privacy Policy' }).locator('..').locator('a').first());
        await this.page.getByRole('heading', { name: 'Privacy Policy' }).locator('..').locator('a').first().click();
        await this.page.waitForLoadState('domcontentloaded');
        await expect(this.page).toHaveURL('https://www.betway.com.gh/', { timeout: 10000 });
    }

    async clickContactUsLink() {
        await this.HomePagelocatorsRegistry.ContactUs.click({ force: true });
        await this.page.waitForLoadState('domcontentloaded');
        await expect(this.page).toHaveURL(/.*contact-us*/, { timeout: 15000 });
        await highlightElementBorder(this.page.getByRole('heading', { name: 'Contact us - ' }));
    }

    async clickContactUsBackButton() {
        await highlightElementBorder(this.page.getByRole('heading', { name: 'Contact us - ' }).first().locator('..').locator('a').first());
        await this.page.getByRole('heading', { name: 'Contact us - ' }).first().locator('..').locator('a').first().click();
        await this.page.waitForLoadState('domcontentloaded');
        await expect(this.page).toHaveURL('https://www.betway.com.gh/', { timeout: 10000 });
    }

    async clickFAQsLink() {
        await this.HomePagelocatorsRegistry.FAQs.click({ force: true });
        await this.page.waitForLoadState('domcontentloaded');
        await expect(this.page).toHaveURL(/.*frequently-asked-questions*/, { timeout: 15000 });
        await highlightElementBorder(this.page.getByRole('heading', { name: "FAQ's" }));
    }

    async clickFAQSBackButton() {
        await highlightElementBorder(this.page.getByRole('heading', { name: "FAQ's" }).first().locator('..').locator('a').first());
        await this.page.getByRole('heading', { name: "FAQ's" }).first().locator('..').locator('a').first().click();
        await this.page.waitForLoadState('domcontentloaded');
        await expect(this.page).toHaveURL('https://www.betway.com.gh/', { timeout: 10000 });
    }

    async clickAnyFAQ() {
        await this.page.getByText('How do I register with Betway?').click();
        await highlightElementBorder(this.page.getByText('How do I register with Betway?').first());
        await this.page.waitForTimeout(2000);
    }

    async clickResponsibleGamingLink() {
        await this.HomePagelocatorsRegistry.ResponsibleGaming.click({ force: true });
        await expect(this.page).toHaveURL(/.*responsible-gaming*/i, { timeout: 15000 });
        await highlightElementBorder(this.page.getByRole('heading', { name: "Responsible Gaming" }).first());
        await this.page.waitForLoadState('domcontentloaded');
    }

    async clickResponsibleGamingBackButton() {
        await highlightElementBorder(this.page.getByRole('heading', { name: "Responsible Gaming" }).first().locator('..').locator('a').first());
        await this.page.getByRole('heading', { name: "Responsible Gaming" }).first().locator('..').locator('a').first().click();
        await this.page.waitForLoadState('domcontentloaded');
        await expect(this.page).toHaveURL('https://www.betway.com.gh/', { timeout: 10000 });
    }

    async clickTermsAndConditionsLink() {
        await this.HomePagelocatorsRegistry.TermsAndConditions.click({ force: true });
        await expect(this.page).toHaveURL(/.*terms-and-conditions*/, { timeout: 15000 });
        await highlightElementBorder(this.page.getByRole('heading', { name: "Terms and Conditions" }).first());
        await this.page.waitForLoadState('domcontentloaded');
    }

    async clickTermsAndConditionsBackButton() {
        await highlightElementBorder(this.page.getByRole('heading', { name: "Terms and Conditions" }).first().locator('..').locator('a').first());
        await this.page.getByRole('heading', { name: "Terms and Conditions" }).first().locator('..').locator('a').first().click();
        await this.page.waitForLoadState('domcontentloaded');
        await expect(this.page).toHaveURL('https://www.betway.com.gh/', { timeout: 10000 });
    }

    async clickAnyTermsAndConditions() {
        await this.page.getByRole('button', { name: "General" }).click();
        await highlightElementBorder(this.page.getByRole('button', { name: "General" }).first());
        await this.page.waitForTimeout(2000);
    }

    async clickAffiliateProgramLink() {
        await this.HomePagelocatorsRegistry.TermsAndConditions.click();
        await expect(this.page).toHaveURL(/.*terms-and-conditions*/, { timeout: 15000 });
        await highlightElementBorder(this.page.getByRole('heading', { name: "Terms and Conditions" }).first());
        await this.page.waitForLoadState('domcontentloaded');
    }

    async clickAffiliateProgramBackButton() {
        await highlightElementBorder(this.page.getByRole('heading', { name: "Terms and Conditions" }).first().locator('..').locator('a').first());
        await this.page.getByRole('heading', { name: "Terms and Conditions" }).first().locator('..').locator('a').first().click();
        await this.page.waitForLoadState('domcontentloaded');
        await expect(this.page).toHaveURL('https://www.betway.com.gh/', { timeout: 10000 });
    }

    async clickBettingRulesLink() {
        await this.HomePagelocatorsRegistry.BettingRules.click({ force: true });
        await expect(this.page).toHaveURL(/.*betting-rules-and-tips*/, { timeout: 15000 });
        await highlightElementBorder(this.page.getByRole('heading', { name: "Betting Rules and Tips" }).first());
        await this.page.waitForLoadState('domcontentloaded');
    }

    async clickBettingRulesBackButton() {
        await highlightElementBorder(this.page.getByRole('heading', { name: "Betting Rules and Tips" }).first().locator('..').locator('a').first());
        await this.page.getByRole('heading', { name: "Betting Rules and Tips" }).first().locator('..').locator('a').first().click();
        await this.page.waitForLoadState('domcontentloaded');
        await expect(this.page).toHaveURL('https://www.betway.com.gh/', { timeout: 10000 });
    }

    async clickBetwayAppLink() {
        await this.HomePagelocatorsRegistry.BetwayApp.click({ force: true });
        await expect(this.page).toHaveURL(/.*betway-app*/, { timeout: 15000 });
        await highlightElementBorder(this.page.getByRole('heading', { name: "Betway App" }).first());
        await this.page.waitForLoadState('domcontentloaded');
    }
    async clickBetwayAppBackButton() {
        await highlightElementBorder(this.page.getByRole('heading', { name: "Betway App" }).first().locator('..').locator('a').first());
        await this.page.getByRole('heading', { name: "Betway App" }).first().locator('..').locator('a').first().click();
        await this.page.waitForLoadState('domcontentloaded');
        await expect(this.page).toHaveURL('https://www.betway.com.gh/', { timeout: 10000 });
    }

    async clickHowToLink() {
        await this.HomePagelocatorsRegistry.howtobet.click({ force: true });
        await expect(this.page).toHaveURL(/.*how-to-bet*/, { timeout: 15000 });
        await this.page.waitForLoadState('domcontentloaded');
    }

    async verifyHowToLink() {
        await this.HomePagelocatorsRegistry.howtobet.waitFor({ state: 'visible', timeout: 10000 });
        await highlightElements(this.HomePagelocatorsRegistry.howtobet);
    }

    async verifySponsorshipLink() {
        await this.HomePagelocatorsRegistry.Sponsorships.waitFor({ state: 'visible', timeout: 10000 });
        await highlightElements(this.HomePagelocatorsRegistry.Sponsorships);
    }

    async clickSponsorshipFooterLink() {
        await this.HomePagelocatorsRegistry.Sponsorships.click({ force: true });
        await expect(this.page).toHaveURL(/.*sponsorship*/, { timeout: 15000 });
        await highlightElementBorder(this.page.getByRole('heading', { name: 'Sponsorship' }).first());
        await this.page.waitForLoadState('domcontentloaded');
    }

    async verifyPlayAviatorLink() {
        await this.HomePagelocatorsRegistry.PlayAviator.waitFor({ state: 'visible', timeout: 10000 });
        await highlightElements(this.HomePagelocatorsRegistry.PlayAviator);
    }

    async clickPlayAviatorLink() {
        await this.HomePagelocatorsRegistry.PlayAviator.click({ force: true });
        await expect(this.page).toHaveURL(/.*aviator*/, { timeout: 15000 });
        await this.page.waitForLoadState('domcontentloaded');
    }

    async verifySitemapLink() {
        await this.HomePagelocatorsRegistry.Sitemap.waitFor({ state: 'visible', timeout: 10000 });
        await highlightElements(this.HomePagelocatorsRegistry.Sitemap);
    }

    async clickSitemapLink() {
        await this.HomePagelocatorsRegistry.Sitemap.click({ force: true });
        await expect(this.page).toHaveURL(/.*sitemap*/, { timeout: 15000 });
        await this.page.waitForLoadState('domcontentloaded');
    }

    // Navigation Methods
    async gotoHomePage() {
        // Footer is rendered on the sports page; land there so all footer scripts run reliably
        await this.goto('/sport/soccer');
    }

    async clickHowToBet() {
        await this.HomePagelocatorsRegistry.howtobet.click();
        await this.page.waitForTimeout(1000);
    }

    async clickFAQs() {
        await this.HomePagelocatorsRegistry.FAQs.click();
        await highlightElementBorder(this.page.getByRole('heading', { name: "FAQ's" }).first());
        await this.page.waitForTimeout(1000);
    }

    async clickTermsAndConditions() {
        await this.HomePagelocatorsRegistry.TermsAndConditions.click();
        await this.page.waitForTimeout(1000);
    }

    async clickBettingRules() {
        await this.HomePagelocatorsRegistry.BettingRules.click();
        await this.page.waitForTimeout(1000);
    }

    async clickBetwayApp() {
        await this.HomePagelocatorsRegistry.BetwayApp.click();
        await this.page.waitForTimeout(1000);
    }

    async clickAffiliateProgram() {
        await this.HomePagelocatorsRegistry.AffiliateProgram.click();
        await this.page.waitForTimeout(1000);
    }

    async clickResponsibleGaming() {
        await this.HomePagelocatorsRegistry.ResponsibleGaming.click();
        await this.page.waitForTimeout(1000);
    }

    async clickPrivacyPolicy() {
        await this.HomePagelocatorsRegistry.PrivacyPolicy.click();
        await this.page.waitForTimeout(1000);
    }

    async clickSponsorships() {
        await this.HomePagelocatorsRegistry.Sponsorships.click();
        await this.page.waitForTimeout(1000);
    }

    async clickContactUs() {
        await this.HomePagelocatorsRegistry.ContactUs.click();
        await this.page.waitForTimeout(1000);
    }

}
