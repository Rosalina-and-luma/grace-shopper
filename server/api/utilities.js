const {User} = require('../db/models')

module.exports = async function isAdmin(req, res, next) {
  if (req.session.passport) {
    const userId = req.session.passport.user
    try {
      const user = await User.findByPk(userId)
      if (user.isAdmin) {
        return next()
      }
    } catch (err) {
      console.error(err.stack)
    }
  }
  res.status(403).send('access denied')
}
