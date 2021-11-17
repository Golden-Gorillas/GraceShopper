/*eslint-disable*/
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchCards } from '../store/pokemoncards';
import { addCardToCart } from '../store/usercart';
import { setCardFilter } from '../store/filterCards';
import axios from 'axios';
import Filter from './Filter';

export class PokemonCards extends Component {
	constructor(props) {
		super(props);
		this.state = {
			filter: [],
		};
		this.sort = this.sort.bind(this);
	}
	async componentDidMount() {
		await this.props.getCards();
		this.props.cardFilter('all', this.props.cards);
	}

	sort(ways) {
		const cards = this.props.filteredCards;
		switch (ways) {
			case 'PRICE':
				const sorted = cards.sort((card1, card2) => card1.price - card2.price);
				this.setState({ filter: sorted });
				break;
			case 'DESCENDINGPRICE':
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
		console.log(this.state);
	}

	render() {
		const { id, addToCart } = this.props;
		const cart = id.cart;
		if (!this.props.filteredCards && !this.props.cards)
			return <div>waiting</div>;
		return (
			<div className='homeContainer'>
				<div className='banner2'>
					<div class='bannerInner'>
						<div className='bannerText'>
							<h1 className='inventoryBannerHeader'>View our inventory</h1>
						</div>
						<div class='filterHeader'>
							<Filter />
							<label>
								{' '}
								Sort
								<select
									onChange={(event) => {
										this.sort(event.target.value);
									}}>
									<option value='PRICE'>Ascending price</option>
									<option value='DESCENDINGPRICE'>Descending Price</option>
									<option value='A-Z'>A-Z</option>
								</select>
							</label>
						</div>
					</div>
				</div>
				<div className='mainContainer'>
					<div className='cardsContainer'>
						{this.props.filteredCards.map((card) => (
							<div className='singleRowContainer' key={card.id}>
								<Link className='nameLink' to={`/cards/${card.id}`}>
									<h1 id='cardname'>{card.name}</h1>
								</Link>

								<p className='price'>
									<strong> Rarity: </strong> {card.rarity}
									<br />
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
										className='buyadd'
										type='button'
										onClick={() => {
											if (!this.props.id.id) {
												addToCart('', card);
											} else {
												addToCart(cart.id, card);
											}
										}}>
										Add to Cart
									</button>
								</div>
							</div>
						))}
					</div>
				</div>
			</div>
		);
	}
}

const stateprops = (state) => {
	return {
		id: state.auth,
		cards: state.cards,
		filteredCards: state.filter.cards,
	};
};
const dispatchprops = (dispatch) => ({
	getCards: () => dispatch(fetchCards()),
	addToCart: (cartId, cardId) => dispatch(addCardToCart(cartId, cardId)),
	cardFilter: (rarity, cards) => dispatch(setCardFilter(rarity, cards)),
});

export default connect(stateprops, dispatchprops)(PokemonCards);
