const router = require('express').Router()
const {Product, Category, User} = require('../../db/models')

async function isAdmin(req, res, next) {
  if (req.session.userId) {
    const user = await User.findByPk(req.session.userId)
    if (user.isAdmin) {
      return next()
    }
  }
  res.status(403).send('access denied')
}

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

router.put('/:productId', isAdmin, async (req, res, next) => {
  const {id, name, imgUrl, description, inventory, price, categoryId} = req.body
  const {productId} = req.params

  try {
    const [updates, selectedProduct] = await Promise.all([
      Product.update(
        {
          id,
          name,
          imgUrl,
          description,
          inventory,
          price,
          categoryId
        },
        {where: {id: productId}}
      ),
      Product.findByPk(req.params.productId, {include: Category})
    ])

    if (selectedProduct) {
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
