import axios from 'axios';
//action
const SET_CARDS = 'SET_CARDS';

export const setCards = (cards) => {
  return {
    type: SET_CARDS,
    cards,
  };
};
//thunk
export const fetchCards = () => {
  return async (dispatch) => {
    const { data } = await axios.get('/api/cards');
    dispatch(setCards(data));
  };
};

//reduce
export default function cardsReducer(state = [], action) {
  switch (action.type) {
    case SET_CARDS:
      return action.cards;
    default:
      return state;
  }
}
