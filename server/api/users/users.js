const router = require('express').Router()
const {User} = require('../../db/models')
const isAdmin = require('../utilities')
const isAuthenticated = require('../utilities')
module.exports = router

router.get('/', isAdmin, async (req, res, next) => {
  try {
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
    req.login(newUser, err => (err ? next(err) : res.json(newUser)))
  } catch (error) {
    next(error)
  }
})

router.get('/:userId', isAuthenticated, async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.userId)
    res.json(user)
  } catch (error) {
    next(error)
  }
})

router.put('/:userId', isAuthenticated, async (req, res, next) => {
  try {
    const {userId} = req.params
    const {firstName, lastName, email} = req.body
    const [affectedRows, updatedUser] = await User.update(
      {
        firstName: firstName,
        lastName: lastName,
        email: email
      },
      {
        where: {id: userId},
        returning: true,
        plain: true
      }
    )
    res.json(updatedUser.dataValues)
  } catch (error) {
    next(error)
  }
})
