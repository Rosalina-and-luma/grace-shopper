const Sequelize = require('sequelize')
const db = require('../db')

const Order = db.define('order', {
  purchased: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
  }
})

//calculate total for order
//get all Order Products with specific orderId
//for each product, multipliy quantity * unit price
//add up total for each product for grand total

Order.prototype.getTotal = async () => {
  const products = await Order.getProducts();
  return products.map(product =>
    product.quantity * product.unitPrice
  ).reduce((accum, current) => accum + current);
}

module.exports = Order
