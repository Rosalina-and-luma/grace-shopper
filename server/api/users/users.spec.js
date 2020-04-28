/* global describe beforeEach it */

const {expect} = require('chai')
const request = require('supertest')
const db = require('../../db')
const app = require('../../index')
const User = db.model('user')

describe('User routes', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('/api/users/', () => {
    // const codysEmail = 'cody@puppybook.com'

    // beforeEach(() => {
    //   return User.create({
    //     email: codysEmail
    //   })
    // })

    it('unable to acess users api if not an admin', async () => {
      const res = await request(app)
        .get('/api/users')
        .expect(403)
    })

    it('POST method creates a new user in the db', async () => {
      const res = await request(app)
        .post('/api/users', {
          firstName: 'harry',
          lastName: 'potter',
          email: 'hp@hogwarts.com',
          password: 'snitch'
        })
        .expect(200)

      expect(res.body).to.be.an('object')
    })
  }) // end describe('/api/users')
}) // end describe('User routes')
