const Sequelize = require('sequelize')
const router = require('express').Router()
const {Order, OrderProduct, Product} = require('../../db/models')
module.exports = router

router.get('/:userId', async (req, res, next) => {
  try {
    const orders = await Order.findAll({
      where: {
        userId: req.params.userId
      }
    })
    const orderIds = orders.map(order => order.id)
    // console.log('orders', orderIds)

    const products = await Order.findAll({
      include: [{model: Product}, {model: OrderProduct}],
      where: {
        id: orderIds
      }
    })

    products.forEach(order => {
      // console.log('----------PRODUCT ONE---------', order.purchased)
      let total = 0
      console.log('---------------------', order.products)

      order.products.forEach(prod => {
        let curr = prod.order_product
        let subTotal = curr.quantity * curr.unitPrice
        curr.dataValues.subTotal = subTotal
        total += subTotal
      })

      order.dataValues.total = total

      // order.products.forEach( prod => {
      //   console.log('------------PROD----------', prod.order_product.unitPrice, prod.order_product.quantity)
      //   let curr = prod.order_product;
      //   let subTotal = curr.unitPrice * curr.quantity;
      //   console.log('-------subtotal------',subTotal)
      //   curr['subTotal'] = subTotal
      //   total += subTotal
      // })

      // order.products.order_product.forEach( orderProd => {
      //   let subTotal = orderProd.quantity * orderProd.unitPrice
      //   orderProd.dataValues['subTotal'] = subTotal;
      //   total += subTotal
      // })

      // order.dataValues['total'] = total
    })

    res.json(products)
  } catch (error) {
    next(error)
  }
})

router.post('/', async (req, res, next) => {
  try {
    let order
    order = await Order.findOne({
      where: {
        userId: req.body.userId
      }
    })
    if (!order) {
      order = await Order.create({
        userId: req.body.userId
      })
    }
    let product = await Product.findOne({
      where: {
        id: req.body.productId
      }
    })
    let updatedOrder
    updatedOrder = await OrderProduct.findOne({
      where: {
        orderId: order.id,
        productId: req.body.productId
      }
    })
    console.log('---------PRODUCT-------', product.price)
    if (updatedOrder) {
      await updatedOrder.update({quantity: req.body.quantity})
    } else {
      updatedOrder = await OrderProduct.create({
        orderId: order.id,
        productId: req.body.productId,
        quantity: req.body.quantity,
        unitPrice: product.price
      })
    }
    res.json(updatedOrder)
  } catch (error) {
    next(error)
  }
})

router.delete('/', async (req, res, next) => {
  try {
    await OrderProduct.destroy({
      where: {
        orderId: req.body.orderId,
        productId: req.body.productId
      }
    })
    res.sendStatus(204)
  } catch (error) {
    next(error)
  }
})
