import React, {Component} from 'react';
import { connect } from 'react-redux';
import { fetchCards } from "../store/pokemoncards";
import { Link } from "react-router-dom"

// const dummyData = [
//   {
//     id: 1,
//     name: 'dummyCHARIZARD - 4/102 - HOLO RARE (CLASSIC COLLECTION)',
//     price: 160.0,
//     description: 'this card is in mint condition and very rare',
//     imageUrl:
//       'https://cdn.shopify.com/s/files/1/1704/1809/products/27_19cc09e1-f0dc-4a7d-b87c-6049d6b5896b_324x.jpg?v=1633532772',
//     inStock: true,
//     rarity: 'legendary',
//     type: 'fire',
//   },
//   {
//     id: 2,
//     name: 'dummyBLASTOISE - 2/102 - HOLO RARE (CLASSIC COLLECTION)',
//     price: 20.0,
//     description: 'this card is in good condition and rare',
//     imageUrl:
//       'https://cdn.shopify.com/s/files/1/1704/1809/products/26_6c312927-2d55-4614-a78e-b5e77bfb1e0b_324x.jpg?v=1633532745',
//     inStock: true,
//     rarity: 'legendary',
//     type: 'water',
//   },
//   {
//     id: 3,
//     name: 'dummyCLAYDOL - 15/106 - HOLO RARE (CLASSIC COLLECTION)',
//     price: 20.0,
//     description: 'this card is in good condition and rare',
//     imageUrl:
//       'https://cdn.shopify.com/s/files/1/1704/1809/products/41_829ce7ed-5f8d-48b5-851d-531c7d4da22f_325x.jpg?v=1633532856',
//     inStock: true,
//     rarity: 'rare',
//     type: 'water',
//   },
// ];
/**
 * COMPONENT
 */
export class Home extends Component {

  componentDidMount(){
    this.props.getCards()
  }

  render(){
  const cards = this.props.cards;
  console.log(cards);
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
        {cards.filter((card) => card.rarity === "common").map((card) => {
          if(count < 5) {
            return (
          <div className="cards" key={card.id}>
            <Link to= {`/cards/${card.id}`}>
          <img src={card.imageUrl} />
          <h6>{card.name}</h6>
          <p>${card.price}</p>
          </Link>
          </div>
            )}
        count++
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
