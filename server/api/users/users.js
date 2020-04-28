const router = require('express').Router()
const {User} = require('../../db/models')
const isAdmin = require('../utilities')
module.exports = router

router.use(isAdmin)

router.get('/', isAdmin, async (req, res, next) => {
  try {
    console.log(isAdmin)
    const users = await User.findAll({
      attributes: ['id', 'firstName', 'lastName', 'email']
    })
    res.json(users)
  } catch (err) {
    next(err)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const {firstName, lastName, email, password} = req.body
    const newUser = await User.create({
      firstName,
      lastName,
      email,
      password
    })
    res.json(newUser)
  } catch (error) {
    next(error)
  }
})
