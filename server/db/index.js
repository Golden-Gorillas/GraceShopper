//this is the access point for all things database related!

const db = require('./db');

const User = require('./models/User');
const Card = require('./models/Card');
const Cart = require('./models/Cart');

//associations could go here!
Cart.belongsTo(User);
User.hasOne(Cart);
Card.belongsToMany(Cart, { through: 'cart_cards' });
Cart.belongsToMany(Card, { through: 'cart_cards' });

module.exports = {
	db,
	models: {
		User,
		Card,
		Cart,
	},
};
