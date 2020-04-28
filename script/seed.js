'use strict'
const db = require('../server/db')
const {
  User,
  Product,
  Category,
  Order,
  OrderProduct
} = require('../server/db/models')

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  const users = await Promise.all([
    User.create({
      firstName: 'Cody',
      lastName: 'Pug',
      email: 'cody@email.com',
      password: '123'
    }),
    User.create({
      firstName: 'Murphy',
      lastName: 'Potter',
      email: 'murphy@email.com',
      password: '345'
    }),
    User.create({
      firstName: 'Rubeus',
      lastName: 'Hagrid',
      email: 'hagrid@hogwarts.edu',
      password: 'feefifofum',
      isAdmin: true
    }),
    User.create({
      firstName: 'Hermione',
      lastName: 'Granger',
      email: 'hgranger@hogwarts.edu',
      password: 'iAmSmaRt',
      isAdmin: true
    }),
    User.create({
      firstName: 'Helga',
      lastName: 'Hufflepuff',
      email: 'h@hufflepuff.com',
      password: 'hufflepuff'
    }),
    User.create({
      firstName: 'Draco',
      lastName: 'Malfoy',
      email: 'draco@malfoy.com',
      password: 'slytherinrulez'
    }),
    User.create({
      firstName: 'Gregory',
      lastName: 'Goyle',
      email: 'ggoyle@goyle.com',
      password: '54321'
    }),
    User.create({
      firstName: 'Cho',
      lastName: 'Chang',
      email: 'cchange@cho.com',
      password: '1234567'
    }),
    User.create({
      firstName: 'Lavender',
      lastName: 'Brown',
      email: 'lavender@brown.com',
      password: 'flowerpower'
    }),
    User.create({
      firstName: 'Amelia',
      lastName: 'Bones',
      email: 'amelia@bones.com',
      password: 'bonesAmelia',
      isAdmin: true
    }),
    User.create({
      firstName: 'Susan',
      lastName: 'Bones',
      email: 'susan@bones.com',
      password: 'magic124'
    }),
    User.create({
      firstName: 'Colin',
      lastName: 'Creevey',
      email: 'thecreeves@creevey.com',
      password: 'dumbledore'
    }),
    User.create({
      firstName: 'Dennis',
      lastName: 'Creevey',
      email: 'dennis@hogwarts.edu',
      password: '597486305'
    }),
    User.create({
      firstName: 'Dirk',
      lastName: 'Cresswell',
      email: 'creswell@dirk.com',
      password: 'dirk1298'
    }),
    User.create({
      firstName: 'Cedric',
      lastName: 'Diggory',
      email: 'cdigg@digg.net',
      password: 'canYouDiggIt'
    }),
    User.create({
      firstName: 'Albus',
      lastName: 'Dumbledore',
      email: 'albus@hogwarts.edu',
      password: 'Transfig2',
      isAdmin: true
    }),
    User.create({
      firstName: 'Dudley',
      lastName: 'Dursley',
      email: 'dudley@dursley.com',
      password: 'dursley09472'
    }),
    User.create({
      firstName: 'Cornelius',
      lastName: 'Fudge',
      email: 'fudge@fudge.com',
      password: 'CornFudge1'
    })
  ])

  const categories = await Promise.all([
    Category.create({id: 1, name: 'wands'}),
    Category.create({id: 2, name: 'brooms'}),
    Category.create({id: 3, name: 'robes'}),
    Category.create({id: 4, name: 'misc'})
  ])

  const products = await Promise.all([
    Product.create({
      name: 'Elder Wand',
      imgUrl:
        'https://vignette.wikia.nocookie.net/harrypotter/images/5/59/Elder_Wand.png/revision/latest?cb=20161128051519',
      description: '35.5cm, the finest elderwood',
      price: 500,
      categoryId: 1,
      inventory: 52
    }),
    Product.create({
      name: 'Fred Wand',
      imgUrl:
        'https://static.wixstatic.com/media/5ec770_d8536997be814c1a885a5c27eeece84a~mv2.jpg/v1/fill/w_485,h_485,al_c,lg_1,q_85/5ec770_d8536997be814c1a885a5c27eeece84a~mv2.jpg',
      description: '34.5cm, guaranteed by Fred and George for all your pranks',
      price: 125,
      categoryId: 1,
      inventory: 139
    }),
    Product.create({
      name: 'George Wand',
      imgUrl:
        'https://vignette.wikia.nocookie.net/hpwands/images/d/db/GWwand.jpg/revision/latest/scale-to-width-down/340?cb=20141103054542',
      description: '35cm',
      price: 225,
      categoryId: 1,
      inventory: 122
    }),
    Product.create({
      name: 'Harry Wand',
      imgUrl:
        'https://cdn.shopify.com/s/files/1/2597/5112/products/hpnbwand_1_1024x1024@2x.jpg?v=1575933194',
      description: '33.5cm',
      price: 525,
      categoryId: 1,
      inventory: 42
    }),
    Product.create({
      name: 'Luna Wand',
      imgUrl:
        'https://www.renderhub.com/dmitriykotliar/wand-of-luna-lovegood-from-the-movie-harry-potter/wand-of-luna-lovegood-from-the-movie-harry-potter-04.jpg',
      description: '34.5cm',
      price: 225,
      categoryId: 1,
      inventory: 184
    }),
    Product.create({
      name: 'Graves Wand',
      imgUrl:
        'https://vignette.wikia.nocookie.net/harrypotter/images/c/c6/Percival_Graves_wand.png/revision/latest?cb=20161128064141',
      description: '36.5cm',
      price: 125,
      categoryId: 1,
      inventory: 103
    }),
    Product.create({
      name: 'Ron Wand',
      imgUrl:
        'https://cdn.giftsdigest.com/wp-content/uploads/2018/12/ron-weasley-s-wand.jpg',
      description: '34.5cm',
      price: 155,
      categoryId: 1,
      inventory: 86
    }),
    Product.create({
      name: 'Hermione Wand',
      imgUrl:
        'https://images-na.ssl-images-amazon.com/images/I/61uMOXYj4RL._AC_SL1500_.jpg',
      description: '38cm',
      price: 175,
      categoryId: 1,
      inventory: 77
    }),
    Product.create({
      name: 'Cedric Wand',
      imgUrl:
        'https://cdn11.bigcommerce.com/s-z5x6hb/images/stencil/1280x1280/products/13923/16834/b25d4895-b184-4a50-94bb-7ec66bdf0f89__56515.1529076234.jpg?c=2?imbypass=on',
      description: '37cm',
      price: 145,
      categoryId: 1,
      inventory: 28
    }),
    Product.create({
      name: 'Ginny Wand',
      imgUrl:
        'https://cdn.shopify.com/s/files/1/2597/5112/products/hpnbwandgin_300x300.jpg?v=1575933194',
      description: '36.5cm',
      price: 145,
      categoryId: 1,
      inventory: 27
    }),
    Product.create({
      name: 'McGonogall Wand',
      imgUrl:
        'https://vignette.wikia.nocookie.net/hpwands/images/1/17/MMwand.jpg/revision/latest/scale-to-width-down/340?cb=20141103234937',
      description: '35cm',
      price: 75,
      categoryId: 1,
      inventory: 34
    }),
    Product.create({
      name: 'LongBottom Wand',
      imgUrl:
        'https://cdn.shopify.com/s/files/1/2597/5112/products/hpnbwandnl02_1_1024x1024@2x.jpg?v=1575933195',
      description: '34cm',
      price: 75,
      categoryId: 1,
      inventory: 29
    }),
    Product.create({
      name: 'Malfoy Wand',
      imgUrl:
        'https://images-na.ssl-images-amazon.com/images/I/41BILH8YS4L._AC_SL1080_.jpg',
      description: '36.5cm',
      price: 175,
      categoryId: 1,
      inventory: 52
    }),
    Product.create({
      name: 'Snape Wand',
      imgUrl:
        'https://vignette.wikia.nocookie.net/harrypotter/images/3/30/Severus_Snape_wand.png/revision/latest?cb=20161128052653',
      description: '38cm',
      price: 205,
      categoryId: 1,
      inventory: 12
    }),
    Product.create({
      name: 'Sirus Wand',
      imgUrl:
        'https://vignette.wikia.nocookie.net/harrypotter/images/9/9e/Sirius_Black_wand.png/revision/latest?cb=20161128052654',
      description: '40cm',
      price: 75,
      categoryId: 1,
      inventory: 28
    }),
    Product.create({
      name: 'Nimbus 2000',
      imgUrl:
        'https://ottosgranary.com/wp-content/uploads/2019/04/mtmzk6ry5z3d4wnyyukh.jpg',
      description: 'nimble and fast, great for seekers',
      price: 7800,
      categoryId: 2,
      inventory: 20
    }),
    Product.create({
      name: 'Firebolt',
      imgUrl: 'https://i.ebayimg.com/images/g/kfsAAOSwLSZcNTkL/s-l640.jpg',
      description: 'cutting edge flying technology',
      price: 16000,
      categoryId: 2,
      inventory: 10
    }),
    Product.create({
      name: 'Harry Potter Wand',
      imgUrl:
        'https://images-na.ssl-images-amazon.com/images/I/31PgXGkd04L._AC_.jpg',
      description: 'fly like Mr. Potter himself',
      price: 15000,
      categoryId: 2,
      inventory: 5
    }),
    Product.create({
      name: 'Gryffindor robe',
      imgUrl:
        'https://cdn.shopify.com/s/files/1/1541/8579/products/Robe-Adults-Gryffindor-HarryPotter-Product-_6_grande.jpg?v=1586234451',
      description: 'for brave and loyal souls (wand not included)',
      price: 200,
      categoryId: 3,
      inventory: 120
    }),
    Product.create({
      name: 'Slytherin robe',
      imgUrl:
        'https://cdn.shopify.com/s/files/1/1541/8579/products/Slytherin_Robe_5_grande.jpg?v=1586234778',
      description: 'for those with cunning ambition (wand not included)',
      price: 200,
      categoryId: 3,
      inventory: 120
    }),
    Product.create({
      name: 'Hufflepuff Robe',
      imgUrl:
        'https://cdn.shopify.com/s/files/1/1541/8579/products/Robe-Kids-Hufflepuff-HarryPotter-Product-_5_118f1f7e-0201-40de-939a-f702d64a751a.jpg?v=1543301078',
      description: 'The official robe of the Hufflepuff house',
      price: 200,
      categoryId: 3,
      inventory: 150
    }),
    Product.create({
      name: 'Ravenclaw Robe',
      imgUrl:
        ' https://cdn.shopify.com/s/files/1/1541/8579/products/Ravenclaw_Robe_5_grande.jpg?v=1586234574',
      description: 'for those who are witty and creative',
      price: 200,
      categoryId: 3,
      inventory: 140
    }),
    Product.create({
      name: 'Erised Mirror',
      imgUrl:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRlGeKx8KV6jE2Hc3dVZBI06_z8DheNuE-t4sa5Yhlh2_nOdU6FpskT8TEEsGc8eOIhj-UD7J8&usqp=CAc',
      description: `reveal your heart's desires`,
      price: 40000,
      categoryId: 4,
      inventory: 2
    }),
    Product.create({
      name: 'Time Turner',
      imgUrl:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQz6Gwh6yWjI-5_-bw5TRoVg8BVlnblfUOGsRte6_GgGkFTPOAR1PZVeb4mBlUxD5gRmQcGgnhE&usqp=CAc',
      description: 'revisit your fondest memories, literally',
      price: 80000,
      categoryId: 4,
      inventory: 1
    }),
    Product.create({
      name: 'Veritaserum',
      imgUrl:
        'https://gamepress.gg/wizardsunite/wizardsunite/sites/wizardsunite/files/2019-05/Veritaserum-foundable.png',
      description: 'hear the truth with this potion',
      price: 300,
      categoryId: 4,
      inventory: 1
    })
  ])

  const cody = await User.findOne({
    where: {
      email: 'cody@email.com'
    }
  })

  const codyOrder = await Order.create({
    userId: cody.id,
    purchased: false
  })

  const murphy = await User.findOne({
    where: {
      email: 'murphy@email.com'
    }
  })

  const murphyOrder = await Order.create({
    userId: murphy.id,
    purchased: false
  })

  const hagrid = await User.findOne({
    where: {
      email: 'hagrid@hogwarts.edu'
    }
  })

  const hagridOrder = await Order.create({
    userId: hagrid.id,
    purchased: false
  })

  const hagridOrder2 = await Order.create({
    userId: hagrid.id,
    purchased: false
  })

  const hagridOrder3 = await Order.create({
    userId: hagrid.id,
    purchased: false
  })

  const OrderProductData = [
    {
      orderId: codyOrder.id,
      productId: 4,
      quantity: 2,
      unitPrice: 16000
    },
    {
      orderId: codyOrder.id,
      productId: 2,
      quantity: 4,
      unitPrice: 16000
    },
    {
      orderId: codyOrder.id,
      productId: 6,
      quantity: 3,
      unitPrice: 200
    },
    {
      orderId: murphyOrder.id,
      productId: 5,
      quantity: 4,
      unitPrice: 200
    },
    {
      orderId: murphyOrder.id,
      productId: 1,
      quantity: 4,
      unitPrice: 500
    },
    {
      orderId: hagridOrder.id,
      productId: 1,
      quantity: 4,
      unitPrice: 500
    },
    {
      orderId: hagridOrder.id,
      productId: 3,
      quantity: 4,
      unitPrice: 7800
    },
    {
      orderId: hagridOrder2.id,
      productId: 7,
      quantity: 8,
      unitPrice: 40000
    },
    {
      orderId: hagridOrder2.id,
      productId: 8,
      quantity: 2,
      unitPrice: 80000
    },
    {
      orderId: hagridOrder3.id,
      productId: 5,
      quantity: 4,
      unitPrice: 16000
    },
    {
      orderId: hagridOrder3.id,
      productId: 2,
      quantity: 2,
      unitPrice: 500
    }
  ]

  await OrderProduct.bulkCreate(OrderProductData)
  await murphyOrder.update({purchased: true})

  const orders = await Order.findAll()

  console.log(`seeded ${categories.length} categories`)
  console.log(`seeded ${users.length} users`)
  console.log(`seeded ${products.length} products`)
  console.log(`seeded ${orders.length} orders`)
  console.log(`seeded successfully`)
}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
