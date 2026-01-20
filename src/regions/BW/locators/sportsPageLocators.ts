import { selectors } from "@playwright/test";

export const sportsPageLocators = {
  
  SportButton:{selector:'text', options: { name: 'Sport' },nth:0},
  CasinoButton:{selector:'text', options: { name: 'Casino' }},
  BetSlipButton:{selector:'text',options:{name:'Betslip 0'},nth:0},
  Betslip:{selector:"#betslip-container"},
  loginButtonFromBetSlip:{selector:'button', options: { name: 'Login' }},
  betNow:{selector:"#betslip-strike-btn"},
  betConfirmation:{selector:'text',options:{name:'Bet Confirmation'},nth:0},
  bookingCodeMessage:{selector:'text',options:{name:"Booking Code:"},nth:0},
  enterBookingCode:{selector:'#booking-code'},
  shareButton:{selector:'#betslip-share-btn'},
  modalCloseButton:{selector:'#modal-close-btn'}
};