import axios from 'axios';
//action
export const SET_CARDS = 'SET_CARDS';
export const DELETE_CARD = 'DELETE_CARD';
export const UPDATE_CARD = 'UPDATE_CARD';

const TOKEN = 'token';

export const setCards = (cards) => {
  return {
    type: SET_CARDS,
    cards,
  };
};

export const _deleteCard = (card) => ({
  type: DELETE_CARD,
  card,
});

export const _updateCard = (card) => ({
  type: UPDATE_CARD,
  card,
});

//thunk
export const fetchCards = () => {
  return async (dispatch) => {
    try {
      const { data: cards } = await axios.get('/api/cards');
      dispatch(setCards(cards));
    } catch (error) {
      console.log(error);
    }
  };
};

export const deleteCard = (cardId) => {
  return async (dispatch) => {
    console.log('test', cardId);
    const token = window.localStorage.getItem(TOKEN);
    const { data } = await axios.delete(`/api/cards/${cardId}`, {
      headers: { authorization: token },
    });
    dispatch(_deleteCard(data));
  };
};

export const updateCard = (card, history) => {
  return async (dispatch) => {
    const token = window.localStorage.getItem(TOKEN);
    const { data: updated } = await axios.put(`/api/cards/${card.id}`, card, {
      headers: { authorization: token },
    });
    dispatch(_updateCard(updated));
    history.push(`/cards/${card.id}`);
  };
};
//reduce
export default function cardsReducer(state = [], action) {
  switch (action.type) {
    case SET_CARDS:
      return action.cards;
    case DELETE_CARD:
      return state.filter((card) => card.id !== action.card.id);
    case UPDATE_CARD: {
      return state.map((card) => {
        if (card.id === action.card.id) {
          return action.card;
        } else {
          return card;
        }
      });
    }
    default:
      return state;
  }
}
