import axios from 'axios';

const SET_CART = 'SET_CART';

const setCart = (cart) => {
	return {
		type: SET_CART,
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

export default function cartReducer(state = [], action) {
	switch (action.type) {
		case SET_CART:
			console.log('State', state, action);
			return action.cart;
		default:
			return state;
	}
}
