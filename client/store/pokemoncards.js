import axios from 'axios'
//action
export const SET_CARDS = 'SET_CARDS'

export const setCards = (cards) => {
    return{
    type: SET_CARDS,
    cards }
}
//thunk
export const fetchCards = () => {
    return async (dispatch) => {
        try{
            const {data: cards} = await axios.get('/api/cards')
            //console.log("THUNK:")
            dispatch(setCards(cards))

        }catch(err){
            throw(err)
        }
    }
}
//reduce


const cardsReducer=(state = [], action) => {
    switch(action.type){
        case SET_CARDS:
            return action.cards
        default:
            return state
    }
}

export default cardsReducer
