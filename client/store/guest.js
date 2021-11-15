//ADD CARD TO GUEST CARD THUNK
//REMOVE CARD TO GUEST CARD THUNK
<<<<<<< HEAD
=======
import axios from "axios";

const ADD_TO_GUEST_CART = 'ADD_TO_GUEST_CART';
const REMOVE_FROM_GUEST_CART = 'REMOVE_FROM_GUEST_CART'
const SET_GUEST_CART = 'SET_GUEST_CART'

const addToGuestCart = (cart) => {
  return {
    type: ADD_TO_GUEST_CART,
    cart
  }
}

const removeFromGuestCart = (cart) => {
  return {
    type: REMOVE_FROM_GUEST_CART,
    cart
  }
}

const setGuestCart = (cart) => {
  return {
    type: SET_GUEST_CART,
    cart
  }
}


// to fetch cart you have to go inside of local storage and check if cart.id exists

export const addCardToGuestCart = (cart, cardId) => {
  return (dispatch) => {
    console.log("guest cart", cart, cardId)
      // dispatch(addToGuestCart());
  };
};

export default function cardsReducer(state = [], action) {
  switch (action.type) {
    default:
      return state;
  }
}
>>>>>>> 60f307f37667ed9c03aec509ea5b003f79cac4e6
