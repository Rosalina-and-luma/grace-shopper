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

    const totals = await OrderProduct.findAll({
      where: {
        orderId: orderIds
      },
      group: ['orderId', 'quantity', 'unitPrice'],
      attributes: ['orderId', 'quantity', 'unitPrice']
      // group:'orderId'
      // // raw: true,
      // // order: Sequelize.literal('quantity DESC')
    })

    // console.log('----------TEST---------', totals)

    totals.forEach(total => {
      console.log(
        '--------total-----------',
        total.orderId,
        total.productId,
        total.unitPrice,
        total.quantity,
        total.unitPrice * total.quantity
      )
    })

    // console.log('---------checking orders--------', products)
    // products.map(product => {
    //   console.log('------------single product-------', product.getTotal())
    // })
    // const totalPrices = products.map( order => {
    //   console.log('------in get total------', order)
    //   return order.getTotal()
    // })

    // console.log('TOTAL', totalPrices)
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
