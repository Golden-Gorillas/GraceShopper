'use strict';
const axios = require('axios');
const pokemon = require('pokemontcgsdk');
const { application } = require('express');
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
      name: 'Charizard VMAX',
      price: 256.62,
      description: '',
      imageUrl:
        'https://product-images.tcgplayer.com/fit-in/400x558/223073.jpg',
      type: 'Fire',
      rarity: 'legendary',
    }),
    Card.create({
      name: 'Mew VMAX',
      price: 157.99,
      description: '',
      imageUrl:
        'https://product-images.tcgplayer.com/fit-in/400x558/253177.jpg',
      type: 'Psychic',
      rarity: 'legendary',
    }),
    Card.create({
      name: 'Rayquaza GX',
      price: 149.98,
      description: '',
      imageUrl: 'https://i.ebayimg.com/images/g/mM4AAOSwPVJhCJqf/s-l500.jpg',
      type: 'fire',
      rarity: 'Dragon',
    }),
    Card.create({
      name: 'Charizard',
      price: 100.0,
      description: '',
      imageUrl:
        'https://product-images.tcgplayer.com/fit-in/400x558/250320.jpg',
      type: 'Fire',
      rarity: 'legendary',
    }),
    Card.create({
      name: 'Mewtwo EX',
      price: 16.65,
      description: '',
      imageUrl:
        'https://product-images.tcgplayer.com/fit-in/400x558/250339.jpg',
      type: 'Psychic',
      rarity: 'legendary',
    }),
    Card.create({
      name: 'Pikachu Star',
      price: 399.98,
      description: '',
      imageUrl: 'https://product-images.tcgplayer.com/fit-in/400x558/88111.jpg',
      type: 'Electric',
      rarity: 'legendary',
    }),
  ]);

  pokemon.configure({ apiKey: 'f3d7da45-593f-4da9-bcd1-f27721f4bc63' });

  for (let i = 0; i <= 50; i++) {
    const pokemonApiCard = await pokemon.card.find(
      `base1-${Math.floor(Math.random() * 102)}`
    );

    await Card.create({
      name: pokemonApiCard.name,
      price: pokemonApiCard.cardmarket.prices.averageSellPrice,
      stock: Math.floor(Math.random() * 11),
      description: pokemonApiCard.flavorText,
      imageUrl: pokemonApiCard.images.large,
      type: pokemonApiCard.type,
    });
  }

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
