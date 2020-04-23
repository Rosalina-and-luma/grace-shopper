const router = require('express').Router()
const {Order, OrderProduct} = require('../../db/models')

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
      order = await Order.create(req.body)
    }
    res.json(order)
  } catch (error) {
    next(error)
  }
})
