const Sequelize = require('sequelize');
const db = require('../db');

const Cards = db.define('cards', {
	cardId: {
		type: Sequelize.INTEGER,
		allowNull: false,
	},
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
		allowNull: false,
	},
	imageUrl: {
		type: Sequelize.TEXT,
		defaultValue:
			'https://secure.img1-fg.wfcdn.com/im/77981853/resize-h755-w755%5Ecompr-r85/8470/84707680/Pokemon+Pikachu+Wall+Decal.jpg',
	},
	inStock: {
		type: Sequelize.BOOLEAN,
		defaultValue: true,
	},
	rarity: {
		type: Sequelize.ENUM,
		values: ['common', 'rare', 'legendary'],
		defaultValue: 'common',
	},
	type: {
		type: Sequelize.ENUM,
		values: ['water', 'fire', 'grass', 'electric', 'rock'],
	},
});

module.exports = Cards;
