const router = require('express').Router();
const {
	models: { Cart, User, Card },
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

router.put('/:id', requireToken, async (req, res, next) => {
	try {
		const updateCart = await Cart.findOne({
			where: {
				id: req.params.id,
			},
			include: { model: Card },
		});
		res.send(await updateCart.update(req.body));
	} catch (error) {
		next(error);
	}
});

router.delete('/:id', async (req, res, next) => {
	try {
		console.log('axios delete', req.body, req.params);
		let deleteCart = await Cart.findOne({
			where: { id: req.params.id },
			include: { model: Card },
		});
		console.log(req.body);
		if (req.body.cardId) {
			await deleteCart.removeCard(req.body.cardId);
			deleteCart = await Cart.findOne({
				where: { id: req.params.id },
				include: { model: Card },
			});
		} else {
			deleteCart = await deleteCart.destroy();
		}
		res.send(deleteCart);
	} catch (error) {
		next(error);
	}
});

module.exports = router;
