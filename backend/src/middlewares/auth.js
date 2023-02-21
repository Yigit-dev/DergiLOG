const jwt = require('jsonwebtoken')
const User = require('../models/User')
const APIError = require('../utils/error')

const createToken = async user => {
  const payload = {
    sub: user._id,
    name: user.name,
    role: user.role,
  }
  const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, {
    algorithm: 'HS256',
    expiresIn: process.env.JWT_EXPIRES_IN,
  })
  console.log(token)
  return token
}

const checkToken = async (req, res, next) => {
  const headerToken = req.headers.authorization && req.headers.authorization.startsWith('Bearer ')
  if (!headerToken) {
    throw new APIError('Token needs to start with Bearer!', 400)
  }
  if (!req.cookies.user_token) {
    throw new APIError('Please login', 401)
  }
  const token = req.headers.authorization.split(' ')[1]
  // console.log(token)
  jwt.verify(token, process.env.JWT_SECRET_KEY, async (err, decodedToken) => {
    if (err) {
      return new APIError('Invalid token', 401)
    }
    //decodedToken.sub ( user._id )
    const userInfo = await User.findById(decodedToken.sub).select('role _id name email')
    if (!userInfo) {
      throw new APIError('Invalid token', 401)
    }
    req.user = userInfo
    console.log('User from checktoken' + req.user)
    next()
  })
}
module.exports = { createToken, checkToken }
