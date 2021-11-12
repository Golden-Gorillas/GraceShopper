import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom'
import { fetchCards } from '../store/pokemoncards';


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
		const { cards = [] } = this.props;
		console.log(this.props);
		//const sorted = [...cards].sort()
		return (
			<div>
				<select>
					<option>Lowest->Highest</option>
					<option>Highest->Lowest</option>
					<option>A-Z</option>
				</select>
				<h1>card list</h1>
				<div className='cardsContainer'>
					{cards.map((card) => (
						<div className='singleRowContainer' key={card.id}>
							
							<Link className="namelink" to={`/cards/${card.id}`} ><h1 id="cardname">{card.name}</h1></Link>
							
							
							<p className="price">$ {card.price}</p>
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
