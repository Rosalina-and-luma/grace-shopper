
const {expect} = require('chai')
const db = require('../index')
const Order = db.model('order')
const OrderProduct = db.model('order_product')

describe('Order model', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('instanceMethods', () => {
    describe('getTotal', () => {
      let cody, admin

      beforeEach(async () => {
        cody = await User.create({
          email: 'cody@puppybook.com',
          password: 'bones'
        })

        admin = await User.create({
          email: 'admin@admin.com',
          password: 'the boss',
          isAdmin: true
        })
      })

      it('sets isAdmin to false by default', () => {
        expect(cody.isAdmin).to.be.equal(false)
      })

    })
  })
})

