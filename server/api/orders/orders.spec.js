const chai = require('chai')
const expect = chai.expect
// const chaiThings = require('chai-things')
// chai.use(chaiThings)

//Order Model
const db = require('../../db')
const Order = db.model('order')

//Order Routes
const app = require('../../index')
const agent = require('supertest')(app)

describe('Order routes', () => {
  let storedOrders

  const orderData = [
    {
      purchased: false
    },
    {
      purchased: false
    }
  ]

  beforeEach(async () => {
    const createdOrders = await Order.bulkCreate(orderData)
    storedOrders = createdOrders.map(order => order.dataValues)
  })

  // Route for fetching all campuses
  describe('GET `/api/orders`', () => {
    it('serves up all Orders', async () => {
      const response = await agent.get('/api/orders').expect(200)
      expect(response.body).to.be.instanceOf(Array)
      // expect(response.body).to.have.length(2)
      // expect(response.body[0].name).to.equal(storedOrders[0].name)
    })
  })
})
