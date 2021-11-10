import axios from 'axios';
//action
<<<<<<< HEAD
const SET_CARDS = 'SET_CARDS';
=======
export const SET_CARDS = 'SET_CARDS'
>>>>>>> ae86665877566e63bcd39048a3ee9d8b4cfa5704

export const setCards = (cards) => {
  return {
    type: SET_CARDS,
    cards,
  };
};
//thunk
export const fetchCards = () => {
<<<<<<< HEAD
  return async (dispatch) => {
    const { data } = await axios.get('/api/cards');
    dispatch(setCards(data));
  };
};
=======
    return async (dispatch) => {
        try{
            const {data: cards} = await axios.get('/api/cards')
            //console.log("THUNK:")
            dispatch(setCards(cards))
>>>>>>> ae86665877566e63bcd39048a3ee9d8b4cfa5704

//reduce
export default function cardsReducer(state = [], action) {
  switch (action.type) {
    case SET_CARDS:
      return action.cards;
    default:
      return state;
  }
}
