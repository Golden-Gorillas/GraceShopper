const Sequelize = require('sequelize')
const db = require('../db')


const OrderHistory = db.define('Order',{
    User:{
        type: Sequelize.STRING,
        allowNull: false,
        validator:{
            isEmail:true
        }
    },
    //UUID PRIMARY KEY
    Ordernumber: {
        primaryKey: true,
        type: Sequelize.UUID,
        allowNull:false
    },
    Ordertotal:{
        type: Sequelize.STRING,
        allowNull:false
    },
    paymentOption:{
        type: Sequelize.STRING,
        allowNull:false,
    },
    
})

module.exports = OrderHistory