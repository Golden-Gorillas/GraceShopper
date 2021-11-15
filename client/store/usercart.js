import axios from 'axios';

const SET_CART = 'SET_CART';
const REMOVE_CARD = 'REMOVE_CARD';
const ADD_TO_CART = 'ADD_TO_CART';
const SET_QUANTITY = 'SET_QUANTITY';


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

const _setQuantity = (cart) => {
	return {
		type: SET_QUANTITY,
		cart,
	};
};

export const setQuantity = (cartId, cardId, quantity) => {
	return async (dispatch) => {
		try {
			const { data } = await axios.put(`/api/cardInCarts`, {
				data: { cartId, cardId, quantity },
			});
			console.log(data);
			dispatch(_setQuantity(data));
		} catch (error) {
			console.error(error);
		}
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
		case SET_QUANTITY:
			return action.cart;
		default:
			return state;
	}
}
