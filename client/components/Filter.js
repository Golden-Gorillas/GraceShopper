import React, { Component } from "react";
import { connect } from "react-redux";
import { filterCardsByRarity } from "../store/pokemoncards";

class Filter extends Component {
  render() {
    return (
      <div>
        <label>
            {" "}
            Filter Rarity
            <select
              value={this.props.size}
              onChange={(event) => {
                this.props.filterCardsByRarity(
                  this.props.cards,
                  event.target.value
                );
              }}
            >
              <option value="">ALL</option>
              <option value="common">Common</option>
              <option value="rare">Rare</option>
              <option value="legendary">Legendary</option>
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


export default connect(mapStateToProps, { filterCardsByRarity })(Filter);
