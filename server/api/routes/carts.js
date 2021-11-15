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

// JOE_CR: I think that "requireToken" may be a misleading name for the middleware used here
// because it really means "are they logged in AND are they an admin?". It makes sense that
// only admins can view all carts in the system, but "requireToken" as a name does not make it clear
// that admin role is being checked for.
router.get('/', requireToken, async (req, res, next) => {
  try {
    const data = await Cart.findAll({});
    res.send(data);
  } catch (error) {
    next(error);
  }
});

// JOE_CR: Consider the security implications of this route. If someone can guess the id of another user's
// cart, then they can view it. I think that non-admin users should only be able to view their _own_ cart.
router.get('/:id', async (req, res, next) => {
<<<<<<< Updated upstream
  try {
    const cart = await Cart.findOne({
      where: { id: req.params.id },
      include: { model: Card },
    });
    res.send(cart);
  } catch (err) {
    next(err);
  }
=======
	try {
		// JOE_CR: Instead of using `findOne` and `where`, consider using `findByPk` when you
		// already have the id.
		const cart = await Cart.findOne({
			where: { id: req.params.id },
			include: { model: Card },
		});
		res.send(cart);
	} catch (err) {
		next(err);
	}
>>>>>>> Stashed changes
});

// JOE_CR: Follow RESTful conventions here--make the URL POST /carts, instead of POST /carts/addCart.
// Also, why is this only for admins?
router.post('/addCart', requireToken, async (req, res, next) => {
  try {
    res.send(await Cart.create(req.body));
  } catch (error) {
    next(error);
  }
});

// JOE_CR: Security implications again: someone can use Insomnia with a random cart id to update
// a cart that does not belong to them.
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

<<<<<<< Updated upstream
      if (filtered.length > 0) {
        const cardInCart = await CardsInCart.findOne({
          where: { cartId: req.params.id, cardId: req.body.add },
        });
        await cardInCart.increment('quantity', { by: 1 });
      } else {
        await updateCart.addCard(req.body.add);
      }
    }
=======
		// JOE_CR: Is it necessary to query for the same cart again?
		updateCart = await Cart.findOne({
			where: {
				id: req.params.id,
			},
			include: { model: Card },
		});
>>>>>>> Stashed changes

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
