const Sequelize = require('sequelize');
const db = require('../db');

const Card = db.define('card', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  price: {
    type: Sequelize.DOUBLE,
    allowNull: false,
  },
  description: {
    type: Sequelize.TEXT,
  },
  imageUrl: {
    type: Sequelize.TEXT,
    defaultValue:
      'https://secure.img1-fg.wfcdn.com/im/77981853/resize-h755-w755%5Ecompr-r85/8470/84707680/Pokemon+Pikachu+Wall+Decal.jpg',
  },
  stock: {
    type: Sequelize.INTEGER,
    defaultValue: 1,
    allowNull: false,
  },
  rarity: {
    type: Sequelize.STRING,
    defaultValue: 'common',
  },
  type: {
    type: Sequelize.STRING,
  },
});

module.exports = Card;
