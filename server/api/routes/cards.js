const router = require('express').Router();
const requireToken = require('./auth');
const {
	models: { Card, User },
} = require('../../db');

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
		if (req.user.role == 'admin') {
			res.send(await Card.create(req.body));
		} else {
			res.send(`User Not Authorized`);
		}
	} catch (error) {
		next(error);
	}
});

router.put('/:id', requireToken, async (req, res, next) => {
	try {
		if (req.user.role == 'admin') {
			const updateCard = await Card.findOne({ where: { id: req.params.id } });
			res.send(await updateCard.update(req.body));
		} else {
			res.send(`User Not Authorized`);
		}
	} catch (error) {
		next(error);
	}
});

//Do I need to include Carts? IE. Deleting from all the carts of the users?
router.delete('/:id', requireToken, async (req, res, next) => {
	try {
		if (req.user.role == 'admin') {
			const deleteCard = await Card.findOne({
				where: { id: req.params.id },
			});
			await deleteCard.destroy();
			res.send(deleteCard);
		} else {
			res.send(`User Not Authorized`);
		}
	} catch (error) {
		next(error);
	}
});

module.exports = router;
