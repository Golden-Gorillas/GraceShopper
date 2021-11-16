/*eslint-disable*/
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchCards } from '../store/pokemoncards';
import { addCardToCart } from '../store/usercart';
import axios from 'axios';
// import Filter from './Filter';

// if we have issues check props :)

export class PokemonCards extends Component {
	constructor(props) {
		super(props);
		this.state = {
			filter: [],
		};
		this.filter = this.filter.bind(this);
	}
	componentDidMount() {
		this.props.getCards();
	}

	filter(ways) {
		const { cards = [] } = this.props;
		switch (ways) {
			case 'RARITY':
				const rarity = cards.filter((card) => card.rarity === value);
				break;
			case 'PRICE':
				const sorted = cards.sort((card1, card2) => card1.price - card2.price);
				this.setState({ filter: sorted });
				break;
			case 'DECENDINGPRICE':
				const sortedx = cards.sort((card1, card2) => card2.price - card1.price);
				this.setState({ filter: sortedx });
				break;
			case 'A-Z':
				function compare(a, b) {
					if (a.name < b.name) {
						return -1;
					}
					if (a.name > b.name) {
						return 1;
					}
					return 0;
				}
				const sortedz = cards.sort(compare);
				this.setState({ filter: sortedz });
				break;

			default:
				break;
		}
		console.log(this.state.filter);
	}

	render() {
		const { id, addToCart } = this.props;
		const cart = id.cart;
		if (!this.props.cards) return <div>waiting</div>;
		return (
			<div>
				<div>
					<div>
						<label>
							{' '}
							Filter Rarity
							<select
								onChange={(event) => {
									this.filter(event.target.value);
								}}>
								<option value='Common'>rarity</option>
								<option value='Uncommon'>rarity</option>
								<option value='Rare'>rarity</option>
								<option value='Legendary'>rarity</option>
								<option value='PRICE'>price</option>
								<option value='DECENDINGPRICE'>Decending</option>
								<option value='A-Z'>A-Z</option>
							</select>
						</label>
					</div>
				</div>
				<h1>card list</h1>
				<div className='cardsContainer'>
					{this.props.cards.map((card) => (
						<div className='singleRowContainer' key={card.id}>
							<Link className='nameLink' to={`/cards/${card.id}`}>
								<h1 id='cardname'>{card.name}</h1>
							</Link>

							<p className='price'>
								<strong>
									In stock:{' '}
									{card.stock < 5 ? (
										<font color='red'> {card.stock} </font>
									) : (
										<font color='green'>{card.stock} </font>
									)}
								</strong>{' '}
								<br />
								<strong>Price: </strong>$ {card.price.toFixed(2)}
							</p>
							<img className='card' src={card.imageUrl} />
							<br />
							<div className='buttonMain'>
								<button
									type='button'
									onClick={() => {
										if (!this.props.id.id) {
											addToCart('', card.id);
										} else {
											addToCart(cart.id, card.id);
										}
									}}>
									Add to Cart
								</button>
							</div>
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
