import React, { Component } from "react";
import { connect } from "react-redux";
import { setCardFilter } from "../store/filterCards";

class Filter extends Component {





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
