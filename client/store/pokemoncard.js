import axios from 'axios';
import history from '../history';

//action
const GETCARD = 'GETCARD';

export const singleCard = (card) => ({
  type: GETCARD,
  card,
});

//thunk

export const fetchCard = (cardId) => {
  return async (dispatch) => {
    const { data: card } = await axios.get(`/api/cards/${cardId}`);
    dispatch(singleCard(card));
  };
};

//reducer

export default function cardReducer(state = {}, action) {
  switch (action.type) {
    case GETCARD:
      return action.card;
    default:
      return state;
  }
}
