const router = require('express').Router();
const {
  models: { Cart, User },
} = require('../../db');

router.get('/', async (req, res, next) => {
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
      include: { model: User },
    });
    res.send(cart);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
