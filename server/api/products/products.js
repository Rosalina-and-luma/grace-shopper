const router = require('express').Router()
const {Product, Category} = require('../../db/models')

router.get('/', async (req, res, next) => {
  const {category} = req.query

  //to get a specific category, the route path needs to be `/api/products?category=${categoryName}`

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

router.put('/:productId', async (req, res, next) => {
  try {
    const selectedProduct = await Product.findByPk(req.params.productId)
    const {
      id,
      name,
      imgUrl,
      description,
      inventory,
      price,
      categoryId
    } = req.body

    if (selectedProduct) {
      await selectedProduct.update({
        id,
        name,
        imgUrl,
        description,
        inventory,
        price,
        categoryId
      })
      res.json(selectedProduct)
    } else {
      res.sendStatus(404)
    }
  } catch (error) {
    console.error(error)
  }
})

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
