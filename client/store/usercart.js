import axios from 'axios';
import { checkAuth } from './auth';

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
			const token = checkAuth();
			if (typeof token == 'string') {
				const { data } = await axios.get(`/api/carts/${id}`, {
					headers: { authorization: token },
				});
				dispatch(setCart(data));
			} else {
				console.log('fetchCart', token);
				dispatch(setCart(token));
			}
		} catch (error) {
			console.error(error);
		}
	};
};

export const removeSpecifiedCard = (cartId, cardId) => {
	return async (dispatch) => {
		try {
			const token = checkAuth();
			if (typeof token === 'string') {
				const { data } = await axios.put(
					`/api/carts/${cartId}`,
					{
						delete: cardId,
					},
					{ headers: { authorization: token } }
				);
				dispatch(removeCard(data));
			} else {
				const { data: card } = await axios.get(`/api/cards/${cardId}`);
				const filteredArr = token.cards.filter(
					(pokemonCard) => pokemonCard.id != cardId
				);
				token.cards = filteredArr;
				console.log('token2', token);

				window.localStorage.setItem('guest', JSON.stringify(token));
				dispatch(removeCard(card));
				dispatch(setCart(token));
				//Can I do this?
			}
		} catch (error) {
			console.error(error);
		}
	};
};

export const addCardToCart = (cartId, cardId) => {
	return async (dispatch) => {
		try {
			const token = checkAuth();
			if (typeof token == 'string') {
				const { data } = await axios.put(
					`/api/carts/${cartId}`,
					{
						add: cardId,
					},
					{ headers: { authorization: token } }
				);
				dispatch(addToCart(data));
			} else {
				const guestCart = token;
				const { data: card } = await axios.get(`/api/cards/${cardId}`);
				if (guestCart.cards.length == 0) {
					const cardQuantity = { quantity: 1 };
					card['cardsInCart'] = cardQuantity;
					guestCart.cards.push(card);
				} else {
					guestCart.cards.map((singleCard) => {
						console.log(singleCard.name, card.name);
						if (singleCard.name == card.name) {
							singleCard['cardsInCart']['quantity']++;
						} else {
							const cardQuantity = { quantity: 1 };
							card['cardsInCart'] = cardQuantity;
							guestCart.cards.push(card);
						}
						console.log(singleCard);
						console.log(guestCart.cards);
					});
				}
				window.localStorage.setItem('guest', JSON.stringify(guestCart));
				dispatch(addToCart(guestCart));
			}
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
