const router = require('express').Router()
const {Order, OrderProduct, Product} = require('../../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  const user = Object.values(req.session.passport)[0]

  try {
    
    const orders = await Order.findAll({
      where: {
        userId: user
      }
    })
    const orderIds = orders.map(order => order.id)

    const products = await Order.findAll({
      include: [{model: Product}, {model: OrderProduct}],
      where: {
        id: orderIds
      }
    })

    products.forEach(order => {
      let total = 0

      order.products.forEach(prod => {
        let curr = prod.order_product
        let subTotal = curr.quantity * curr.unitPrice
        curr.dataValues.subTotal = subTotal
        total += subTotal
      })

      order.dataValues.total = total
    })

    res.json(products)
    // } else {
    //   console.log('No user found')
    // }
  } catch (error) {
    next(error)
  }
})

router.post('/', async (req, res, next) => {
  try {
    let order

    const user = Object.values(req.session.passport)[0]
    
    order = await Order.findOne({
      where: {
        userId: user,
        purchased: false
      }
    })

    if (!order) {
      order = await Order.create({
        userId: user
      })
    }

    let product = await Product.findOne({
      where: {
        id: req.body.productId
      }
    })

    let updatedOrder = await OrderProduct.create({
      orderId: order.id,
      productId: req.body.productId,
      quantity: req.body.quantity,
      unitPrice: product.price
    })

    res.status(201).json(updatedOrder)
  } catch (error) {
    next(error)
  }
})

router.put('/', async (req, res, next) => {
  try {
    const order = await Order.findByPk(req.body.id)
    if (order) {
      order.update({
        purchased: true
      })
    }
    res.sendStatus(200)
  } catch (error) {
    next(error)
  }
})

router.put('/quantity', async (req, res, next) => {
  try {
    const product = await OrderProduct.findOne({
      where: {
        orderId: req.body.orderId,
        productId: req.body.productId
      }
    })
    product.update({
      quantity: req.body.quantity
    })
    res.json(product)
  } catch (error) {
    console.error(error)
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
