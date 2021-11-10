import axios from 'axios';

const SET_CART = 'SET_CART';

const setCart = (cart) => {
	return {
		type: SET_CART,
		cart,
	};
};

export const fetchCart = () => {
	return async (dispatch) => {
		try {
			const { data } = await axios.get('/api/carts/:id');
			dispatch(setCart(data));
		} catch (error) {
			console.error(error);
		}
	};
};

export default function cartReducer(state = {}, action) {
	switch (action.type) {
		case SET_CART:
			return action.cart;
		default:
			return state;
	}
}
