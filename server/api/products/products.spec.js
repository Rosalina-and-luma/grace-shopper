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
    const productTest = [
      {
        id: 1,
        name: 'wand one',
        imgUrl:
          'https://alivans.com/wp-content/uploads/2017/05/ROSEWOOD_THUMB.jpg',
        description: 'this wand rules!',
        price: 10.89,
        category: 'wand',
        inventory: 10
      },
      {
        id: 2,
        name: 'wand two',
        imgUrl:
          'https://alivans.com/wp-content/uploads/2017/05/ROSEWOOD_THUMB.jpg',
        description: 'this wand is not great',
        price: 6.9,
        category: 'wand',
        inventory: 90
      }
    ]

    it('GET /api/products', async () => {
      const res = await request(app)
        .get('/api/products')
        .expect(200)

      expect(res.body).to.be.an('array')
    })
  })
})