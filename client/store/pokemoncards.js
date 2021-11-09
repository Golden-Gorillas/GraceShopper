import axios from 'axios'
//action
const SET_CARDS = 'SET_CARDS'

export const setCards = (cards) => {
    return{
    type: SET_CARDS,
    cards }
}
//thunk
export const fetchCards = () => {
    return async (dispatch) => {
        try{
            const { data} = await axios.get('/api/cards')
            console.log("THUNK: ",data)
            dispatch(setCards(data))

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
