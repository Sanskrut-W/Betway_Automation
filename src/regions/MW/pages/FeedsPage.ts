import { Page, Locator, expect } from '@playwright/test';
import { loadLocatorsFromExcel } from "../../../global/utils/file-utils/excelReader";
import { getLocator } from "../../../global/utils/file-utils/locatorResolver";
import { highlightElements } from '../../Common-Flows/HighlightElements';
import { ScreenshotHelper } from '../../Common-Flows/ScreenshotHelper';
import { BasePage } from './BasePage';

const userData = require('../json-data/userData.json');
const LOCATOR_URL = "src/global/utils/file-utils/locators(2).xlsx";

export class FeedsPage extends BasePage {

    readonly locatorsRegistry: Record<string, Locator>;
    private readonly TEST_TRANSACTION_ID = "12345678";

    constructor(page: Page) {
        super(page);
        const configs = loadLocatorsFromExcel(LOCATOR_URL, "FeedsPage");

        this.locatorsRegistry = {
            feeds: getLocator(this.page, configs['feeds']),
            helpIcon: getLocator(this.page, configs['helpIcon']),
            dotsIcon: getLocator(this.page, configs['dotsIcon']),
            unfollowButton: getLocator(this.page, configs['unfollowButton']),
            followButton: getLocator(this.page, configs['followButton']),
            followingIcon: getLocator(this.page, configs['followingIcon']),
            feedsProfile: getLocator(this.page, configs['feedsProfile']),
            profilenameInFeeds: getLocator(this.page, configs['profilenameInFeeds']),
            handleInFeeds: getLocator(this.page, configs['handleInFeeds']),
            createProfileinFeeds: getLocator(this.page, configs['createProfileinFeeds']),
            createProfileInFooterFeeds: getLocator(this.page, configs['createProfileInFooterFeeds']),
            firstFeeds: getLocator(this.page, configs['firstFeeds']),
            commentsInPopup: getLocator(this.page, configs['commentsInPopup']),
            comments: getLocator(this.page, configs['comments']),
            commentsPopup: getLocator(this.page, configs['commentsPopup']),
            commentTextBox: getLocator(this.page, configs['commentTextBox']),
            submitincomments: getLocator(this.page, configs['submitincomments']),
            helpInComments: getLocator(this.page, configs['helpInComments']),
            removeComments: getLocator(this.page, configs['removeComments']),
            firstCommentDiv: getLocator(this.page, configs['firstCommentDiv']),
            likebutton: getLocator(this.page, configs['likebutton']),
            reportButton: getLocator(this.page, configs['reportButton']),
            shareButtonInPopup: getLocator(this.page, configs['shareButtonInPopup']),
            shareButton: getLocator(this.page, configs['shareButton']),
            sharePopup: getLocator(this.page, configs['sharePopup']),
            whatsAppButton: getLocator(this.page, configs['whatsAppButton']),
            closeComments: getLocator(this.page, configs['closeComments']),
            closePopup: getLocator(this.page, configs['closePopup']),
            profilePopup: getLocator(this.page, configs['profilePopup']),
            editIcon: getLocator(this.page, configs['editIcon']),
            feedsHeader: getLocator(this.page, configs['feedsHeader']),
            searchInFeeds: getLocator(this.page, configs['searchInFeeds']),
            suggestedFeedsFollow: getLocator(this.page, configs['suggestedFeedsFollow']),
            suggestedFeedsUnFollow: getLocator(this.page, configs['suggestedFeedsUnFollow']),
            searchOnHome: getLocator(this.page, configs['searchOnHome']),
            followInSearch: getLocator(this.page, configs['followInSearch']),
            searchCloseInHome: getLocator(this.page, configs['searchCloseInHome']),
            mobileNumber: getLocator(this.page, configs['mobileNumber']),
            password: getLocator(this.page, configs['password']),
            loginButton: getLocator(this.page, configs['loginButton']),
        };
    }

    // --- Utility Functions (Keep for page object internal use) ---

    // goto() and Login() are inherited from BasePage

    /** This helper must remain as it performs page context manipulation and returns a Page object. */
    async clickWhatsAppButtonAndGetNewPage() {
        const [newPage] = await Promise.all([
            this.page.context().waitForEvent('page'),
            this.locatorsRegistry.whatsAppButton.click(),
        ]);
        await newPage.waitForLoadState('domcontentloaded');
        return newPage; // Returns the Page object for the WhatsApp screen
    }

