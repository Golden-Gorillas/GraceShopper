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
    defaultValue:
      "Working on getting Information Enjoy this Quote 'Only he who can see the invisible can do the impossible.'- Frank L.Gaines ",
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
    type: Sequelize.ARRAY(Sequelize.STRING),
  },
});

Card.beforeUpdate('userType', (user, options) => {
  console.log('test');
  console.log('USER: ->>>', user, ' \n OPTIONS: ->>>', options);
});

module.exports = Card;
