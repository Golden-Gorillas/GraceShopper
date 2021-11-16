/*eslint-disable*/
import React, { Component } from 'react';
import { connect } from 'react-redux';
import StripeCheckout from 'react-stripe-checkout';
import { loadStripe } from '@stripe/stripe-js';
import axios from 'axios';
import { toast } from 'react-toastify';
import { emptyCart } from '../store/usercart';

const PUBLIC_KEY =
	'pk_test_51JvSqJLOSRd631P9xi33Di1YywXZ1WnSLmbJ77NM9K0eF5wXWvX2uHNLrK3UO2VNskjo2sojffSJBs5ZUAgQrrB300eEnHMpW5';

const stripePromise = loadStripe(PUBLIC_KEY);

export class StripeContainer extends Component {
	constructor(props) {
		super(props);
		this.onToken = this.onToken.bind(this);
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
			toast('Success! check email thank you for your purchase', {
				type: 'success',
			});
			this.props.clearCart(this.props.product);
		} else {
			toast('Failure, something went wrong ', { type: 'error' });
		}
	}

	render() {
		const { price } = this.props;
		if (price) {
			toast('Success! check email thank you for your purchase', {
				type: 'success',
			});
		}
		return (
			<StripeCheckout
				stripeKey={PUBLIC_KEY}
				token={(res) => this.onToken(res)}
				billingAddress
				shippingAddress
				price={price * 100}
				name='Golden Gorillas'
			/>
		);
	}
}

const mapDispatch = (dispatch) => {
	return {
		clearCart: (cart) => dispatch(emptyCart(cart)),
	};
};

export default connect(null, mapDispatch)(StripeContainer);
