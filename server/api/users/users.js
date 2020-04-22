const router = require('express').Router()
// const {User} = require('../../db/models')
module.exports = router

const tempUsers = [
  {
    id: 1,
    firsName: 'Cody',
    lastName: 'white',
    email: 'cody@test.com',
    password: '1234',
    isAdmin: false
  },
  {
    id: 2,
    firsName: 'Mohana',
    lastName: 'Bansal',
    email: 'mohana@test.com',
    password: '1111',
    isAdmin: true
  }
]

router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and email fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ['id', 'email']
    })
    res.json(users)
  } catch (err) {
    next(err)
  }
})
