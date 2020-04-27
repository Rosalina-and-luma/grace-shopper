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

  console.log('inside getTotal method', products)
  // const OrderProducts = products.map(product => product.dataValues.OrderProduct)

  // const OrderProducts = products.map(product => product.dataValues.OrderProduct)

  // console.log('-----------ORDER PRODUCTS--------------->', OrderProducts)

  // const subtotals = OrderProducts.map(
  //   product => product.dataValues.quantity * product.dataValues.unitPrice
  // )

  // return subtotals.reduce((a, b) => a + b)
}

// Order.prototype.getTotal = async function() {

//   console.log('---------THIS----------', this)
//   const products = this.getProducts()

//   console.log('-------PRODUCTS--------', products)

// }

module.exports = Order
