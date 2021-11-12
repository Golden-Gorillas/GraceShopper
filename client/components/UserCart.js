import React from 'react';
import { connect } from 'react-redux';
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
                  </div>
                  <button onClick={() => deleteCard(cart.id, card.id)}>
                    X
                  </button>
                </div>
              );
            })}
      </div>
    );
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
    loadCart: (id) => dispatch(fetchCart(id)),
    deleteCard: (cartId, card) => dispatch(removeSpecifiedCard(cartId, card)),
    updateQuantity: (cartId, cardId, quantity) =>
      dispatch(setQuantity(cartId, cardId, quantity)),
  };
};

export default connect(mapState, mapDispatch)(UserCart);
