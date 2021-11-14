import React from 'react';
import { connect } from 'react-redux';
import { fetchCart, removeSpecifiedCard } from '../store/usercart';

export class UserCart extends React.Component {
	constructor() {
		super()
		this.state = {
			guestCart: []
		}
	}
	componentDidMount() {
		//Guest Token
		//Guest Cart

		/*Will always have a initState = cart {
			cards []
		}


		When we click logIn/Signup => authenticate
			move the localStorage guestCart into the userCart - check store/auth.js

		*/
		let cartId = window.localStorage.getItem('cartId');
		if (!cartId || cartId === undefined) {
			cartId = JSON.stringify(this.props.id.cart.id);
			window.localStorage.setItem('cartId', cartId);
		}

		this.props.loadCart(JSON.parse(cartId));
	}

	render() {
		console.log(this.state);
		const { cart, deleteCard } = this.props;
		return (
			<div>
				{!cart.cards
					? 'No Data'
					: cart.cards.map((card) => {
							return (
								<div key={card.id}>
									<div>
										<div>
											<img className='cartImage' src={card.imageUrl} />
										</div>
										<div>{card.name}</div>
										<div>{card.price}</div>
										{console.log(cart)}
										<div>{card.stock}</div>

										{/* <label for="Quantity">Quantity</label> */}
										<input
											type='number'
											id='quantity'
											min='1'
											max={card.stock}
										/>
										<input type='submit' />
									</div>
									<button onClick={() => deleteCard(cart.id, card.id)}>
										X
									</button>
								</div>
							);
					  })}
				<button type='button'>CHECKOUT</button>
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
