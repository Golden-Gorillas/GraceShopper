const Sequelize = require('sequelize');
const db = require('../db');
const Cart = require('./Cart');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const axios = require('axios');

const SALT_ROUNDS = 5;

const User = db.define('user', {
	userEmail: {
		type: Sequelize.STRING,
		unique: true,
		allowNull: false,
		validate: {
			isEmail: true,
		},
	},
	password: {
		type: Sequelize.STRING,
	},
	role: {
		type: Sequelize.ENUM,
		values: ['admin', 'user'],
		defaultValue: 'user',
	},
});

module.exports = User;

/**
 * instanceMethods
 */
User.prototype.correctPassword = function (candidatePwd) {
	//we need to compare the plain version to an encrypted version of the password
	return bcrypt.compare(candidatePwd, this.password);
};

User.prototype.generateToken = function () {
	return jwt.sign({ id: this.id }, process.env.JWT);
};

/**
 * classMethods
 */
User.authenticate = async function ({ userEmail, password }) {
	const user = await this.findOne({
		where: { userEmail },
		include: { model: Cart },
	});
	if (!user || !(await user.correctPassword(password))) {
		const error = Error('Incorrect userEmail/password');
		error.status = 401;
		throw error;
	}
	return user.generateToken();
};

User.findByToken = async function (token) {
	try {
		const { id } = await jwt.verify(token, process.env.JWT);
		const user = User.findOne({ where: { id: id }, include: { model: Cart } });
		if (!user) {
			throw 'nooo';
		}
		return user;
	} catch (ex) {
		const error = Error('bad token');
		error.status = 401;
		throw error;
	}
};

/**
 * hooks
 */
const hashPassword = async (user) => {
	//in case the password has been changed, we want to encrypt it with bcrypt
	if (user.changed('password')) {
		user.password = await bcrypt.hash(user.password, SALT_ROUNDS);
	}
};

User.beforeCreate(hashPassword);
User.beforeUpdate(hashPassword);
User.beforeBulkCreate((users) => Promise.all(users.map(hashPassword)));
