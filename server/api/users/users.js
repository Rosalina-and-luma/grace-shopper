const router = require('express').Router()
const {User} = require('../../db/models')
module.exports = router

async function isAdmin(req, res, next) {
  if (req.session.userId) {
    const user = await User.findByPk(req.session.userId)
    if (user.isAdmin) {
      return next()
    }
  }
  res.redirect('../products')
}

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
    res.json(newUser)
  } catch (error) {
    next(error)
  }
})

router.get('/:userId', async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.userId)
    res.json(user)
  } catch (error) {
    next(error)
  }
})

router.put('/:userId', async (req, res, next) => {
  try {
    if (req.session.id) {
      const userId = req.session.id
      const {firstName, lastName, email} = req.boyd
      const user = User.update(
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
      res.json(user)
    }
  } catch (error) {
    next(error)
  }
})
