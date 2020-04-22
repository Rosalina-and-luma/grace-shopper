const Sequelize = require('sequelize')
const db = require('../db')

const OrderProduct = db.define('OrderProduct', {
  // update table name
  quantity: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      min: 0
    }
  },
  unitPrice: {
    type: Sequelize.FLOAT, // update to integer
    allowNull: false,
    validate: {
      min: 0
    }
  }
})

//**add hook**

module.exports = OrderProduct
