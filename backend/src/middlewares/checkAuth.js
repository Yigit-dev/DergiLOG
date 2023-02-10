//admin moderator author user
const userCheck = (role, res) => {
  if (role === 'user') {
    res.status(401).json({
      message: 'Unaouthorize',
    })
  }
}
const adminCheck = (role, res, next) => {
  if (role === 'admin') {
  }
}
const authorCheck = (role, res, next) => {
  if (role === 'author') {
  }
}
const moderatorCheck = (role, res, next) => {
  if (role === 'moderator') {
  }
}
module.exports = { userCheck }
