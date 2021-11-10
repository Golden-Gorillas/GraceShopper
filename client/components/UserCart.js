import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchCart } from '../store/usercart';

export class UserCart extends React.Component {
	componentDidMount() {
		this.props.loadCart(this.props.match.params.id);
	}
	render() {
		console.log(this.props.cart);
		return <div>Cart</div>;
	}
}

const mapState = (state) => {
	return {
		cart: state.cart,
	};
};

const mapDispatch = (dispatch, { history }) => {
	return {
		loadCart: (id) => dispatch(fetchCart(id)),
	};
};

export default connect(mapState, mapDispatch)(UserCart);
