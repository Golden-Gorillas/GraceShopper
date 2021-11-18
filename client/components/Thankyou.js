import React, {Component} from "react";

export default class Thankyou extends Component{
    constructor(props){
        super(props)
    }
    render(){
        const {email} = this.props
        return(
        <div className="ThankyouContainer">
            <h1 className="titleThankyou"> Thank You For Your Purchase </h1>
            <div >
                <img id="GGLogoTy" src="GoldenGorLOGO.png" />
            </div>

        </div>
        )
    }

}
// class="animate__animated animate__bounce" 