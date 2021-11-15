
import React, {Component} from "react"
import { connect } from "react-redux"
import cardReducer from "../store/pokemoncard";
import { fetchCart, removeSpecifiedCard, setQuantity } from '../store/usercart';
import StripeContainer from "./stripeContainer";



class Checkout extends Component{
    constructor(props){
        super(props)

        this.state={
            firstname:"", lastname:"", email:"",
            address:"", country:"USA", town_city:"",
            county_state:"", zipcode: "", re:false, total:0
        }
        
        this.handleChanges = this.handleChanges.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.reRender = this.reRender.bind(this)
        
    }
    componentDidMount(){
        let cartId = window.localStorage.getItem('cartId');
        if (!cartId || cartId === undefined) {
            cartId = JSON.stringify(this.props.id.cart.id);
            window.localStorage.setItem('cartId', cartId);
        }
        this.props.loadCart(JSON.parse(cartId));
    }

    handleChanges(event){
        this.setState({[event.target.name]: event.target.value})
    }
    reRender(choice){

        
        switch(choice){
            case 'Total':
                const total = this.props.cart.cards.map(card => card.price).reduce((a,b)=> a + b)
                
                this.setState({total})
                break   
            default:
                this.setState({re: !this.state.re})
                break

        }
        
    }
    handleSubmit(event){
        event.preventDefault()
        console.log(this.state)
    }
    

    render(){
        
        const {handleChanges, handleSubmit, reRender} = this
        const {firstname, lastname, email, address, country, town_city, county_state, zipcode} = this.state
        const {cart} = this.props
        console.log(cart.cards)
        return (
        <div>
            <div>
                <h1>Checkout</h1>
                <br/>
                <h3>Customer Info</h3>
                <h4>Total : </h4>
                {cart.cards && this.state.total===0 ? reRender('Total'):null }

            </div>
            
            <div>
                <form id="customerInfo" onSubmit={handleSubmit}>

                    <div className="ContainerCustomerInfo">
                        <div className="CustomerFName">
                            <label htmlFor="firstname">First Name</label>
                            <input placeholder="John" name="firstname" value={firstname} onChange={handleChanges}></input>
                        </div>
                        <div className="CustomerLName">
                            <label htmlFor="lastname">Last Name</label>
                            <input placeholder="Doe" name="lastname" value={lastname} onChange={handleChanges}></input>
                        </div>
                        <div className="CustomerEmail">    
                            <label htmlFor="email">Email</label>
                            <input placeholder="abc@example.com" name="email" value={email} onChange={handleChanges}></input>
                        </div>                       
                    </div>

                    <h3>Shipping</h3>

                    <div className="ContainerShippingInfo">
                        <div className="CustomerAddress">
                            <label htmlFor="address">Address</label>
                            <input placeholder=" 123 example street" name="address" value={address} onChange={handleChanges}></input>
                        </div>
                        <div className="CustomerCountry">
                            <label htmlFor="country">Country</label>
                            <input name="country" value={country} onChange={handleChanges}></input>
                        </div>
                        <div className="CustomerCT">
                            <label htmlFor="town_city">Town/City</label>
                            <input placeholder="New York" name="town_city" value={town_city} onChange={handleChanges}></input>
                        </div> 
                        <div className="CustomerState">
                            <label htmlFor="county_state">County/State</label>
                            <input placeholder="NY" name="county_state" value={county_state} onChange={handleChanges}></input>
                        </div>
                        <div className="CustomerZipcode">
                            <label htmlFor="zipcode">Zipcode</label>
                            <input placeholder="00000" name="zipcode" value={zipcode} onChange={handleChanges}></input>
                        </div>
                    </div>
                    <div className="Submitb">
                    
                    { this.state.re ?null :<button type="submit" onClick={()=> reRender('')}>Submit</button>}
                    </div>                     
                </form>
                <div>
                    <h3>Payment</h3>
                    {this.state.re ? <StripeContainer price={this.state.total} product={cart}/> : null}
                </div>
            </div>
        </div>    
        )

    }
}


const mapState = (state) => {
    return {
      cart: state.cart,
      id: state.auth,
    };
  };
  
  const mapDispatch = (dispatch, { history }) => {
    return {
      loadCart: (id) => dispatch(fetchCart(id))
    };
  };
  
  export default connect(mapState, mapDispatch)(Checkout);