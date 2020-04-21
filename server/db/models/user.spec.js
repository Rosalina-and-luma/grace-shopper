/* global describe beforeEach it */

const {expect} = require('chai')
const db = require('../index')
const User = db.model('user')

describe('User model', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('instanceMethods', () => {
    describe('correctPassword', () => {
      let cody, admin

      beforeEach(async () => {
        cody = await User.create({
          firstName: 'Cody',
          lastName: 'Pug',
          email: 'cody@puppybook.com',
          password: 'bones'
        })

        admin = await User.create({
          firstName: 'The',
          lastName: 'Boss',
          email: 'admin@admin.com',
          password: 'the boss',
          isAdmin: true
        })
      })

      it('returns true if the password is correct', () => {
        expect(cody.correctPassword('bones')).to.be.equal(true)
        expect(admin.correctPassword('the boss')).to.be.equal(true)
      })

      it('returns false if the password is incorrect', () => {
        expect(cody.correctPassword('bonez')).to.be.equal(false)
        expect(admin.correctPassword('not boss')).to.be.equal(false)
      })

      it('sets isAdmin to false by default', () => {
        expect(cody.isAdmin).to.be.equal(false)
      })

      it('sets isAdmin to true for admins', () => {
        expect(admin.isAdmin).to.be.equal(true)
      })
    }) // end describe('correctPassword')
  }) // end describe('instanceMethods')
}) // end describe('User model')
