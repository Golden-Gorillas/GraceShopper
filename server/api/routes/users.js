const router = require('express').Router();
const requireToken = require('./auth');
const {
	models: { User, Cart },
} = require('../../db');

router.get('/', requireToken, async (req, res, next) => {
	try {
		const users = await User.findAll({
			include: {
				model: Cart,
			},
		});
		res.json(users);
	} catch (err) {
		next(err);
	}
});

router.get('/:id', requireToken, async (req, res, next) => {
	try {
		const user = await User.findOne({
			where: { id: req.params.id },
			include: { model: Cart },
		});

		res.send(user);
	} catch (err) {
		next(err);
	}
});

router.put('/:id', requireToken, async (req, res, next) => {
	try {
		if (req.user.role == 'admin') {
			const user = await User.findOne({
				where: { id: req.params.id },
				include: { model: Cart },
			});
			res.send(await user.update(req.body));
		} else {
			res.send(`User Not Authorized`);
		}
	} catch (err) {
		next(err);
	}
});

router.delete('/:id', requireToken, async (req, res, next) => {
	try {
		if (req.user.role == 'admin') {
			const user = await User.findOne({
				where: { id: req.params.id },
				include: { model: Cart },
			});

			await user.destroy();
			res.send(user);
		} else {
			res.send(`User Not Authorized`);
		}
	} catch (err) {
		next(err);
	}
});

module.exports = router;
