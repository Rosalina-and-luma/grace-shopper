const {expect} = require('chai')
const db = require('../../db')
const app = require('../../index')
const agent = require('supertest')(app)

// const User = db.model('product')

describe('Products route', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('/api/products', () => {
    it('gets all the products from the database', async () => {
      const res = await agent.get('/api/products').expect(200)
      expect(res.body).to.be.an('array')
    })

    it('blocks non-admins from accessing the POST route', async () => {
      const res = await agent
        .post('/api/products', {
          name: 'malware',
          price: 50000,
          inventory: -1,
          categoryId: -2
        })
        .expect(403)
    })
  })
})
