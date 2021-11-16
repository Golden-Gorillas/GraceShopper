//ADD CARD TO GUEST CARD THUNK
//REMOVE CARD TO GUEST CARD THUNK

const SET_GUEST_CART = 'SET_GUEST_CART';
const ADD_TO_GUEST_CART = 'ADD_TO_GUEST_CART';
const REMOVE_FROM_GUEST_CART = 'REMOVE_FROM_GUEST_CART';
const SET_CARD_QUANTITY = 'SET_CARD_QUANTITY';

const setGCart = (cart) => {
	return {
		type: SET_GUEST_CART,
		cart,
	};
};

const addToGCart = (cart) => {
	return {
		type: ADD_TO_GUEST_CART,
		cart,
	};
};

const removeFromGCart = (cart) => {
	return {
		type: REMOVE_FROM_GUEST_CART,
		cart,
	};
};

const setGCardQuantity = (cart) => {
	return {
		type: SET_CARD_QUANTITY,
		cart,
	};
};

export const fetchGCart = () => {
	return (dispatch) => {
		const data = window.localStorage.getItem('guest');
		dispatch(setGCart(data));
	};
};

export const addCardToGuest = () => {};

// // export default function guestReducer(state = [], action) {
// // 	switch (action.type) {
// // 		case SET_GUEST_CART:
// // 			// console.log(action.cart);
// // 			return action.cart;

// // 		default:
// // 			return state;
// // 	}
// }
