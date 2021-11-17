/*eslint-disable*/
import React, { Component } from 'react';
import { connect } from 'react-redux';
import StripeCheckout from 'react-stripe-checkout';
import { loadStripe } from '@stripe/stripe-js';
import axios from 'axios';
import { emptyCart } from '../store/usercart';
import { Redirect } from 'react-router';
import Thankyou from './Thankyou';
const PUBLIC_KEY =
	'pk_test_51JvSqJLOSRd631P9xi33Di1YywXZ1WnSLmbJ77NM9K0eF5wXWvX2uHNLrK3UO2VNskjo2sojffSJBs5ZUAgQrrB300eEnHMpW5';

const stripePromise = loadStripe(PUBLIC_KEY);

export class StripeContainer extends Component {
	constructor(props) {
		super(props);
		this.state = {
			success: false
		}
		this.onToken = this.onToken.bind(this);
		this.redirectpage = this.redirectpage.bind(this)
	}
	redirectpage(){
		this.setState({success : !this.state.success})
	}
	async onToken(token) {
		const { product, price } = this.props;
		console.log({ token });

		const { data } = await axios.post('/api/payment/checkout', {
			token,
			product,
			price,
		});
		const { status } = data;
		console.log(data);
		if (status === 'success') {
			this.props.clearCart(this.props.product);
			this.redirectpage()
			
		} else {
			alert(" Error with payment")
		}
	}

	render() {
		const { success } = this.state
		const { price, email } = this.props;
		
		return (
			<>
			{ !success ?
			<StripeCheckout
				stripeKey={PUBLIC_KEY}
				token={(res) => this.onToken(res)}
				billingAddress
				shippingAddress
				price={price * 100}
				name='Golden Gorillas'
			/>: 
			 <Redirect push to={{ pathname:"/thankyou" , email }}/>
			}
			</>
		);
	}
}

const mapDispatch = (dispatch) => {
	return {
		clearCart: (cart) => dispatch(emptyCart(cart)),
	};
};

export default connect(null, mapDispatch)(StripeContainer);
