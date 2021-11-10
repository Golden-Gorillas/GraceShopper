import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchCards } from '../store/pokemoncards';
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
		const { cards = [] } = this.props;
		console.log(this.props);

		return (
			<div>
				<h1>card list</h1>
				<div className='cardsContainer'>
					{cards.map((card) => (
						<div className='cards' key={card.id}>
							<h6>{card.name}</h6>
							<p>{card.price}</p>
							<img src={card.imageUrl} />
						</div>
					))}
				</div>
			</div>
		);
	}
}

const stateprops = (state) => {
	return {
		cards: state.cards,
	};
};
const dispatchprops = (dispatch) => ({
	getCards: () => dispatch(fetchCards()),
});

export default connect(stateprops, dispatchprops)(PokemonCards);
