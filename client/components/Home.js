import React, {Component} from 'react';
import { connect } from 'react-redux';
import { fetchCards } from "../store/pokemoncards";
import { Link } from "react-router-dom"


/**
 * COMPONENT
 */
export class Home extends Component {


  componentDidMount(){
    this.props.getCards()
  }

  render(){
    const { cards = [] } = this.props.cards;
  console.log("home", cards);
  let count = 0;
  return (
    <div>
      <div className="banner">
        <div className="bannerText">
          <h1>Golden Gorillas</h1>
          <h1>Pokemon Card Store</h1>
        </div>
        {/* <img className="banner" src="http://frugalfindsduringnaptime.com/wp-content/uploads/2019/07/pokemon-channel.jpg"/> */}
      </div>
      <div className="cardsContainer">
        {cards.filter((card) => card.rarity === "legendary").map((card) => {
          if(count < 5) {
            count++
            return (
          <div className="cards" key={card.id}>
            <Link to= {`/cards/${card.id}`}>
          <img src={card.imageUrl} />
          <h6>{card.name}</h6>
          <p>${card.price}</p>
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
      cards: state.cards
  }
}
const dispatchprops = (dispatch) => ({
  getCards: ()=> dispatch(fetchCards())

})

export default connect(stateprops, dispatchprops)(Home)
