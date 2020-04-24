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
    console.log('orders', orderIds)

    const products = await Order.findAll({
      include: [{model: Product}, {model: OrderProduct}],
      where: {
        id: orderIds
      }
    })

    // const totals = products.map( (product) => {
    //    return product.getTotal()
    // })

    // console.log('Totals-------->', totals)
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

router.delete('/', async (req, res, next) => {
  console.log('IN DELETE!!!!!!!!')
  console.log('dlete params', req.body)
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
