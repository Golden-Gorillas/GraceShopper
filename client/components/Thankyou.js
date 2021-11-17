import React, {Component} from "react";

export default class Thankyou extends Component{
    constructor(props){
        super(props)
    }
    render(){
        const {email} = this.props
        return(
        <div>
            <h1> Thank You For Your Purchase {email}</h1>
            <img src="GoldenGorillaLOGO.png.jpg" alt='Golden Gorrillas' width="300" height="300" />
        </div>
        )
    }

}