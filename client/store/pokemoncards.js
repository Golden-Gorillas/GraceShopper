import axios from "axios";

const SET_CARDS = 'SET_CARDS';

export const setCards = (cards) => {
  return {
    type: SET_CARDS,
    cards,
  };
};

export const fetchCards = () => {
  return async (dispatch) => {
    try {
      const { data } =  await axios.get("/api/cards");
      dispatch(setCards(data));
    } catch (error) {
      console.log(error)
    }
  }
}
