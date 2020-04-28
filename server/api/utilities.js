const {User} = require('../db/models')

module.exports = async function isAdmin(req, res, next) {
  if (req.session.passport.user) {
    const userId = req.session.passport.user
    const user = await User.findByPk(userId)
    if (user.isAdmin) {
      return next()
    }
  }
  res.status(403).send('access denied')
}
