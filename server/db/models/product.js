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
    defaultValue: 'https://www.kindpng.com/picc/m/474-4746854_hogwarts-logo-png-hogwarts-crest-harry-potter-coloring.png'
  },
  description: {
    type: Sequelize.TEXT
  },
  price: {
    type: Sequelize.FLOAT,
    allowNull: false
  },
  category: {
    type: Sequelize.ENUM('wands', 'brooms', 'robes', 'misc')
  },
  inventory: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      min: 0
    }
  }
});

module.exports = Product;