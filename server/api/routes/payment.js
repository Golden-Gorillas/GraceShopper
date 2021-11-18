require("dotenv").config();
const cors = require("cors");
const router = require("express").Router();
const {
	models: { OrderHistory },
} = require('../../db');
const Stripe = require("stripe");
const stripe = new Stripe(process.env.STRIPE_SK);
//universal unique identifier 
const { v4: uuidv4 } = require("uuid");

router.use(cors());

router.get("/", (req, res) => {
  res.send("Add Your Stripe Secret Key to the .require('stripe') statement");
});

router.post("/checkout", async (req, res) => {
  console.log("Request:", req.body);
  let status = "";
  let error = "";
  console.log();
  try {
    const { product, price, token } = req.body;
    await stripe.customers
      .create({
        email: token.email,
        source: token.id,
      })
      .then(async (customer) => {
        const names = product.cards.map((card) => card.name).join("-/-");
        //make sure user is not charged twice
        const idempotencyKey = uuidv4();
        
        console.log('here:', token.price)
        //create order history 
        await OrderHistory.create({
          User: token.email,
          Ordernumber: idempotencyKey,
          Ordertotal: price,
          paymentOption: 'Visa'
        })
        const charge = await stripe.charges.create(
          {
            amount: Math.round(price * 100),
            currency: "usd",
            customer: customer.id,
            receipt_email: token.email,
            description: `purchased the ${names}`,

            shipping: {
              name: token.card.name,
              address: {
                line1: token.card.address_line1,
                line2: token.card.address_line2,
                city: token.card.address_city,
                country: token.card.address_country,
                postal_code: token.card.address_zip,
              },
            },
          },
          { idempotencyKey }
        );
        console.log("Charge: ", { charge });
        status = "success";
      })
      .catch((error) => console.error(error));
  } catch (error) {
    console.error("error", error);
    status = "failure";
  }
  res.json({ error, status });
});

module.exports = router;
