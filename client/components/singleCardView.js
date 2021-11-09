import React, {Component} from "react";
import { connect } from "react-redux";

const card = {
    name : "Charizard",
    price: 100,
    discription:"Card Text:Pokemon Power: Energy Burn As often as you like during your turn \
    (before you attack), you may turn all Energy attached to Charizard in R Energy for this rest of the turn. This power can't \
    be used if Charizard is Asleep, Confused, or Paralyzed. \
    Attack 1:(🔥🔥🔥🔥) Fire Spin (100) \
    Discard 2 Energy cards attached to Charizard in order to use this attack.", 
    imageUrl: 'https://product-images.tcgplayer.com/fit-in/400x558/250320.jpg'
}

export default class SingleCardView extends Component{
    constructor(){
        super()
        this.state = {
            pokemoncard : card
        }
    }
    render(){
        const {name,price,discription,imageUrl} = this.state.pokemoncard
        return (
            <div className="singlecontainer">
                <div>
                    <h1>{name}</h1>
                </div>
                <div className="onepokemoncard">
                    <img className="pokecardcolumn" src={imageUrl}/>
                    <div className= "pokecardtext">{discription}</div>
                </div>
                <div className="buyContainer">
                    <h1 className="price">$ {price}</h1>
                    <button className="buyadd" type='button'>Add/Buy</button>
                </div>
            </div>
        )
    }
}