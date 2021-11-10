import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom'
import { fetchCards } from '../store/pokemoncards';


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
						<div className='singleRowContainer' key={card.id}>
							<div>
								<Link to={`/cards/${card.id}`} ><h1>{card.name}</h1></Link>
							</div>	
							<p className="price">{card.price}</p>
							<img className="card" src={card.imageUrl} />
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
