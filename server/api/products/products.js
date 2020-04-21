const router = require('express').Router()

// import products model

const tempData = [
  {
    id: 1,
    name: 'wand one',
    imgUrl: 'https://alivans.com/wp-content/uploads/2017/05/ROSEWOOD_THUMB.jpg',
    description: 'this wand rules!',
    price: 10.89,
    category: 'wand',
    inventory: 10
  },
  {
    id: 2,
    name: 'wand two',
    imgUrl: 'https://alivans.com/wp-content/uploads/2017/05/ROSEWOOD_THUMB.jpg',
    description: 'this wand is not great',
    price: 6.9,
    category: 'wand',
    inventory: 90
  }
]

router.get('/', (req, res, next) => {
  try {
    // const products = await Products.findAll()
    //res.json(products)
    res.json(tempData)
  } catch (err) {
    next(err)
  }
})

module.exports = router
