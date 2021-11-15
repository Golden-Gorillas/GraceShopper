const router = require('express').Router();
const {
	models: { User, Cart },
} = require('../../db');

const requireToken = async (req, res, next) => {
	try {
		const token = req.headers.authorization;
		const user = await User.findByToken(token);
		req.user = user;
		console.log(user.id);
		if (user.role === 'admin' || user.id == req.params.id) {
			next();
		} else {
			throw Error('You are not authorized to view this');
		}
	} catch (error) {
		next(error);
	}
};

module.exports = requireToken;
