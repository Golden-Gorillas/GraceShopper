const router = require('express').Router();
const {
  models: { User, Cart },
} = require('../../db');

router.get('/', async (req, res, next) => {
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

module.exports = router;
