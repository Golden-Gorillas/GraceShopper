import React, {Component} from "react";
import { connect } from "react-redux";
import { fetchCard } from "../store/pokemoncard";


// empty string temp fix 
const tempDescription = " Check back for further updates enjoy this quote while you wait. \
'Anyone who has never made a mistake has never tried anything new'- Albert Einstein"

class SingleCardView extends Component{
   
    componentDidMount(){
        this.props.getCard(this.props.match.params.id)
    }
    render(){
        const {name,price,description,imageUrl,stock,rarity, type} = this.props.card
        return (
            <div className="singlecontainer">
                <div className="singlecardTitle">
                    <h1 id="singlecardname">{name}</h1>
                    <h5 id="stock">{stock>0 ? 'InStock': 'Not Avalible'}</h5>
                </div>
                <div className="onepokemoncard">
                    <div className="cardpic">
                        <img className="pokecardcolumn" src={imageUrl}/>
                    </div>
                    <div className= "pokecardtext">{description===''? tempDescription: description}<br/><br/>{rarity} {type}</div>
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