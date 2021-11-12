import React from 'react';
import { connect } from 'react-redux';
import { fetchCart, removeSpecifiedCard, setQuantity } from '../store/usercart';

export class UserCart extends React.Component {
<<<<<<< Updated upstream
  componentDidMount() {
    let cartId = window.localStorage.getItem('cartId');
    if (!cartId || cartId === undefined) {
      cartId = JSON.stringify(this.props.id.cart.id);
      window.localStorage.setItem('cartId', cartId);
    }
    this.props.loadCart(JSON.parse(cartId));
  }

  render() {
    const { cart, deleteCard } = this.props;
    return (
      <div>
        {!cart.cards
          ? 'No Data'
          : cart.cards.map((card) => {
              return (
                <div key={card.id}>
                  <div>
                    <div>
                      <img className="cartImage" src={card.imageUrl} />
                    </div>
                    <div>{card.name}</div>
                    <div>{card.price}</div>
                    <div>{card.cardsInCart.quantity}</div>

                    <form onSubmit={this.handleSubmit}>
                      <input
                        type="number"
                        id="quantity"
                        min="1"
                        max={card.stock}
                      />

                      <button
                        type="submit"
                        onClick={(event) => {
                          event.preventDefault();

                          if (event.target.previousSibling.value > card.stock) {
                            return;
                          } else {
                            this.props.updateQuantity(
                              this.props.cart.id,
                              card.id,
                              event.target.previousSibling.value
                            );
                          }
                        }}
                      >
                        Change Quantity{' '}
                      </button>
                    </form>
                  </div>
                  <button onClick={() => deleteCard(cart.id, card.id)}>
                    X
                  </button>
                </div>
              );
            })}
        <button type="button">CHECKOUT</button>
      </div>
    );
  }
=======
	componentDidMount() {
		//Guest Token
		//Guest Cart

		let cartId = window.localStorage.getItem('cartId');
		// if (!cartId || cartId === undefined) {
		if (this.props.id === {}) {
			//If we have don't have a props.id => Guest
			//Create a cartId Token and save it to the localStorage

			cartId = JSON.stringify(this.props.id.cart.id);
			// userId = JSON.stringify(this.props.id.id);
			window.localStorage.setItem('cartId', cartId);
		}

		this.props.loadCart(JSON.parse(cartId));
	}

	render() {
		const { cart, deleteCard } = this.props;
		return (
			<div>
				{!cart.cards
					? 'No Data'
					: cart.cards.map((card) => {
							return (
								<div key={card.id}>
									<div>
										<div>
											<img className='cartImage' src={card.imageUrl} />
										</div>
										<div>{card.name}</div>
										<div>{card.price}</div>
										{console.log(cart)}
										<div>{card.stock}</div>

										{/* <label for="Quantity">Quantity</label> */}
										<input
											type='number'
											id='quantity'
											min='1'
											max={card.stock}
										/>
										<input type='submit' />
									</div>
									<button onClick={() => deleteCard(cart.id, card.id)}>
										X
									</button>
								</div>
							);
					  })}
				<button type='button'>CHECKOUT</button>
			</div>
		);
	}
>>>>>>> Stashed changes
}

const mapState = (state) => {
  return {
    cart: state.cart,
    id: state.auth,
  };
};

const mapDispatch = (dispatch, { history }) => {
  return {
    loadCart: (id) => dispatch(fetchCart(id)),
    deleteCard: (cartId, card) => dispatch(removeSpecifiedCard(cartId, card)),
    updateQuantity: (cartId, cardId, quantity) =>
      dispatch(setQuantity(cartId, cardId, quantity)),
  };
};

export default connect(mapState, mapDispatch)(UserCart);