    // --- New Test-Specific Flow Functions (Actions Only) ---

    /** T1: Click Feeds icon and wait for header to be ready. */
    async navigateToFeeds() {
        await this.locatorsRegistry.feeds.click();
        await this.locatorsRegistry.feedsHeader.waitFor({ state: 'visible' });
    }

    /** T2: Click "i" (help) icon and pause. */
    async clickHelpIcon() {
        await this.locatorsRegistry.helpIcon.click();
        await this.page.waitForTimeout(2000);
    }

    /** T3 & T4: Unfollow if visible, then Follow. */
    async prepareForFollowAndPerformFollow() {
        const isFeedVisible = await this.locatorsRegistry.firstFeeds.isVisible({ timeout: 5000 });

        // T3 - Setup: Attempt to unfollow if already followed (Idempotency)
        if (isFeedVisible) {
            if (await this.locatorsRegistry.dotsIcon.isVisible()) {
                await this.locatorsRegistry.dotsIcon.click();
                if (await this.locatorsRegistry.unfollowButton.isVisible()) {
                    await this.locatorsRegistry.unfollowButton.click();
                    await this.page.waitForTimeout(2000); // Wait for action
                }
            }
        }
        // State is now ready for T3 screenshot of the 'Follow' button state or initial view.
        // Return visibility flag for potential conditional screenshot in spec
        return { isFeedVisible };
    }

    async performFollowAction() {
        // T4 - Action: Click Follow button
        await this.locatorsRegistry.followButton.click();
        await this.page.waitForTimeout(1000); // Wait for count/state change
    }

    /** T6: Click dots and verify unfollow button presence. */
    async clickDotsAndShowUnfollow() {
        await this.locatorsRegistry.dotsIcon.waitFor({ state: 'visible' });
        await this.locatorsRegistry.dotsIcon.click();
        await this.locatorsRegistry.unfollowButton.waitFor({ state: 'visible' });
        await this.page.waitForTimeout(2000);
    }

    /** T7: Click comments button to open popup. */
    async openCommentsPopup() {
        await this.locatorsRegistry.comments.waitFor({ state: 'visible' });
        await this.locatorsRegistry.comments.click();
        await this.page.waitForTimeout(2000);
    }

    /** T8: Fill comment text box. */
    async fillCommentTextBox() {
        await this.locatorsRegistry.commentTextBox.fill('Home team will win the match');
    }

    /** T9: Submit comment. */
    async submitComment() {
        await this.locatorsRegistry.submitincomments.click();
        await this.page.waitForTimeout(2000);
    }

    /** T10: Remove comment. */
    async removePostedComment() {
        await this.locatorsRegistry.helpInComments.click();
        await this.locatorsRegistry.removeComments.click();
        await this.page.waitForTimeout(2000);
    }

    /** T11-T13: Open comments, show report, and click like. */
    async setupCommentActions() {
        // T11: Open comments popup
        await this.locatorsRegistry.comments.waitFor({ state: 'visible' });
        await this.locatorsRegistry.comments.click();
        await this.page.waitForTimeout(2000);
    }

    async showReportButton() {
        // T12: Report button
        await this.locatorsRegistry.helpInComments.click();
    }

    async performLikeAction() {
        // T13: Like button. Clicks the main like button, not the one in the menu.
        await this.locatorsRegistry.likebutton.click();
        await this.page.waitForTimeout(2000);
        await this.locatorsRegistry.closeComments.click(); // Cleanup
    }

    /** T14: Click share button to show popup. */
    async clickShareButton() {
        await this.locatorsRegistry.shareButton.waitFor({ state: 'visible' });
        await this.locatorsRegistry.shareButton.click();
        await this.page.waitForTimeout(1000);
    }

    /** T15: Clicks WhatsApp button and returns the new page for screenshot. */
    async clickWhatsAppAndReturnNewPage() {
        return this.clickWhatsAppButtonAndGetNewPage();
    }

    /** T17: Click profile and wait for counts. */
    async openProfileAndReadyForCounts() {
        await this.locatorsRegistry.feedsProfile.click();
        await this.page.waitForTimeout(2000);
    }

