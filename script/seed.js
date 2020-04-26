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
      inventory: 50
    }),
    Product.create({
      name: 'Fred Wand',
      imgUrl:
        'https://static.wixstatic.com/media/5ec770_d8536997be814c1a885a5c27eeece84a~mv2.jpg/v1/fill/w_485,h_485,al_c,lg_1,q_85/5ec770_d8536997be814c1a885a5c27eeece84a~mv2.jpg',
      description: '34.5cm, guaranteed by Fred and George for all your pranks',
      price: 125,
      categoryId: 1,
      inventory: 700
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

  await OrderProduct.create({
    productId: 4,
    orderId: codyOrder.id,
    quantity: 2,
    unitPrice: 16000
  })

  await OrderProduct.create({
    orderId: codyOrder.id,
    productId: 6,
    quantity: 4,
    unitPrice: 200
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

  await OrderProduct.create({
    orderId: murphyOrder.id,
    productId: 5,
    quantity: 4,
    unitPrice: 200
  })

  await murphyOrder.update({purchased: true})

  const orders = [codyOrder, murphyOrder]

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
