const router = require('express').Router()

// import products model

router.get('/:productId', async (req, res, next) => {
  try {
    // const selectedProduct = await Product.findByPk(req.params.productId);
    // res.json(selectedProduct)
    const temp = {
      id: 1,
      name: 'The Elder Wand',
      price: '$45.00',
      description: 'This is the most powerful wand in the history!'
    }
    res.json(temp)
  } catch (error) {
    next(error)
  }
})

module.exports = router
