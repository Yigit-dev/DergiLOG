const checkRoles = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.user.userInfo.role) return res.status(400).json({ message: 'Unauthorized.' })
    const rolesArray = [...allowedRoles]
    const result = rolesArray.map(role => req.user.userInfo.role == role).find(val => val === true)
    if (!result) return res.status(400).json({ message: 'Unauthorized.' })
    next()
  }
}
module.exports = checkRoles
