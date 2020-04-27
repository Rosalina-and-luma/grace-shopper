async function isAdmin(req, res, next) {
  if (req.session.userId) {
    const user = await User.findByPk(req.session.userId)
    if (user.isAdmin) {
      return next()
    }
  }
  res.status(403).send('access denied')
}

module.exports = isAdmin
