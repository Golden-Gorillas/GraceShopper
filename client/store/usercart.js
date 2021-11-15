import axios from 'axios';

const SET_CART = 'SET_CART';
const REMOVE_CARD = 'REMOVE_CARD';
const ADD_TO_CART = 'ADD_TO_CART';
const SET_QUANTITY = 'SET_QUANTITY';
const TOKEN = 'token';

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
			const token = window.localStorage.getItem(TOKEN);
			console.log('fetch cart', id, token);
			if (token) {
				const { data } = await axios.get(`/api/carts/${id}`, {
					headers: { authorization: token },
				});
				dispatch(setCart(data));
			} else {
				const guestData = window.localStorage.getItem('guest');
				dispatch(setCart(JSON.parse(guestData)));
			}
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
			const token = window.localStorage.getItem(TOKEN);
			if (token) {
				const { data } = await axios.put(`/api/carts/${cartId}`, {
					add: cardId,
				});
				dispatch(addToCart(data));
			} else {
				const guestData = JSON.parse(window.localStorage.getItem('guest'));
				const { data: card } = await axios.get(`/api/cards/${cardId}`);
				guestData.push(card);
				dispatch(addToCart(guestData));
			}
		} catch (error) {
			console.error(error);
		}
	};
};

export default function cartReducer(state = [], action) {
	switch (action.type) {
		case SET_CART:
			console.log(action);
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
