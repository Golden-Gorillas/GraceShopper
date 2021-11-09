import React from 'react'
import {connect} from 'react-redux'

const dummyData =[
  {
    cardId: 1,
    name: "dummyCHARIZARD - 4/102 - HOLO RARE (CLASSIC COLLECTION)",
    price: 160.00,
    description: "this card is in mint condition and very rare",
    imageUrl: "https://cdn.shopify.com/s/files/1/1704/1809/products/27_19cc09e1-f0dc-4a7d-b87c-6049d6b5896b_324x.jpg?v=1633532772",
    inStock: true,
    rarity: "rare",
    type: "fire",
  },
  {
    cardId: 2,
    name: "dummyBLASTOISE - 2/102 - HOLO RARE (CLASSIC COLLECTION)",
    price: 20.00,
    description: "this card is in good condition and rare",
    imageUrl: "https://cdn.shopify.com/s/files/1/1704/1809/products/26_6c312927-2d55-4614-a78e-b5e77bfb1e0b_324x.jpg?v=1633532745",
    inStock: true,
    rarity: "rare",
    type: "water",
  }
]
/**
 * COMPONENT
 */
export const Home = props => {



    const cards = dummyData
    return (
      <div>
        hello World
      <div/>
        <div>
          <img className = "banner" src="http://frugalfindsduringnaptime.com/wp-content/uploads/2019/07/pokemon-channel.jpg"/>
        </div>
        <div>
        {cards.map((card) => (
          <div className= "cardCard" key = {card.cardId}>
            <img src= {card.imageUrl}/>
            <h6>{card.name}</h6>
            <p>${card.price}</p>
          </div>
        ))}
        </div>
      </div>
    )




}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    username: state.auth.username
  }
}

export default connect(mapState)(Home)