    /** T18: Perform Like, Comment, and Share actions in Profile Popup. */
    async performProfileActions() {
        await this.locatorsRegistry.likebutton.click();

        // Comment flow
        await this.locatorsRegistry.commentsInPopup.click();
        await this.page.waitForTimeout(2000);
        // Screenshot T18a happens now
        await this.locatorsRegistry.closeComments.click();

        // Share flow
        await this.locatorsRegistry.shareButtonInPopup.click();
        await this.page.waitForTimeout(2000);
        // Screenshot T18b happens now
        await this.locatorsRegistry.closeComments.click();
    }

    /** T19: Close the Public Profile pop up window. */
    async closeProfilePopup() {
        await this.locatorsRegistry.closePopup.click();
        await this.page.waitForTimeout(2000);
    }

    /** T20: Search for a term. */
    async performFeedsSearch() {
        await this.locatorsRegistry.searchInFeeds.click();
        await this.locatorsRegistry.searchInFeeds.fill('Champions');
        await this.locatorsRegistry.searchInFeeds.press('Backspace');
        await this.page.waitForTimeout(4000);
    }

    /** T21: Perform search, follow, and clean up. */
    async performSearchFollowCleanup() {
        // Setup: Search for term
        await this.locatorsRegistry.searchInFeeds.click();
        await this.locatorsRegistry.searchInFeeds.fill('Champions');
        await this.locatorsRegistry.searchInFeeds.press('Backspace');
        await this.page.waitForTimeout(4000);

        // T21a Ready state for follow
        await this.locatorsRegistry.suggestedFeedsFollow.click();
        await this.page.waitForTimeout(2000);
        // T21b Ready state for post-follow

        // Cleanup: Unfollow
        await this.locatorsRegistry.suggestedFeedsUnFollow.click();
    }

    /** T22: Perform search, ensure followed, unfollow, and clean up. */
    async performSearchUnfollowCleanup() {
        // Setup: Search for term
        await this.locatorsRegistry.searchInFeeds.click();
        await this.locatorsRegistry.searchInFeeds.fill('Champions');
        await this.locatorsRegistry.searchInFeeds.press('Backspace');
        await this.page.waitForTimeout(4000);

        // Ensure it's followed before testing unfollow (idempotency)
        if (await this.locatorsRegistry.suggestedFeedsFollow.isVisible()) {
            await this.locatorsRegistry.suggestedFeedsFollow.click();
            await this.page.waitForTimeout(1000);
        }

        // T22a Ready state for unfollow
        await this.locatorsRegistry.suggestedFeedsUnFollow.click();
        await this.page.waitForTimeout(2000);
        // T22b Ready state for post-unfollow
    }

    /** T23 & T24: Search, show suggestions, follow, and cleanup. */
    async performSearchShowSuggestionsAndFollow() {
        // T23: Search for term to show suggestions
        await this.locatorsRegistry.searchInFeeds.click();
        await this.locatorsRegistry.searchInFeeds.fill('Champions');
        await this.locatorsRegistry.searchInFeeds.press('Backspace');
        await this.page.waitForTimeout(4000);
        // T23 Screenshot happens now.

        // T24: Follow action
        await this.locatorsRegistry.suggestedFeedsFollow.click();
        await this.page.waitForTimeout(2000);
        // T24 Screenshot happens now.

        // Cleanup: Unfollow
        await this.locatorsRegistry.suggestedFeedsUnFollow.click();
    }

    /** T25: Follow feeds from Home search bar. */
    async performHomeSearchFollow() {
        await this.locatorsRegistry.searchOnHome.click();
        await this.locatorsRegistry.searchOnHome.fill('NFL');
        await this.locatorsRegistry.searchOnHome.press('Enter');
        await this.page.waitForTimeout(4000);

        await this.locatorsRegistry.followInSearch.click();
        await this.page.waitForTimeout(2000);
    }

    // The two helper functions for screenshots need to be visible to the spec file,
    // so I will put them back into your original format here.
    async captureScreenshot(locatorName: string, screenshotDir: string, fileName: string, testInfo: any) {
        const locator = this.locatorsRegistry[locatorName];
        await highlightElements(locator);
        await ScreenshotHelper(this.page, screenshotDir, fileName, testInfo);
    }
    async takeScreenshot(screenshotDir: string, fileName: string, testInfo: any) {
        await ScreenshotHelper(this.page, screenshotDir, fileName, testInfo);
    }

    /** T5: Verify feed section presence. */
    async waitForFeedSectionPresence() {
        await this.page.waitForTimeout(4000);
        await expect(this.locatorsRegistry.feeds).toBeVisible();
    }
}

