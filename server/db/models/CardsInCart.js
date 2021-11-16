const Sequelize = require('sequelize');
const db = require('../db');

const CardsInCart = db.define('cardsInCart', {
	quantity: {
		type: Sequelize.INTEGER,
		defaultValue: 1,
	},
});

module.exports = CardsInCart;
