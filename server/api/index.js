const router = require('express').Router();

router.use('/users', require('./routes/users'));
router.use('/cards', require('./routes/cards'));
router.use('/carts', require('./routes/carts'));
router.use('/cardInCarts', require('./routes/cardInCarts'));

router.use((req, res, next) => {
  const error = new Error('Not Found');
  error.status = 404;
  next(error);
});

module.exports = router;
