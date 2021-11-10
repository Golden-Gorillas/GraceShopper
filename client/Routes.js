import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { withRouter, Route, Switch, Redirect } from 'react-router-dom';
import { Login, Signup } from './components/AuthForm';
import Home from './components/Home';
import SingleCardView from './components/singleCardView';
import pokemonCards from './components/pokemonCardInventory';
import { me } from './store';
import { fetchCards } from './store/pokemoncards';

/**
 * COMPONENT
 */
class Routes extends Component {
  async componentDidMount() {
    await this.props.fetchCardsFromServer();
    console.log(this.props);
  }

  render() {
    //const {isLoggedIn} = this.props

    return (
      <div>
        <Switch>
          <Route exact path="/" component={Login} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={Signup} />
          <Route exact path="/cards" component={pokemonCards} />
          <Route exact path="/cards/:id" component={SingleCardView} />
        </Switch>
      </div>
    );
  }
}

/**
 * CONTAINER
 */
// const mapState = state => {
//   return {
//     // Being 'logged in' for our purposes will be defined has having a state.auth that has a truthy id.
//     // Otherwise, state.auth will be an empty object, and state.auth.id will be falsey
//     isLoggedIn: !!state.auth.id
//   }
// }

//
const mapState = (state) => {
  return {
    cards: state.cards,
  };
};

const mapDispatch = (dispatch, { history }) => {
  return {
    fetchCardsFromServer: () => dispatch(fetchCards()),
  };
};

export default connect(mapState, mapDispatch)(Routes);
