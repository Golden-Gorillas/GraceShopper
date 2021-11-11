import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchCards } from '../store/pokemoncards';
import { addCardToCart } from '../store/usercart';
import axios from 'axios';

// if we have issues check props :)

export class PokemonCards extends Component {
	constructor(props) {
		super(props);
	}
	componentDidMount() {
		this.props.getCards();
	}
	render() {
		const { cards = [], id, addToCart } = this.props;
		const cart = id.cart;
		return (
			<div>
				<h1>card list</h1>
				<div className='cardsContainer'>
					{cards.map((card) => (
						<div className='singleContainer' key={card.id}>
							<div>
								<Link to={`/cards/${card.id}`}>
									<h1>{card.name}</h1>
								</Link>
							</div>
							<p>{card.price}</p>
							<img src={card.imageUrl} />
							<button onClick={() => addToCart(cart.id, card.id)}>
								Add to Cart
							</button>
						</div>
					))}
				</div>
			</div>
		);
	}
}

const stateprops = (state) => {
	return {
		id: state.auth,
		cards: state.cards,
	};
};
const dispatchprops = (dispatch) => ({
	getCards: () => dispatch(fetchCards()),
	addToCart: (cartId, cardId) => dispatch(addCardToCart(cartId, cardId)),
});

export default connect(stateprops, dispatchprops)(PokemonCards);
