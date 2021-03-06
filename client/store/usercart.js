import axios from 'axios';
import { checkAuth } from './auth';

const SET_CART = 'SET_CART';
const REMOVE_CARD = 'REMOVE_CARD';
const ADD_TO_CART = 'ADD_TO_CART';
const SET_QUANTITY = 'SET_QUANTITY';
const CLEAR_CART = 'CLEAR_CART';

const setCart = (cart) => {
	return {
		type: SET_CART,
		cart,
	};
};

const clearCart = (cart) => {
	return {
		type: CLEAR_CART,
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

export const emptyCart = (cart) => {
	return async (dispatch) => {
		try {
			const token = checkAuth();
			if (typeof token == 'string') {
				const { data } = await axios.put(
					`/api/carts/${cart.id}`,
					{
						empty: cart,
					},
					{ headers: { authorization: token } }
				);
				dispatch(clearCart(data));
			} else {
				let guestCart = token;
				guestCart.cards.length = 0;
				window.localStorage.setItem('guest', JSON.stringify(guestCart));
				dispatch(clearCart(guestCart));
			}
		} catch (error) {
			console.error(error);
		}
	};
};

export const setQuantity = (cartId, cardId, quantity) => {
	return async (dispatch) => {
		try {
			const token = checkAuth();
			if (typeof token == 'string') {
				const { data } = await axios.put(`/api/cardInCarts`, {
					data: { cartId, cardId, quantity },
				});
				dispatch(_setQuantity(data));
			} else {
				const guestCart = token;
				guestCart.cards.map((pokemonCard) => {
					if (cardId === pokemonCard.id) {
						pokemonCard['cardsInCart']['quantity'] = quantity;
					}
					return pokemonCard;
				});
				window.localStorage.setItem('guest', JSON.stringify(guestCart));
				dispatch(_setQuantity(guestCart));
			}
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
				const filteredArr = token.cards.filter(
					(pokemonCard) => pokemonCard.id != cardId
				);
				token.cards = filteredArr;

				window.localStorage.setItem('guest', JSON.stringify(token));
				dispatch(removeCard(token));
			}
		} catch (error) {
			console.error(error);
		}
	};
};

export const addCardToCart = (cartId, card) => {
	return async (dispatch) => {
		try {
			const token = checkAuth();
			if (typeof token == 'string') {
				const { data } = await axios.put(
					`/api/carts/${cartId}`,
					{
						add: card,
					},
					{ headers: { authorization: token } }
				);

				dispatch(addToCart(data));
			} else {
				const guestCart = token;
				const cardsWeHave = guestCart.cards.map((innerCard) => innerCard.id);

				if (cardsWeHave.includes(card.id)) {
					guestCart.cards.map((pokemonCard) => {
						if (
							card.id === pokemonCard.id &&
							pokemonCard['cardsInCart']['quantity'] < card.stock
						) {
							pokemonCard['cardsInCart']['quantity']++;
						}
						return pokemonCard;
					});
				} else {
					const cardQuantity = { quantity: 1 };
					card['cardsInCart'] = cardQuantity;
					guestCart.cards.push(card);
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
		case CLEAR_CART:
			return action.cart;
		default:
			return state;
	}
}
