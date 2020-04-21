const Sequelize = require('sequelize')
const db = require('../db')

const OrderProduct = db.define('order_product', {
  quantity: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      min: 0
    }
  },
  unitPrice: {
    type: Sequelize.FLOAT,
    allowNull: false,
    validate: {
      min: 0
    }
  }
})

//**add hook**

module.exports = OrderProduct
