// src/global/config/OddsApiUrl.ts

export type Region = 'ZA' | 'TZ' | 'NG' | 'GH' | 'MW' | 'ZM' | 'BW';

type OddsApiConfig = {
    soccerHighlights: string;
    soccerUpcoming: string;
    liveTableTennis: string;
    esports: string;
};

export const API_URLS: Record<Region, OddsApiConfig> = {
    ZA: {
        soccerHighlights:
            'https://www.betway.co.za/sportsapi/br/v1/BetBook/Highlights/?countryCode=ZA&sportId=soccer',
        soccerUpcoming:
            'https://www.betway.co.za/sportsapi/br/v1/BetBook/Upcoming/?countryCode=ZA&sportId=soccer',
        liveTableTennis:
            'https://www.betway.co.za/sportsapi/br/v1/BetBook/LiveInPlay/?countryCode=ZA&sportId=table-tennis',
        esports:
            'https://www.betway.co.za/sportsapi/br/v1/BetBook/Highlights/?countryCode=ZA&sportId=esports-league-of-legends&Skip=0&Take=20&cultureCode=en-US&isEsport=true&boostedOnly=false&marketTypes=%5BMatch%20Winner%5D',
    },

    TZ: {
        soccerHighlights:
            'https://en.betway.co.tz/sportsapi/br/v1/BetBook/Highlights/?countryCode=TZ&sportId=soccer',
        soccerUpcoming:
            'https://en.betway.co.tz/sportsapi/br/v1/BetBook/Upcoming/?countryCode=TZ&sportId=soccer',
        liveTableTennis:
            'https://en.betway.co.tz/sportsapi/br/v1/BetBook/LiveInPlay/?countryCode=TZ&sportId=table-tennis',
        esports:
            'https://en.betway.co.tz/sportsapi/br/v1/BetBook/Highlights/?countryCode=TZ&sportId=esports-league-of-legends&Skip=0&Take=20&cultureCode=en-US&isEsport=true&boostedOnly=false&marketTypes=%5BMatch%20Winner%5D',
    },

    NG: {} as OddsApiConfig,
    GH: {} as OddsApiConfig,
    MW: {} as OddsApiConfig,
    ZM: {} as OddsApiConfig,
    BW: {} as OddsApiConfig,
};
