const router = require('express').Router();
const {
  models: { User, Cart },
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
    const user = await User.findOne({
      where: { id: req.params.id },
      include: { model: Cart },
    });
    res.send(await user.update(req.body));
  } catch (err) {
    next(err);
  }
});

router.put('/:id', requireToken, async (req, res, next) => {
  try {
    const user = await User.findOne({
      where: { id: req.params.id },
      include: { model: Cart },
    });

    await user.destroy();
    res.send(user);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
