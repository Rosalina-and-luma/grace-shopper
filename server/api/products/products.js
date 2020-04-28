const router = require('express').Router()
const {Product, Category, User} = require('../../db/models')
const isAdmin = require('../utilities')

router.use(isAdmin)

router.get('/', async (req, res, next) => {
  const {category} = req.query

  //to get a specific category, the route path needs to be `/api/products?category=${categoryName}`

  try {
    //take out later if not needed
    if (category) {
      const {products} = await Category.findOne({
        where: {name: category},
        include: [{model: Product}]
      })

      res.json(products)
    } else {
      const allProducts = await Product.findAll({include: Category})

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

router.post('/', isAdmin, async (req, res, next) => {
  const {name, imgUrl, description, inventory, price, categoryId} = req.body

  try {
    const product = await Product.create({
      name,
      imgUrl,
      description,
      inventory,
      price,
      categoryId
    })

    const {dataValues} = await product.getCategory()
    product.dataValues.category = dataValues

    // console.log('product: ', product)

    res.status(201).json(product)
  } catch (err) {
    next(err)
  }
})

router.put('/:productId', isAdmin, async (req, res, next) => {
  const {name, imgUrl, description, inventory, price, categoryId} = req.body
  const id = req.params.productId

  try {
    const [numUpdated, updatedProduct] = await Product.update(
      {
        name,
        imgUrl,
        description,
        inventory,
        price,
        categoryId
      },
      {
        where: {id},
        returning: true,
        plain: true
      }
    )

    console.log(updatedProduct)

    if (updatedProduct) {
      const {dataValues} = await updatedProduct.getCategory()
      updatedProduct.dataValues.category = dataValues

      res.json(updatedProduct)
    } else {
      res.sendStatus(404)
    }
  } catch (error) {
    console.error(error)
  }
})

//refactor so code is not redundant
router.delete('/:productId', isAdmin, async (req, res, next) => {
  try {
    let selectedProduct = await Product.findByPk(req.params.productId) //don't need this
    if (selectedProduct) {
      await Product.destroy({
        where: {
          id: selectedProduct.id
        }
      }) //will return 0 if nothing was destroyed
      res.sendStatus(204)
    }
  } catch (error) {
    console.error(error)
  }
})

module.exports = router
