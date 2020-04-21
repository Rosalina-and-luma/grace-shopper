const router = require('express').Router()

// import products model


router.get('/', async (req, res, next) => {
  try {
    const products = await Products.findAll()
    res.json(products)
  } catch(err) {
    next(err)
  }
})

module.exports = router
