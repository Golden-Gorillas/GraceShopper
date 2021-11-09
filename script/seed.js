'use strict';

const {
	db,
	models: { User, Cart, Card },
} = require('../server/db');

/**
 * seed - this function clears the database, updates tables to
 *      match the models, and populates the database.
 */
async function seed() {
	await db.sync({ force: true }); // clears db and matches models to tables
	console.log('db synced!');

	// Creating Users

	const steven = await User.create({
		userEmail: 'steven@gmail.com',
		password: '123',
	});
	const lydia = await User.create({
		userEmail: 'lydia@gmail.com',
		password: '123',
	});
	const cj = await User.create({
		userEmail: 'cj@gmail.com',
		password: '123',
		role: 'admin',
	});
	const violet = await User.create({
		userEmail: 'violet@gmail.com',
		password: '123',
		role: 'admin',
	});

	const cards = await Promise.all([
		Card.create({
			name: 'pikachu',
			price: 10,
			description: 'Electric Mouse',
			imageUrl: 'https://m.media-amazon.com/images/I/516F2ryfGRS._AC_.jpg',
			type: 'electric',
		}),
		Card.create({
			name: 'bulbasaur',
			price: 10,
			description: 'Leaf Dinosaur',
			imageUrl: 'https://i.ebayimg.com/images/g/LIUAAOSwZI1hF1OT/s-l500.jpg',
			type: 'grass',
		}),
		Card.create({
			name: 'charmander',
			price: 10,
			description: 'Fire Lizard',
			imageUrl: 'https://i.ebayimg.com/images/g/mM4AAOSwPVJhCJqf/s-l500.jpg',
			type: 'fire',
		}),
		Card.create({
			name: 'squirtle',
			price: 10,
			description: 'Water Turtle',
			imageUrl: 'https://i.ebayimg.com/images/g/4sMAAOSwaXNhFEKa/s-l500.jpg',
			type: 'water',
		}),
		Card.create({
			name: 'geodude',
			price: 10,
			description: 'Rock',
			imageUrl:
				'https://52f4e29a8321344e30ae-0f55c9129972ac85d6b1f4e703468e6b.ssl.cf2.rackcdn.com/products/pictures/1068995.jpg',
			type: 'rock',
		}),
	]);

	const cart1 = await Cart.create({ items: [] });
	const cart2 = await Cart.create({ items: [] });
	const cart3 = await Cart.create({ items: [] });
	const cart4 = await Cart.create({ items: [] });

	await steven.setCart(cart1);
	await lydia.setCart(cart2);
	await cj.setCart(cart3);
	await violet.setCart(cart4);

	await cart1.addCards([1, 2]);
	await cart2.addCards(1);
	await cart1.addCards(2);

	// console.log(`seeded ${users.length} users`);
	console.log(`seeded successfully`);
	// return {
	// 	users: {
	// 		cody: users[0],
	// 		murphy: users[1],
	// 	},
	// };
}

/*
 We've separated the `seed` function from the `runSeed` function.
 This way we can isolate the error handling and exit trapping.
 The `seed` function is concerned only with modifying the database.
*/
async function runSeed() {
	console.log('seeding...');
	try {
		await seed();
	} catch (err) {
		console.error(err);
		process.exitCode = 1;
	} finally {
		console.log('closing db connection');
		await db.close();
		console.log('db connection closed');
	}
}

/*
  Execute the `seed` function, IF we ran this module directly (`node seed`).
  `Async` functions always return a promise, so we can use `catch` to handle
  any errors that might occur inside of `seed`.
*/
if (module === require.main) {
	runSeed();
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed;
