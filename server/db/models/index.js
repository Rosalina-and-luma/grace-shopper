const User = require('./user')
const Product = require('./product')
const Category = require('./category')
const Order = require('./order')
const OrderProduct = require('./orderProduct')
/**
 * If we had any associations to make, this would be a great place to put them!
 * ex. if we had another model called BlogPost, we might say:
 *
 *    BlogPost.belongsTo(User)
 */
User.hasMany(Order)
Order.belongsTo(User)

Product.belongsTo(Category)
Category.hasMany(Product)

Order.belongsToMany(Product, {through: 'OrderProduct'}) // might have to update
Product.belongsToMany(Order, {through: 'OrderProduct'})

/**
 * We'll export all of our models here, so that any time a module needs a model,
 * we can just require it from 'db/models'
 * for example, we can say: const {User} = require('../db/models')
 * instead of: const User = require('../db/models/user')
 */
module.exports = {
  User,
  Product,
  Category,
  Order,
  OrderProduct
}
