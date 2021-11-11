const router = require('express').Router();
const {
	models: { Card },
} = require('../../db');

const requireToken = async (req, res, next) => {
	try {
		const token = req.headers.authorization;
		console.log(token);
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

router.get('/', async (req, res, next) => {
	try {
		const data = await Card.findAll();
		res.send(data);
	} catch (error) {
		next(error);
	}
});

router.get('/:id', async (req, res, next) => {
	try {
		const card = await Card.findOne({
			where: { id: req.params.id },
		});
		res.send(card);
	} catch (err) {
		next(err);
	}
});

//If we decide to have a page for admins to add cards
router.post('/addCards', requireToken, async (req, res, next) => {
	try {
		res.send(await Card.create(req.body));
	} catch (error) {
		next(error);
	}
});

router.put('/:id', requireToken, async (req, res, next) => {
	try {
		const updateCard = await Card.findOne({ where: { id: req.params.id } });
		res.send(await updateCard.update(req.body));
	} catch (error) {
		next(error);
	}
});

//Do I need to include Carts? IE. Deleting from all the carts of the users?
router.delete('/:id', requireToken, async (req, res, next) => {
	try {
		const deleteCard = await Card.findOne({
			where: { id: req.params.id },
		});
		await deleteCard.destroy();
		res.send(deleteCard);
	} catch (error) {
		next(error);
	}
});

module.exports = router;
