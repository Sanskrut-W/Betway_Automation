import { selectors } from "@playwright/test"

export const virtualPageLocators = {
    searchBox: { selector: 'input', options: { name: 'Search' },nth: 0},
    playButton: { selector: 'button', options: { name: 'Play' }, nth: 0 },
    favouriteGames: { selector: 'button',options:{name : "Favourite Game" },nth: 0 }  
};