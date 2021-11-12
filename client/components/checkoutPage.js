
import React, {Component} from "react"
import { connect } from "react-redux"

export default class Checkout extends Component{
    constructor(props){
        super(props)
    }
    componentDidMount(){
        
    }
    render(){
        console.log(this.props)
        return (<div>Checkoutpage</div>)
    }
}


// const mapstate = state =>{
//     return{

//     }
// }

// const mapdispatch = dispatch =>{
//     return {

//     }
// }

// export default connect(mapstate, mapdispatch)(Checkout)