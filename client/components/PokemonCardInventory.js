import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchCards } from '../store/pokemoncards';
import { addCardToCart } from '../store/usercart';
import axios from 'axios';
import Filter from './Filter'

// if we have issues check props :)

export class PokemonCards extends Component {
	constructor(props) {
		super(props);
		this.state = {
			test: []
		}
	}
	componentDidMount() {
		this.props.getCards();
	}
	render() {
		const { id, addToCart } = this.props;
		const cart = id.cart;
		if(!this.props.cards) return (<div>waiting</div>)
		return (
			<div>
				<div>
				<Filter />
				</div>
				<h1>card list</h1>
				<div className='cardsContainer'>
					{this.props.cards.map((card) => (
						<div className='singleRowContainer' key={card.id}>
							<Link className="nameLink" to={`/cards/${card.id}`} ><h1 id="cardname">{card.name}</h1></Link>
							
							<p className="price">{card.price}</p>
							<img className="card" src={card.imageUrl} />
							<br/>
						    <button type="button" onClick={() => addToCart(cart.id, card.id)}>
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
