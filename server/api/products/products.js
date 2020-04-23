const router = require('express').Router()
const {Product, Category} = require('../../db/models')

router.get('/', async (req, res, next) => {
  const {category} = req.query

  try {
    if (category) {
      const {products} = await Category.findOne({
        where: {name: category},
        include: [{model: Product}]
      })

      res.json(products)
    } else {
      const allProducts = await Product.findAll()

      res.json(allProducts)
    }
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

//======== needs to be refactored ==========/

router.put('/:productId', async (req, res, next) => {
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

//===================================/

router.delete('/:productId', async (req, res, next) => {
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
