const Sequelize = require('sequelize')
const db = require('../db')

const Product = db.define('product', {
  id: {
    type: Sequelize.NUMBER,
    unique: true
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  imgUrl: {
    type: Sequelize.TEXT,
  },
  description: {
    type: Sequelize.TEXT
  },
  price: {
    type: Sequelize.FLOAT
  },
  category: {
    type: Sequelize.ENUM('wand', 'broom', 'robe', 'misc'),
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  inventory: {
    type: Sequelize.NUMBER,
    allowNull: false,
    validate: {
      min: 0
    }
  }
});

module.exports = Product;
