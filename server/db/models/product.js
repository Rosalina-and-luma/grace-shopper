const Sequelize = require('sequelize')
const db = require('../db')

const Product = db.define('product', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  imgUrl: {
    type: Sequelize.TEXT,
    defaultValue:
      'https://www.kindpng.com/picc/m/474-4746854_hogwarts-logo-png-hogwarts-crest-harry-potter-coloring.png'
  },
  description: {
    type: Sequelize.TEXT
  },
  price: {
    type: Sequelize.INTEGER,
    allowNull: false,
    get() {
      const pennies = this.getDataValue('price')
      return pennies / 100
    },
    set(price) {
      this.setDataValue('price', price * 100)
    }
  },
  inventory: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      min: 0
    }
  }
})

module.exports = Product
