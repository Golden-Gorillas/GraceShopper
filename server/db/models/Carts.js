const Sequelize = require('sequelize');
const db = require('../db');

const Carts = db.define('carts', {
	cartsId: {
		type: Sequelize.INTEGER,
	},
	cards: {
		type: Sequelize.ARRAY(Sequelize.INTEGER),
	},
});

module.exports = Carts;
