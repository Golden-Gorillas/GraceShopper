import axios from 'axios';

const SET_CART = 'SET_CART';
const REMOVE_CARD = 'REMOVE_CARD';

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

export const fetchCart = (id) => {
	return async (dispatch) => {
		try {
			const { data } = await axios.get(`/api/carts/${id}`);
			console.log('redux data', data);
			dispatch(setCart(data));
		} catch (error) {
			console.error(error);
		}
	};
};

export const removeSpecifiedCard = (cartId, cardId) => {
	return async (dispatch) => {
		try {
			const { data } = await axios.delete(`/api/carts/${cartId}`, {
				data: { cardId },
			});
			dispatch(removeCard(data));
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
		default:
			return state;
	}
}
