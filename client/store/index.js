import {createStore, combineReducers, applyMiddleware} from 'redux'
import {createLogger} from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import auth from './auth'
import cardsReducer from './pokemoncards'
import cardReducer from './pokemoncard'
//auth,
const reducer = combineReducers(
  { auth,
    cards:cardsReducer,
    card:cardReducer
 
  })
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
)
const store = createStore(reducer, middleware)

export default store
export * from './auth'
