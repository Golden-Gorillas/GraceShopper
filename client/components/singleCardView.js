import React, {Component} from "react";
import { connect } from "react-redux";
import { fetchCard } from "../store/pokemoncard";


const pokemoncard = {
    name : "Charizard",
    price: 100,
    description:"Card Text:Pokemon Power: Energy Burn As often as you like during your turn \
    (before you attack), you may turn all Energy attached to Charizard in R Energy for this rest of the turn. This power can't \
    be used if Charizard is Asleep, Confused, or Paralyzed. \
    Attack 1:(🔥🔥🔥🔥) Fire Spin (100) \
    Discard 2 Energy cards attached to Charizard in order to use this attack.", 
    imageUrl: 'https://product-images.tcgplayer.com/fit-in/400x558/250320.jpg'
}

class SingleCardView extends Component{
    constructor(){
        super()
        this.state = {
            card : pokemoncard
        }
    }
    componentDidMount(){
        this.props.getCard(this.props.match.params.id)
    }
    render(){
        const {name,price,description,imageUrl,stock,rarity} = this.props.card
        return (
            <div className="singlecontainer">
                <div className="singlecardTitle">
                    <h1>{name}</h1>
                    <h5 id="stock">{stock>0 ? 'InStock': 'Not Avalible'}</h5>
                </div>
                <div className="onepokemoncard">
                    <div className="cardpic">
                        <img className="pokecardcolumn" src={imageUrl}/>
                    </div>
                    <div className= "pokecardtext">{description}<br/>{rarity}</div>
                </div>
                <div className="buyContainer">
                    <h2>$</h2>
                    <h1 className="price">{price}</h1>
                    <button className="buyadd" type='button'>Add/Buy</button>
                </div>
            </div>
        )
    }
}

const stateprops = state =>{
    return {
        card: state.card
    }
}
const dispatchprops = dispatch =>{
    return{
        getCard: (id)=> dispatch(fetchCard(id))
    }
}

export default connect(stateprops, dispatchprops)(SingleCardView)