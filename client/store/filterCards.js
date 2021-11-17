import axios from 'axios';


const SET_CARD_FILTER = "SET_CARD_FILTER"

export const setCardFilter = (rarity, cards) => ({
    type: SET_CARD_FILTER,
    payload: {
      rarity: rarity,
      cards: cards
    }
})



export default function filterReducer(state = { cards: [], rarity: "" }, action) {
  switch (action.type) {
    case SET_CARD_FILTER: {
      const currentCards = {...state, cards: action.payload.cards}
      console.log("current cards", currentCards)
      const filteredCards =  currentCards.cards.filter(
        (card) => {
          if (action.payload.rarity === 'all') {
            return card
        } else {
          return card.rarity === action.payload.rarity
        }})
      return {...state, cards: filteredCards}
    }
    default:
      return state;
  }
}
