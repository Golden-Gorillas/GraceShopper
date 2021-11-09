//this is the access point for all things database related!

const db = require('./db');

const User = require('./models/User');
const Cards = require('./models/Cards');
const Carts = require('./models/Carts');

//associations could go here!

User.hasOne(Carts);
Cards.hasMany(Carts);
Carts.hasMany(Cards);

module.exports = {
	db,
	models: {
		User,
		Cards,
		Carts,
	},
};
