import axios from 'axios';

const TOKEN = 'token';
export const SET_USERS = 'SET_USERS';
export const UPDATE_USER = 'UPDATE_USER';

export const setUsers = (users) => {
  return {
    type: SET_USERS,
    users,
  };
};

export const _updateUser = (user) => {
  return {
    type: UPDATE_USER,
    user,
  }
};

export const updateUser = (user) => {
  return async (dispatch) => {
    const token = window.localStorage.getItem(TOKEN);
    const  { data: updated } = await axios.put(`/users/${user.id}`, user, {headers: {authorization: token},});
    dispatch(_updateUser(updated));
  }
}

export const fetchUsers = () => {
  return async (dispatch) => {
    try {
      const token = window.localStorage.getItem(TOKEN);
      const { data } = await axios.get('/api/users', {
        headers: { authorization: token },
      });
      dispatch(setUsers(data));
    } catch (error) {
      console.log(error);
    }
  };
};



export default function usersReducer(state = [], action) {
  switch (action.type) {
    case SET_USERS:
      return action.users;
    case UPDATE_USER:
      return state.map((user) => {
        if(user.id === action.card.id) {
          return action.user;
        } else {
        return user
      }
      });
    default:
      return state;
  }
}
