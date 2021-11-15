import React from 'react';
import { connect } from 'react-redux';
<<<<<<< HEAD
import { fetchCart, removeSpecifiedCard } from '../store/usercart';

export class UserCart extends React.Component {
	componentDidMount() {
		//Guest Token
		//Guest Cart

<<<<<<< HEAD
=======
import { Link } from 'react-router-dom';
import { fetchCart, removeSpecifiedCard, setQuantity } from '../store/usercart';

export class UserCart extends React.Component {

  componentDidMount() {
    let cartId = window.localStorage.getItem('cartId');
    if (!cartId || cartId === undefined) {
      cartId = JSON.stringify(this.props.id.cart.id);
      window.localStorage.setItem('cartId', cartId);
    }
    this.props.loadCart(JSON.parse(cartId));
  }
 
>>>>>>> 60f307f37667ed9c03aec509ea5b003f79cac4e6
  render() {
    const { cart, deleteCard } = this.props;
    const priceQuantity = (cardQty, cardPrice) => {
      let total = cardQty * cardPrice;
      return total.toFixed(2);
    };
    return (
      <div className="cart">
        <h2>
          <center>Your Cart</center>
        </h2>
        <table>
          <thead>
            <tr>
              <th>Card</th>
              <th>Card Details</th>
              <th>Price ($USD)</th>
              <th>Total in Cart</th>
              <th>
                Total Price
                <br /> ($USD)
              </th>
              <th>Changes to Cart</th>
            </tr>
          </thead>
          <tbody>
            {!cart.cards
              ? 'Loading'
              : cart.cards.map((card) => {
                  return (
                    <tr key={card.id}>
                      <td className="cartImageTD">
                        <img className="cartImage" src={card.imageUrl} />
                      </td>
                      <td>
                        <strong>Card name:</strong> {card.name} <br />
                        <strong>Card rarity:</strong>{' '}
                        {card.rarity === 'legendary'
                          ? 'Legendary'
                          : card.rarity}{' '}
                        <br />
                        <strong>Card descrption:</strong>{' '}
                        {!card.description
                          ? 'There is no description for this card'
                          : card.description}
                      </td>

                      <td className="cartPrice">$ {card.price.toFixed(2)}</td>
                      <td className="cartQty">
                        <strong>{card.cardsInCart.quantity}</strong> of{' '}
                        {card.stock}
                      </td>
                      <td className="cartTotalPrice">
                        $ {priceQuantity(card.cardsInCart.quantity, card.price)}
                      </td>
                      <td>
                        <form onSubmit={this.handleSubmit}>
                          <input
                            className="cartInput"
                            type="number"
                            id="quantity"
                            min="1"
                            max={card.stock}
                          />

                          <button
                            type="submit"
                            onClick={(event) => {
                              event.preventDefault();

                              if (
                                event.target.previousSibling.value > card.stock
                              ) {
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
                            Change Quantity
                          </button>
                        </form>
                        <br />
                        <button onClick={() => deleteCard(cart.id, card.id)}>
                          Delete from cart
                        </button>
                      </td>
                    </tr>
                  );
                })}
          </tbody>
          <tfoot>
            <tr>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <th scope="row" colSpan="1">
                Total Price:
              </th>
              <td colSpan="1">
                <center>
                  <strong>
                    $
                    {!cart.cards
                      ? ''
                      : cart.cards
                          .map((card) => {
                            return card.price * card.cardsInCart.quantity;
                          })
                          .reduce((accum, next) => {
                            return (accum = accum + next);
                          })
                          .toFixed(2)}
                  </strong>
                </center>
              </td>
            </tr>
          </tfoot>
        </table>
        <div className="checkOutButton">
<<<<<<< HEAD
          <button className="" type="button">
            CHECKOUT
          </button>
=======
        <Link to={{pathname:`/checkout/${cart.id}`, total: ()=>cart.cards.map(card => card.price).reduce((a,b)=> a + b)}} ><button type="button">CHECKOUT</button></Link>
>>>>>>> 60f307f37667ed9c03aec509ea5b003f79cac4e6
        </div>
      </div>
    );
  }
=======
		/*Will always have a initState = cart {
			cards []
		}


		When we click logIn/Signup => authenticate
			move the localStorage guestCart into the userCart - check store/auth.js
			
		*/
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
>>>>>>> 054f886a43ffeb52ec7f67ce787b62a0405cdac6
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
	};
};

export default connect(mapState, mapDispatch)(UserCart);
