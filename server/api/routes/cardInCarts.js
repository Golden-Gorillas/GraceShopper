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

// router.get('/', requireToken, async (req, res, next) => {
// 	try {
// 		const data = await CardsInCart.findAll({});
// 		res.send(data);
// 	} catch (error) {
// 		next(error);
// 	}
// });

// router.get('/:id', async (req, res, next) => {
// 	try {
// 		const cart = await CardsInCart.findOne({
// 			where: { id: req.params.id },
// 			include: { model: Card },
// 		});
// 		res.send(cart);
// 	} catch (err) {
// 		next(err);
// 	}
// });

// router.post('/addCart', requireToken, async (req, res, next) => {
// 	try {
// 		res.send(await CardsInCart.create(req.body));
// 	} catch (error) {
// 		next(error);
// 	}
// });

router.put('/', async (req, res, next) => {
	try {
		const cartId = req.body.cart.id;
		const cardId = req.body.card.id;
		const cardQty = req.body.qty;

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

// router.delete('/:id', requireToken, async (req, res, next) => {
// 	try {
// 		let deleteCart = await Cart.findOne({
// 			where: { id: req.params.id },
// 			include: { model: Card },
// 		});
// 		await deleteCart.destroy();
// 		// }
// 		res.send(deleteCart);
// 	} catch (error) {
// 		next(error);
// 	}
// });

module.exports = router;
