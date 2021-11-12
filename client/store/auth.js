import axios from 'axios';
import history from '../history';

const TOKEN = 'token';
const CARTID = 'cartId';

/**
 * ACTION TYPES
 */
const SET_AUTH = 'SET_AUTH';

/**
 * ACTION CREATORS
 */
const setAuth = (auth) => ({ type: SET_AUTH, auth });

/**
 * THUNK CREATORS
 */
export const me = () => async (dispatch) => {
	const token = window.localStorage.getItem(TOKEN);
	if (token) {
		const res = await axios.get('/auth/me', {
			headers: {
				authorization: token,
			},
		});
		return dispatch(setAuth(res.data));
	}
};

export const authenticate =
	(userEmail, password, method) => async (dispatch) => {
		try {
			const res = await axios.post(`/auth/${method}`, { userEmail, password });
			window.localStorage.setItem(TOKEN, res.data.token);
			//guestCart = window.localStorage.getItem('guestCart');
			// Cart => axios.put with guestCart
			//window.localStorage.removeItem('guestCart');
			dispatch(me());
		} catch (authError) {
			return dispatch(setAuth({ error: authError }));
		}
	};

export const logout = () => {
	window.localStorage.removeItem(TOKEN);
	window.localStorage.removeItem(CARTID);
	history.push('/login');
	return {
		type: SET_AUTH,
		auth: {},
	};
};

/**
 * REDUCER
 */
export default function (state = {}, action) {
	switch (action.type) {
		case SET_AUTH:
			return action.auth;
		default:
			return state;
	}
}
