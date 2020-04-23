const Sequelize = require('sequelize')
const db = require('../db')

const Order = db.define('order', {
  purchased: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: false
  }
})

Order.prototype.getTotal = async function() {
  const products = await this.getProducts()

  const OrderProducts = products.map(product => product.dataValues.OrderProduct)

  const subtotals = OrderProducts.map(
    product => product.dataValues.quantity * product.dataValues.unitPrice
  )
  return subtotals.reduce((a, b) => a + b)
}

module.exports = Order
