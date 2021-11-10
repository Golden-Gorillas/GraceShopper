import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { withRouter, Route, Switch, Redirect } from 'react-router-dom';
import { Login, Signup } from './components/AuthForm';
import Home from './components/Home';
import PokemonCards from './components/PokemonCardInventory';
import SingleCardView from './components/singleCardView';
import { me } from './store';
import UserCart from './components/UserCart';

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
					<Route exact path='/' component={Login} />
					<Route exact path='/login' component={Login} />
					<Route exact path='/signup' component={Signup} />
					<Route exact path='/cards' component={PokemonCards} />
					<Route exact path='/cards/:id' component={SingleCardView} />
					<Route exact path='/cart' component={UserCart} />
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

const mapDispatch = (dispatch) => {
	return {
		loadInitialData() {
			dispatch(me());
		},
	};
};

export default connect(mapState, mapDispatch)(Routes);
