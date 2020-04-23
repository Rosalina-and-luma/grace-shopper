const router = require('express').Router()
const {Product, Category} = require('../../db/models')

async function isAdmin(req, res, next) {
  const user = await User.findByPk(req.session.userId)
  if (user.isAdmin) {
    return next()
  }
  res.redirect('../products')
}

router.get('/', async (req, res, next) => {
  try {
    const products = await Product.findAll({include: Category})
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

router.put('/updateProduct/:productId', isAdmin, async (req, res, next) => {
  try {
    const selectedProduct = await Product.findByPk(req.params.productId)

    if (selectedProduct) {
      await selectedProduct.update({
        id: req.body.id,
        name: req.body.name,
        imgUrl: req.body.imgUrl,
        description: req.body.description,
        inventory: req.body.inventory,
        price: req.body.price,
        categoryId: req.body.category
      })
      res.json(selectedProduct)
    } else {
      res.sendStatus(404)
    }
  } catch (error) {
    console.error(error)
  }
})

router.delete('/:productId', isAdmin, async (req, res, next) => {
  try {
    let selectedProduct = await Product.findByPk(req.params.productId)
    if (selectedProduct) {
      await Product.destroy({
        where: {
          id: selectedProduct.id
        }
      })
      res.sendStatus(204)
    }
  } catch (error) {
    console.error(error)
  }
})

module.exports = router
