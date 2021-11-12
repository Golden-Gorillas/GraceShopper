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

export const filterCardsByRarity = (rarity) => (dispatch) => {
	console.log(rarity)
		dispatch({
			type: FILTER_CARDS_BY_RARITY,
			payload: {
				rarity: rarity,
			}
		})
}


// const initialState = { cards:[], filteredCards: [], rarity: ""}
//reducer
export default function cardsReducer(state = [], action) {
	switch (action.type) {
		case SET_CARDS:
			return action.cards;
		case FILTER_CARDS_BY_RARITY:{
			console.log(action);
		const currentState = [...state]
			return currentState.filter((card)=> card.rarity === action.payload.rarity)
		}
		default:
			return state;
	}
}
