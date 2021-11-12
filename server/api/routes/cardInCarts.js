const router = require('express').Router();
const {
  models: { CardsInCart, Card },
} = require('../../db');

const requireToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    const user = await User.findByToken(token);
    req.user = user;

    if (user.role === 'admin') {
      next();
    } else {
      throw Error('You are not authorized to view this');
    }
  } catch (error) {
    next(error);
  }
};

router.put('/', async (req, res, next) => {
  try {
    const cartId = req.body.data.cartId;
    const cardId = req.body.data.cardId;
    const cardQty = req.body.data.quantity;

    console.log('From the API route', cartId, cardId, cardQty);

    let updateCart = await CardsInCart.update(
      { quantity: cardQty },
      {
        where: {
          cartId: cartId,
          cardId: cardId,
        },
      }
    );

    res.send(updateCart);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
