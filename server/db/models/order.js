const Sequelize = require('sequelize')
const db = require('../db')

const Order = db.define('order', {
  status: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      isIn: [['open', 'closed']]
    }
  },
  total: {
    type: Sequelize.FLOAT,
    allowNull: false,
    validate: {
      min: 0
    }
  }
})

module.exports = Order
