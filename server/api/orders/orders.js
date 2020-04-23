const router = require('express').Router()
const {Order, OrderProduct, Product} = require('../../db/models')
module.exports = router

router.post('/', async (req, res, next) => {
  try {
    let order
    order = await Order.findOne({
      where: {
        userId: req.body.userId,
        purchased: false
      }
    })
    if (!order) {
      order = await Order.create({
        userId: req.body.userId,
        purchased: false
      })
    }
    let product = await Product.findOne({
      where: {
        id: req.body.productId
      }
    })
    let updatedOrder
    // [updatedOrder, createdOrder] = await OrderProduct.findOrCreate({
    //   where: {
    //     productId: req.body.productId,
    //   },
    //   orderId: order.id,
    //   productId: req.body.productId,
    //   quantity: req.body.quantity,
    //   unitPrice: parseInt(product.price),
    // })
    // updatedOrder = await OrderProduct.create({
    // orderId: order.id,
    // productId: req.body.productId,
    // quantity: req.body.quantity,
    // unitPrice: parseInt(product.price),
    // })
    // if (updatedOrder) {
    //   await updatedOrder.update({
    //     orderId: order.id,
    //     productId: req.body.productId,
    //     quantity: req.body.quantity,
    //     unitPrice: product.price,
    //   })
    //   res.json(updatedOrder)
    // }
    // res.json(createdOrder)
    // console.log('order', order)
    // console.log('updatedOrder', updatedOrder)
    updatedOrder = await OrderProduct.findOne({
      where: {
        orderId: order.id,
        productId: req.body.productId
      }
    })
    if (updatedOrder) {
      await updatedOrder.update({quantity: req.body.quantity})
    } else {
      updatedOrder = await OrderProduct.create({
        orderId: order.id,
        productId: req.body.productId,
        quantity: req.body.quantity,
        unitPrice: parseInt(product.price)
      })
    }
    res.json(updatedOrder)
  } catch (error) {
    next(error)
  }
})
