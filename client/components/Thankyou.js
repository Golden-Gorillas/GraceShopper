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
        </div>
        )
    }

}