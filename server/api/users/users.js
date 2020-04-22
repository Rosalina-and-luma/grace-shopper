const router = require('express').Router()
// const {User} = require('../../db/models')
module.exports = router

// router.get('/', async (req, res, next) => {
//   try {
//     const users = await User.findAll({
//       // explicitly select only the id and email fields - even though
//       // users' passwords are encrypted, it won't help if we just
//       // send everything to anyone who asks!
//       attributes: ['id', 'email']
//     })
//     res.json(users)
//   } catch (err) {
//     next(err)
//   }
// })

router.post('/', async (req, res, next) => {
  try {
    const {firstName, lastName, email, password} = req.body
    // const newUser = await User.create({
    //   firstName,
    //   lastName,
    //   email,
    //   password
    // })
    // res.json(newUser)
    let newUser = {
      firstName,
      lastName,
      email,
      password
    }
    res.json(newUser)
  } catch (error) {
    next(error)
  }
})
