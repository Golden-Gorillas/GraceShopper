import { createStore, combineReducers, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import auth from './auth';
import cardsReducer from './pokemoncards';
import cardReducer from './pokemoncard';
import axios from 'axios';
//auth,
<<<<<<< HEAD
=======
const reducer = combineReducers(
  { auth,
    cards:cardsReducer,
    card:cardReducer
 
  })
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
)
const store = createStore(reducer, middleware)
>>>>>>> ae86665877566e63bcd39048a3ee9d8b4cfa5704

let middleware = [
  // `withExtraArgument` gives us access to axios in our async action creators!
  // https://github.com/reduxjs/redux-thunk#injecting-a-custom-argument
  thunkMiddleware.withExtraArgument({ axios }),
];

// We'd like the redux logger to only log messages when it's running in the
// browser, and not when we run the tests from within Mocha.
middleware = [...middleware, createLogger({ collapsed: true })];

const appReducer = combineReducers({
  cards: cardsReducer,
  card: cardReducer,
  auth,
});

const RESET_STORE = 'RESET_STORE';
export const resetStore = () => ({ type: RESET_STORE });
const rootReducer = (state, action) => {
  if (action.type === RESET_STORE) {
    state = undefined;
    return appReducer(state, action);
  }
  return appReducer(state, action);
};

export default createStore(
  rootReducer,
  // 👇 This uses the Redux DevTools extension, assuming you have it installed in your browser.
  // 👇 See: https://github.com/zalmoxisus/redux-devtools-extension
  composeWithDevTools(applyMiddleware(...middleware))
);

export * from './auth';
