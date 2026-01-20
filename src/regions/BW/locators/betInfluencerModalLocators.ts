import { selectors } from "@playwright/test"

export const betInfluencerModalLocators = {
    summaryButton: { selector: 'button', options: { name: 'Summary' }, nth: 0 },
    detailButton: { selector: 'button', options: { name: 'Details' }, nth: 0 },
    lastFourWeeksCanvas:{selectors: '#lastfourMonthsChart'},
    detailedBreakdownButton: { selector: 'text', options: { name: 'Detailed breakdown' }, nth: 0 },
    totalMonthlyRevenue: { selector: 'text', options: { name: 'Total monthly revenue' }, nth: 0 },
    monthSelector:{selectors:'#monthSelector'},
    sortBySelector:{selectors:'#sortSelector'},
    betsTaken:{selectors:'text', options:{name:'Bets taken'},nth:0},
    codesUsed:{selectors:'text', options:{name:'Codes used'},nth:0},
    nextButton:{selectors:'.NextPrevBtn', options:{name:'Next'},nth:0},
    previousButton:{selectors:'.NextPrevBtn', options:{name:'Previous'},nth:0},
    revnueGraph:{selectors:'#lastPrevMonthChart'}
};