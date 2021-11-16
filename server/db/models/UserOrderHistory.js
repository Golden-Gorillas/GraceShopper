const Sequelize = require('sequelize')
const db = require('..db')


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
        type: Sequelize.INTEGER,
        allowNull:false
    },
    paymentOption:{
        type: Sequelize.STRING,
        allowNull:false,
        validate:{
            isCreditCard: true
        }
    },
    
})

module.exports = OrderHistory