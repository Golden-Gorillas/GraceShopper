const router = require('express').Router();
const {
	models: { User, Cart },
} = require('../../db');

const requireToken = async (req, res, next) => {
	try {
		const token = req.headers.authorization;
		const user = await User.findByToken(token);
		req.user = user;
		next();
	} catch (error) {
		next(error);
	}
};

router.get('/', requireToken, async (req, res, next) => {
	try {
		console.log(requireToken);

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

module.exports = router;
