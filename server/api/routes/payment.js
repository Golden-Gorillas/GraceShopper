require('dotenv').config()
const cors = require("cors")
const router = require('express').Router();

const Stripe = require('stripe')
const stripe = new Stripe(process.env.STRIPE_SK)
//const stripe = new Stripe('sk_test_51JvSqJLOSRd631P9WVNEgOIEu4IsgX5ofL427G8WHqfxUp7dsLxtEfEUAQ2BcEga5woI5Wvl1SlRqjnsZBp9hkAQ00cQnI7ZEk')
//const stripe = require('stripe')(process.env.STRIPE_SK)
const {v4: uuidv4} = require('uuid')

router.use(cors())

router.get('/', (req,res)=>{
    res.send("Add Your Stripe Secret Key to the .require('stripe') statement")
})

router.post("/checkout", async (req,res)=>{
    console.log('Request:', req.body);
    let status=''
    let error=''
    console.log()
    try{

        const {product, price, token} = req.body
        await stripe.customers.create({
            email:token.email,
            source:token.id

        }).then(async customer => {
            const names = product.cards.map(card => card.name).join("-/-")
            //make sure user is not charged twice
            const idempotencyKey = uuidv4()


            const charge = await stripe.charges.create({
                
            amount: Math.round(price*100),
            currency: "usd",
            customer: customer.id,
            receipt_email:token.email,
            description: `purchased the ${names}`,

            shipping:{
                name:token.card.name,
                address:{
                    line1: token.card.address_line1,
                    line2: token.card.address_line2,
                    city: token.card.address_city,
                    country: token.card.address_country,
                    postal_code: token.card.address_zip
                }
             }
          },
            {idempotencyKey})
            console.log("Charge: ",{charge})
            status = 'success'

        }
        ).catch(error => console.error(error ))


        
    }catch(error){
        console.error('error', error)
        status = 'failure'
    }
    res.json({error, status})
})


module.exports = router