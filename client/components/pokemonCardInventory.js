import React, { Component } from 'react';
import { connect } from 'react-redux';

// if we have issues check props :)

class pokemonCards extends Component {
	render() {
		const cards = this.props.cards;
		console.log(cards);
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

const mapStatetoProps = (state) => {
	return {
		cards: state.cards,
	};
};

export default connect(mapStatetoProps, null)(pokemonCards);
