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

module.exports = router;
