// const {expect} = require('chai')
// const db = require('../index')
// const User = db.model('user')
// const Order = db.model('order')
// const OrderProduct = db.model('OrderProduct')
// const Product = db.model('product')

// describe('Order model', () => {
//   beforeEach(() => {
//     return db.sync({force: true})
//   })

//   describe('getTotal method', () => {
//     let guest, guestOrder, product

//     beforeEach(async () => {
//       guest = await User.create({
//         firstName: 'Rando',
//         lastName: 'Guest',
//         email: 'rando@guest.com',
//         password: '12345'
//       })

//       guestOrder = await Order.create({
//         userId: guest.id,
//         purchased: false
//       })

//       product = await Product.create({
//         name: 'testProduct',
//         imgUrl: 'some_picture.jpg',
//         description: 'blah blah blah',
//         price: 10,
//         inventory: 100
//       })

//       await guestOrder.addProduct(product, {through: OrderProduct})
//     })

//     it('getTotal() returns the total price of the order', async () => {
//       console.log('Product: ', product)
//       console.log('Guest Order: ', await guestOrder.getProducts())
//       expect(await guestOrder.getTotal()).to.be.equal(20)
//     })
//   })
// })

// // items = await Promise.all([
// //   OrderProduct.create({
// //     orderId: guestOrder.id,
// //     productId: 4,
// //     quantity: 2,
// //     unitPrice: 16000
// //   }),
// //   OrderProduct.create({
// //     orderId: guestOrder.id,
// //     productId: 5,
// //     quantity: 4,
// //     unitPrice: 200
// //   })
// // ])
