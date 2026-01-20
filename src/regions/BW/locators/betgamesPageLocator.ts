import { selectors } from "@playwright/test"

export const betgamesPageLocators = {
    searchBox: { selector: 'input', options: { name: 'Search' },nth: 0},
    playButton: { selector: 'button', options: { name: 'Play' }, nth: 0 },
    favouriteGames: { selector: 'a[aria-label="Favourite Game"]', nth: 0 }
};