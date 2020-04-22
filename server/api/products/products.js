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
  },
  {
    id: 3,
    name: 'broom one',
    imgUrl:
      'https://ottosgranary.com/wp-content/uploads/2019/04/mtmzk6ry5z3d4wnyyukh.jpg',
    description: 'This is the world famous Nimbus 2000',
    price: 6.9,
    category: 'broom',
    inventory: 90
  },
  {
    id: 4,
    name: 'broom two',
    imgUrl: 'https://i.ebayimg.com/images/g/kfsAAOSwLSZcNTkL/s-l640.jpg',
    description: 'This is Firebolt broom',
    price: 9.9,
    category: 'broom',
    inventory: 90
  },
  {
    id: 5,
    name: 'robe',
    imgUrl:
      'https://cdn.shopify.com/s/files/1/1541/8579/products/Robe-Adults-Gryffindor-HarryPotter-Product-_6_grande.jpg?v=1586234451',
    description: 'Grynffindor Robe',
    price: 19.9,
    category: 'robe',
    inventory: 90
  },
  {
    id: 6,
    name: 'robe',
    imgUrl:
      ' https://cdn.shopify.com/s/files/1/1541/8579/products/Slytherin_Robe_5_grande.jpg?v=1586234778',
    description: 'Slytherine Robe',
    price: 17.9,
    category: 'robe',
    inventory: 90
  },
  {
    id: 7,
    name: 'triwizard cup',
    imgUrl:
      '  https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSUU1KbIAUX9T-haT3T_hXKM_lR726-JB2xkLq2Vv3NhHb8tsuR-5TbZ1nhSXI4GIYAIZNQ9z8q&usqp=CAc',
    description: 'Triwizard Cup',
    price: 297.9,
    category: 'misc',
    inventory: 3
  },
  {
    id: 8,
    name: 'Goblet of Fire',
    imgUrl:
      '  https://vignette.wikia.nocookie.net/harrypotter/images/c/c0/The_Goblet_of_Fire_concept_art.jpg/revision/latest?cb=20180708164225',
    description: 'Goblet of Fire',
    price: 502.9,
    category: 'misc',
    inventory: 3
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

router.get('/brooms', (req, res, next) => {
  try {
    // const products = await Products.findAll({
    //   where: {
    //     category: brooms
    //   }
    // })
    //res.json(products)
    let tempResult = tempData.filter(item => {
      if (item.category === 'broom') {
        return item
      }
    })
    console.log('TEMP TESULT----------', tempResult)
    res.json(tempResult)
  } catch (err) {
    next(err)
  }
})

router.get('/wands', (req, res, next) => {
  try {
    // const products = await Products.findAll({
    //   where: {
    //     category: wands
    //   }
    // })
    //res.json(products)
    let tempResult = tempData.filter(item => {
      if (item.category === 'wands') {
        return item
      }
    })
    console.log('TEMP TESULT----------', tempResult)
    res.json(tempResult)
  } catch (err) {
    next(err)
  }
})

module.exports = router
