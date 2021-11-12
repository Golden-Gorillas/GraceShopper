import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { withRouter, Route, Switch, Redirect } from 'react-router-dom';
import { Login, Signup } from './components/AuthForm';
import Home from './components/Home';
import PokemonCards from './components/PokemonCardInventory';
import SingleCardView from './components/singleCardView';
import { me } from './store';
import UserCart from './components/UserCart';
import Admin from './components/Admin';
import AdminEditCard from './components/AdminEditCard';
import AdminAddCard from './components/AdminAddCard';
import Checkout from './components/checkoutPage';

/**
 * COMPONENT
 */
class Routes extends Component {
  async componentDidMount() {
    this.props.loadInitialData();
  }

  render() {
    return (
      <div>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={Signup} />
          <Route exact path="/cards" component={PokemonCards} />
          <Route exact path="/cards/:id" component={SingleCardView} />
          <Route exact path="/checkout" component={Checkout} />
          <Route exact path="/cart" component={UserCart} />
          <Route exact path="/admin" component={Admin} />
          <Route exact path="/admin/cards/add" component={AdminAddCard} />
          <Route exact path="/admin/cards/:id" component={AdminEditCard} />
        </Switch>
      </div>
    );
  }
}
/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.auth that has a truthy id.
    // Otherwise, state.auth will be an empty object, and state.auth.id will be falsey
    isLoggedIn: !!state.auth.id,
    cards: state.cards,
  };
};

const mapDispatch = (dispatch) => {
  return {
    loadInitialData() {
      dispatch(me());
    },
  };
};

export default connect(mapState, mapDispatch)(Routes);
