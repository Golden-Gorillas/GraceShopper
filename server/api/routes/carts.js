const router = require('express').Router();
const {
  models: { Cart, User, Card, CardsInCart },
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

router.get('/', requireToken, async (req, res, next) => {
  try {
    const data = await Cart.findAll({});
    res.send(data);
  } catch (error) {
    next(error);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const cart = await Cart.findOne({
      where: { id: req.params.id },
      include: { model: Card },
    });
    res.send(cart);
  } catch (err) {
    next(err);
  }
});

router.post('/addCart', requireToken, async (req, res, next) => {
  try {
    res.send(await Cart.create(req.body));
  } catch (error) {
    next(error);
  }
});

router.put('/:id', async (req, res, next) => {
  try {
    let updateCart = await Cart.findOne({
      where: {
        id: req.params.id,
      },
      include: { model: Card },
    });
    if (req.body.delete) {
      await updateCart.removeCard(req.body.delete);
    } else if (req.body.add) {
      const cards = await updateCart.getCards();
      const filtered = cards.filter((card) => {
        return card.id === req.body.add;
      });

      if (filtered.length > 0) {
        const cardInCart = await CardsInCart.findOne({
          where: { cartId: req.params.id, cardId: req.body.add },
        });
        await cardInCart.increment('quantity', { by: 1 });
      } else {
        await updateCart.addCard(req.body.add);
      }
    }

    updateCart = await Cart.findOne({
      where: {
        id: req.params.id,
      },
      include: { model: Card },
    });

    res.send(updateCart);
  } catch (error) {
    next(error);
  }
});

router.delete('/:id', requireToken, async (req, res, next) => {
  try {
    let deleteCart = await Cart.findOne({
      where: { id: req.params.id },
      include: { model: Card },
    });
    await deleteCart.destroy();
    // }
    res.send(deleteCart);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
