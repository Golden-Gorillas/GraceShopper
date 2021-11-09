const router = require('express').Router();
const {
  models: { Card },
} = require('../../db');

router.get('/', async (req, res, next) => {
  try {
    const data = await Card.findAll();
    console.log(data);
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

module.exports = router;
