const {expect} = require('chai')
const db = require('../../db')
const Product = db.model('product')
const app = require('../../index')
const agent = require('supertest')(app)

describe('Products route', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('/api/products', () => {
    const items = [
      {
        name: 'Elder Wand',
        imgUrl:
          'https://vignette.wikia.nocookie.net/harrypotter/images/5/59/Elder_Wand.png/revision/latest?cb=20161128051519',
        description: '35.5cm, the finest elderwood',
        price: 500,
        inventory: 50
      },
      {
        name: 'Fred Wand',
        imgUrl:
          'https://static.wixstatic.com/media/5ec770_d8536997be814c1a885a5c27eeece84a~mv2.jpg/v1/fill/w_485,h_485,al_c,lg_1,q_85/5ec770_d8536997be814c1a885a5c27eeece84a~mv2.jpg',
        description:
          '34.5cm, guaranteed by Fred and George for all your pranks',
        price: 125,
        inventory: 700
      }
    ]

    beforeEach(async () => {
      await Product.bulkCreate(items)
    })

    const badReq = {
      name: 'malware',
      price: 50000,
      inventory: -1,
      categoryId: -2
    }

    it('gets all the products from the database', async () => {
      const res = await agent.get('/api/products').expect(200)
      expect(res.body).to.be.an('array')
      expect(res.body).to.have.lengthOf(2)
    })

    it('blocks non-admins from accessing the POST route', async () => {
      await agent.post('/api/products', badReq).expect(403)
    })

    it('blocks non-admins from accessing the POST route', async () => {
      await agent.post('/api/products', badReq).expect(403)
    })

    it('blocks non-admins from accessing the PUT route', async () => {
      await agent.put('/api/products/1', badReq).expect(403)
    })

    it('blocks non-admins from accessing the PUT route', async () => {
      await agent.delete('/api/products/1').expect(403)
    })
  })
})
