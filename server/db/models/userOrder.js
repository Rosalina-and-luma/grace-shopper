const Sequelize = require('sequelize')
const db = require('../db')

const UserOrder = db.define('user_order', {
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

module.exports = UserOrder;
