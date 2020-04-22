const Sequelize = require('sequelize')
const db = require('../db')

const Order = db.define('order', {
  purchased: {
    type: Sequelize.BOOLEAN,
    allowNull: false
  }
})

//calculate total for order
//get all Order Products with specific orderId
//for each product, multipliy quantity * unit price
//add up total for each product for grand total

Order.prototype.getTotal = async function() {
  const products = await this.getProducts()
  // console.log('getTotal products: ', products)

  const OrderProducts = products.map(product => product.dataValues.OrderProduct)
  // console.log('OrderProducts array: ', OrderProducts)

  const subtotals = OrderProducts.map(
    product => product.dataValues.quantity * product.dataValues.unitPrice
  )
  console.log('Subtotals: ', subtotals)

  return subtotals.reduce((a, b) => a + b)
}

module.exports = Order
