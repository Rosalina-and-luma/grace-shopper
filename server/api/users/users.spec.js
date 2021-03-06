/* global describe beforeEach it */

const {expect} = require('chai')
const request = require('supertest')
const db = require('../../db')
const app = require('../../index')
const User = db.model('user')
const agent = require('supertest')(app)

describe('User routes', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('/api/users/', () => {
    const user = {
      firstName: 'harry',
      lastName: 'potter',
      email: 'hp@hogwarts.com',
      password: 'snitch'
    }

    it('unable to acess users api if not an admin', async () => {
      const res = await agent.get('/api/users').expect(403)
    })

    it('POST method creates a new user in the db', async () => {
      const res = await agent
        .post('/api/users')
        .send(user)
        .expect(200)

      expect(res.body).to.be.an('object')
    })

    it('only User or Admin can update their page', async () => {
      const res = await agent.put(`/api/users/:userId`).expect(403)
    })
  }) // end describe('/api/users')
}) // end describe('User routes')
