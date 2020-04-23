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
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      min: 0
    },
    get() {
      const pennies = this.getDataValue('unitPrice')
      return pennies / 100
    }
  }
})

OrderProduct.prototype.getSubtotal = function() {
  return this.quantity * this.unitPrice
}
//**add hook**

module.exports = OrderProduct
