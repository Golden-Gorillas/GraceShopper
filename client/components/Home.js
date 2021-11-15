import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchCards } from '../store/pokemoncards';
import { Link } from 'react-router-dom';


/**
 * COMPONENT
 */
export class Home extends Component {
	componentDidMount() {
		this.props.getCards();
	}


  render(){
    const { cards = [] } = this.props;
  console.log("home", cards);
  let count = 0;
  return (
    <div className="homeContainer">
      <div className="banner">
        <div className="bannerText">
          <h1>Featured Legendary Cards!</h1>
        </div>
      </div>
      <div className="featuredCardsContainer">
        {cards.filter((card) => card.rarity === "legendary").map((card) => {
          if(count < 5) {
            count++
            return (
          <div className="cardCard" key={card.id}>
            <Link to= {`/cards/${card.id}`}>
          <img src={card.imageUrl} />
          <div className="cardDetails">
          <p>{card.name}</p>
          <p>${card.price}</p>
          </div>
          </Link>
          </div>
            )}
        })}
      </div>
    </div>
  )
  }
}

/**
 * CONTAINER
 */
const stateprops = (state) => {
	return {
		cards: state.cards,
	};
};
const dispatchprops = (dispatch) => ({
	getCards: () => dispatch(fetchCards()),
});

export default connect(stateprops, dispatchprops)(Home);
