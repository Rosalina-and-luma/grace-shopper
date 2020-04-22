const router = require('express').Router()
const {Product} = require('../../db/models')

// GET /products?category=[category] // look into query strings
router.get('/', async (req, res, next) => {
  try {
    const products = await Product.findAll()
    res.json(products)
  } catch (err) {
    next(err)
  }
})

router.get('/brooms', async (req, res, next) => {
  try {
    const products = await Product.findAll({
      where: {
        categoryId: 2
      }
    })
    res.json(products)
  } catch (err) {
    next(err)
  }
})

router.get('/wands', async (req, res, next) => {
  try {
    const products = await Product.findAll({
      where: {
        categoryId: 1
      }
    })
    res.json(products)
  } catch (err) {
    next(err)
  }
})

router.get('/robes', async (req, res, next) => {
  try {
    const products = await Product.findAll({
      where: {
        categoryId: 3
      }
    })
    res.json(products)
  } catch (err) {
    next(err)
  }
})

router.get('/misc', async (req, res, next) => {
  try {
    const products = await Product.findAll({
      where: {
        categoryId: 4
      }
    })
    res.json(products)
  } catch (err) {
    next(err)
  }
})

router.get('/:productId', async (req, res, next) => {
  try {
    const selectedProduct = await Product.findByPk(req.params.productId)
    res.json(selectedProduct)
  } catch (error) {
    next(error)
  }
})

module.exports = router
