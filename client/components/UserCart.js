import React from 'react';
import { connect } from 'react-redux';
import { fetchCart } from '../store/usercart';

export class UserCart extends React.Component {
	componentDidMount() {
		let cartId = window.localStorage.getItem('cartId');
		if (!cartId || cartId === undefined) {
			cartId = JSON.stringify(this.props.id.cart.id);
			window.localStorage.setItem('cartId', cartId);
		}
		this.props.loadCart(JSON.parse(cartId));
		console.log('componentDidMount', localStorage);
	}

	// componentDidUpdate(prevProps, prevState) {}

	render() {
		console.log('render', this.props);

		return (
			<div>
				{!this.props.cart.cards
					? 'No Data'
					: this.props.cart.cards.map((card) => {
							return (
								<div>
									<div>
										<img className='cartImage' src={card.imageUrl} />
									</div>
									<div>{card.name}</div>
									<div>{card.price}</div>
									<div>{card.stock}</div>
								</div>
							);
					  })}
			</div>
		);
	}
}

const mapState = (state) => {
	return {
		cart: state.cart,
		id: state.auth,
	};
};

const mapDispatch = (dispatch, { history }) => {
	return {
		loadCart: (id) => dispatch(fetchCart(id)),
	};
};

export default connect(mapState, mapDispatch)(UserCart);
