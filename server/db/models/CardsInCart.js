const Sequelize = require('sequelize');
const db = require('../db');

const CardsInCart = db.define('cardsInCart', {
  quantity: {
    type: Sequelize.INTEGER,
    defaultValue: 1,
  },
});

CardsInCart.beforeUpdate('beforeValidate', (user, options) => {
  console.log('USER: ->>>', user, ' \n OPTIONS: ->>>', options);
});

module.exports = CardsInCart;
