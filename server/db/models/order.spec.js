const {expect} = require('chai')
const db = require('../index')
const User = db.model('user')
const Order = db.model('order')
const OrderProduct = db.model('OrderProduct')

describe('Order model', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('instanceMethods', () => {
    describe('getTotal', () => {
      let guest, guestOrder, items

      beforeEach(async () => {
        await db.sync({force: true})

        guest = await User.create({
          firstName: 'Rando',
          lastName: 'Guest',
          email: 'rando@guest.com',
          password: '12345'
        })

        guestOrder = await Order.create({
          userId: guest.id,
          purchased: false
        })

        items = await Promise.all([
          OrderProduct.create({
            orderId: guestOrder.id,
            productId: 4,
            quantity: 2,
            unitPrice: 16000
          }),
          OrderProduct.create({
            orderId: guestOrder.id,
            productId: 5,
            quantity: 4,
            unitPrice: 200
          })
        ])
      })

      it('getTotal() returns the total price of the order', () => {
        expect(guestOrder.getTotal()).to.be.equal(32800)
      })
    })
  })
})
