const {expect} = require('chai')
const request = require('supertest')
// const db = require('../../db')
const app = require('../../index')
// const User = db.model('product')

describe('Products route', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('/api/products', () => {
    let badReq = {}

    beforeEach(() => {
      badReq = {
        name: 'malware',
        price: 50000,
        inventory: -1,
        categoryId: -2
      }
    })
    it('gets all the products from the database', async () => {
      const res = await agent.get('/api/products').expect(200)
      expect(res.body).to.be.an('array')
    })

    it('blocks non-admins from accessing the POST route', async () => {
      await agent.post('/api/products', badReq).expect(403)
    })

    it('blocks non-admins from accessing the PUT route', async () => {
      await agent.put('/api/products/1', badReq).expect(403)
    })
  })
})
