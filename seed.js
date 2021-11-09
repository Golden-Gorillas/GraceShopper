const { green, red } = require('chalk');
const { db, User, Cards, Carts } = require('./db/models');

const seed = async () => {
	try {
		await db.sync({ force: true });

		// seed your database here!
		const steven = await User.create({
			userEmail: 'steven@gmail.com',
			password: 'steven123',
		});
		const lydia = await User.create({
			userEmail: 'lydia@gmail.com',
			password: 'lydia123',
		});
		const cj = await User.create({
			userEmail: 'cj@gmail.com',
			password: 'cj123',
		});
		const violet = await User.create({
			userEmail: 'violet@gmail.com',
			password: 'violet123',
		});

		const pikachu = await Cards.create({
			cardId: 1,
			name: 'pikachu',
			price: 10,
			description: 'Electric Mouse',
			imageUrl: 'https://m.media-amazon.com/images/I/516F2ryfGRS._AC_.jpg',
			type: 'electric',
		});
		const bulbasaur = await Cards.create({
			cardId: 2,
			name: 'bulbasaur',
			price: 10,
			description: 'Leaf Dinosaur',
			imageUrl: 'https://i.ebayimg.com/images/g/LIUAAOSwZI1hF1OT/s-l500.jpg',
			type: 'grass',
		});
		const charmander = await Cards.create({
			cardId: 3,
			name: 'charmander',
			price: 10,
			description: 'Fire Lizard',
			imageUrl: 'https://i.ebayimg.com/images/g/mM4AAOSwPVJhCJqf/s-l500.jpg',
			type: 'fire',
		});
		const squirtle = await Cards.create({
			cardId: 4,
			name: 'squirtle',
			price: 10,
			description: 'Water Turtle',
			imageUrl: 'https://i.ebayimg.com/images/g/4sMAAOSwaXNhFEKa/s-l500.jpg',
			type: 'water',
		});
		const geodude = await Cards.create({
			cardId: 5,
			name: 'geodude',
			price: 10,
			description: 'Rock',
			imageUrl:
				'https://52f4e29a8321344e30ae-0f55c9129972ac85d6b1f4e703468e6b.ssl.cf2.rackcdn.com/products/pictures/1068995.jpg',
			type: 'rock',
		});

		const cart = await Carts.create({
			// Do we need a cartsId?
			cartsId: 1,
			cards: [1, 2],
		});

		// await baymax.addProject(chores, { through: { completed: false } });
		// await baymax.addProject(conversation, { through: { completed: false } });
		// await baymax.addProject(plan, { through: { completed: false } });
		// await walle.addProject(chores, { through: { completed: false } });
		// await bender.addProject(conversation, { through: { completed: false } });
	} catch (err) {
		console.log(red(err));
	}
};

module.exports = seed;
// If this module is being required from another module, then we just export the
// function, to be used as necessary. But it will run right away if the module
// is executed directly (e.g. `node seed.js` or `npm run seed`)
if (require.main === module) {
	seed()
		.then(() => {
			console.log(green('Seeding success!'));
			db.close();
		})
		.catch((err) => {
			console.error(red('Oh noes! Something went wrong!'));
			console.error(err);
			db.close();
		});
}
