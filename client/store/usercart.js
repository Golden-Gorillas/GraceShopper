import axios from 'axios';

const SET_CART = 'SET_CART';
const REMOVE_CARD = 'REMOVE_CARD';
const ADD_TO_CART = 'ADD_TO_CART';

const setCart = (cart) => {
	return {
		type: SET_CART,
		cart,
	};
};

const removeCard = (cart) => {
	return {
		type: REMOVE_CARD,
		cart,
	};
};

const addToCart = (cart) => {
	return {
		type: ADD_TO_CART,
		cart,
	};
};

export const fetchCart = (id) => {
	return async (dispatch) => {
		try {
			const { data } = await axios.get(`/api/carts/${id}`);
			dispatch(setCart(data));
		} catch (error) {
			console.error(error);
		}
	};
};

export const removeSpecifiedCard = (cartId, cardId) => {
	return async (dispatch) => {
		try {
			const { data } = await axios.put(`/api/carts/${cartId}`, {
				delete: cardId,
			});
			dispatch(removeCard(data));
		} catch (error) {
			console.error(error);
		}
	};
};

export const addCardToCart = (cartId, cardId) => {
	return async (dispatch) => {
		try {
			const { data } = await axios.put(`/api/carts/${cartId}`, {
				add: cardId,
			});
			dispatch(addToCart(data));
		} catch (error) {
			console.error(error);
		}
	};
};

export default function cartReducer(state = [], action) {
	switch (action.type) {
		case SET_CART:
			return action.cart;
		case REMOVE_CARD:
			return action.cart;
		case ADD_TO_CART:
			return action.cart;
		default:
			return state;
	}
}
