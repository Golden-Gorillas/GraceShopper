import axios from 'axios';
//action
export const SET_CARDS = 'SET_CARDS';
export const FILTER_CARDS_BY_RARITY = 'FILTER_CARDS_BY_RARITY';

export const setCards = (cards) => {
	return {
		type: SET_CARDS,
		cards,
	};
};


//thunk
export const fetchCards = () => {
	return async (dispatch) => {
		try {
			const { data: cards } = await axios.get('/api/cards');
			//console.log("THUNK:")
			dispatch(setCards(cards));
		} catch (error) {
			console.log(error);
		}
	};
};

export const filterCardsByRarity = (cards, rarity) => (dispatch) => {
		dispatch({
			type: FILTER_CARDS_BY_RARITY,
			payload: {
				rarity: rarity,
				items: rarity === "" ? cards : cards.filter((card)=> card.rarity.indexOf(rarity) >= 0)
			}
		})
}


const initialState = { cards:[], filteredCards: [], rarity: ""}
//reducer
export default function cardsReducer(state = initialState, action) {
	switch (action.type) {
		case SET_CARDS:
			return {...state, cards: action.cards, filteredCards: action.cards};
		case FILTER_CARDS_BY_RARITY:
			return {
				...state,
				filteredCards: action.payload.items,
				rarity: action.payload.rarity
			}
		default:
			return state;
	}
}
