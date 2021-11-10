import React, {Component} from "react";
import { connect } from "react-redux";
import { fetchCards } from "../store/pokemoncards";
import axios from "axios";


// if we have issues check props :)

export class PokemonCards extends Component{
    constructor(props){
        super(props)
    }
    componentDidMount(){
        this.props.getCards()
    }
    render(){
        const {cards=[]} = this.props
        console.log(this.props)

        return(
        <div>
            <div>
                {
                    cards.map(card=>{return(
                    <div key={card.id} className="cards">
                        <h1>{card.name}</h1>
                        <h3></h3>
                    </div>)})
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
const dispatchprops = (dispatch) => ({
    getCards: ()=> dispatch(fetchCards())
        
})

export default connect(stateprops, dispatchprops)(PokemonCards)