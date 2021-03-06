const router = require('express').Router()
module.exports = router

router.use('/users', require('./users/users'))
router.use('/products', require('./products/products'))
router.use('/orders', require('./orders/orders'))

router.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  res.sendStatus(404)
  res.redirect('/404')
})
