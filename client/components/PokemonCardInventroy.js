import React, {Component} from "react";
import { connect } from "react-redux";
import { fetchCards } from "../store/pokemoncards";

// if we have issues check props :)

export class PokemonCards extends Component{
    constructor(props){
        super(props)

    }
    componentDidMount(){
        this.getCards()
    }
    render(){
        
        const {cards=[]} = this.props
        //console.log(this.props)

        return (
            <div>
                <h1>card list</h1>
                <div className="cardsContainer">
                {
                        cards.map((card) =>(
                            <div className="cards" key= {card.id}>
                                <h6>{card.name}</h6>
                                <p>{card.price}</p>
                            </div>
                        ))
                    }
                </div>
            </div>
        )
    }
}

const stateprops = (state) => {
    return {
        cards: state.cards
    }
}

const dispatchprops = (dispatch)=>{
    return{
        getCards : ()=> dispatch(fetchCards())
    }
}

export default connect(stateprops, dispatchprops)(PokemonCards)