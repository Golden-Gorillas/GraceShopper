import React from 'react';
import { connect } from 'react-redux';
import { fetchCart, removeSpecifiedCard } from '../store/usercart';

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

	render() {
		return (
			<div>
				{!this.props.cart.cards
					? 'No Data'
					: this.props.cart.cards.map((card) => {
							return (
								<div>
									<div>
										<div>
											<img className='cartImage' src={card.imageUrl} />
										</div>
										<div>{card.name}</div>
										<div>{card.price}</div>
										<div>{card.stock}</div>
									</div>
									<button
										onClick={() =>
											this.props.deleteCard(this.props.cart.id, card.id)
										}>
										X
									</button>
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
		deleteCard: (cartId, card) => dispatch(removeSpecifiedCard(cartId, card)),
	};
};

export default connect(mapState, mapDispatch)(UserCart);
