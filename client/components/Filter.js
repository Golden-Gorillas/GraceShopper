import React, { Component } from "react";
import { connect } from "react-redux";
import { setCardFilter } from "../store/filterCards";

class Filter extends Component {


  sort(ways){
    const {cards = []} = this.props
    switch(ways){
      case "RARITY":
        const rarity = cards.filter(card => card.rarity === value)
        break;
      case "PRICE":
        const sorted = cards.sort((card1, card2) => card1.price-card2.price)
        this.setState({filter: sorted})
        break;
      case "DESCENDINGPRICE":
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
    console.log(this.state)
  }


  render() {
    return (
        <div>
        <div>
        <label>
            {" "}
            Filter by Rarity
            <select
              onChange={(event) => {
                this.props.cardFilter(
                  event.target.value, this.props.cards
                );
              }}
            >
              <option value="all">Show All Cards</option>
              <option value="Common">Common</option>
              <option value="Uncommon">Uncommon</option>
              <option value="Rare">Rare</option>
              <option value="Legendary">Legendary</option>
            </select>
          </label>
      </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
   cards: state.cards,
   filteredCards: state.filter.cards

});

const mapDispatchToProps = dispatch => {
  return {
    cardFilter: (rarity, cards) => {
      return dispatch(setCardFilter(rarity, cards))
    }
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Filter);
