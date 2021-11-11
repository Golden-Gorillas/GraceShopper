//this is the access point for all things database related!

const db = require('./db');

const User = require('./models/User');
const Card = require('./models/Card');
const Cart = require('./models/Cart');
const CardsInCart = require('./models/CardsInCart');

//associations could go here!
Cart.belongsTo(User);
User.hasOne(Cart);
Card.belongsToMany(Cart, { through: CardsInCart });
Cart.belongsToMany(Card, { through: CardsInCart });

module.exports = {
	db,
	models: {
		User,
		Card,
		Cart,
		CardsInCart,
	},
};
