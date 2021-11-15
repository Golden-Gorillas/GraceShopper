import React, { Component } from "react";
import { connect } from "react-redux";
// import { filterCardsByRarity } from "../store/pokemoncards";

class Filter extends Component {
  constructor(){
    super();
    this.state={
      filter: []
    }
    this.filter = this.filter.bind(this)
  }

  filter(ways){
    const {cards = []} = this.props
    switch(ways){
      case "RARITY":
        break;
      case "PRICE":
        const sorted = cards.sort((card1, card2) => card1.price-card2.price)
        this.setState({filter: sorted})
        break;
      case "DECENDINGPRICE":
        const sortedx = cards.sort((card1, card2) => card2.price-card1.price)
        this.setState({filter: sortedx})
        break;
      case "A-Z":
        function compare( a, b ) {
          if ( a.name < b.name ){
            return -1;
           }
          if ( a.name > b.name ){
            return 1;
            }
             return 0;
        }
        const sortedz = cards.sort(compare)
        this.setState({filter: sortedz})
        break;

      default:
        break;
    }
    console.log(ways)
  }
  render() {
    return (
      <div>
        <label>
            {" "}
            Filter Rarity
            <select
              onChange={(event) => {
                this.filter(
                  event.target.value
                );
              }}
            >
              <option value="RARITY">rarity</option>
              <option value="PRICE">price</option>
              <option value="DECENDINGPRICE">Decending</option>
              <option value="A-Z">A-Z</option>
            </select>
          </label>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  cards: state.cards.cards,
  filteredCards: state.filteredCards,
  rarity: state.cards.rarity
});


export default connect(mapStateToProps)(Filter);
