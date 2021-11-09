const router = require('express').Router();
const {
  models: { Cart },
} = require('../../db');

router.get('/', async (req, res, next) => {
  try {
    const data = await Cart.findAll({});
    res.send(data);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
