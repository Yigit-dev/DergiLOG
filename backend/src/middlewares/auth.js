const jwt = require('jsonwebtoken')
const User = require('../models/User')
const APIError = require('../utils/error')
const Response = require('../utils/response')

const createToken = async user => {
  const payload = {
    sub: user._id,
    name: user.name,
    role: user.role,
  }

  const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET_KEY, {
    algorithm: 'HS256',
    expiresIn: process.env.JWT_REFRESH_EXPIRES_IN,
  })
  const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET_KEY, {
    algorithm: 'HS256',
    expiresIn: process.env.JWT_ACCESS_EXPIRES_IN,
  })
  return { refreshToken, accessToken }
}

const checkToken = async (req, res, next) => {
  const headerToken = req.headers.authorization && req.headers.authorization.startsWith('Bearer ')
  if (!headerToken) {
    throw new APIError('Token needs to start with Bearer!', 400)
  }
  if (!req.cookies.refresh_token) throw new APIError('Please sign in', 401)
  if (!req.cookies.access_token) {
    throw new APIError('Token expired', 401)
  }
  const token = req.headers.authorization.split(' ')[1]
  // console.log(token)
  jwt.verify(token, process.env.JWT_ACCESS_SECRET_KEY, async (err, decodedToken) => {
    if (err) {
      return new Response(token, 'Invalid Token').error401(res)
    }
    //decodedToken.sub ( user._id )
    const userInfo = await User.findById(decodedToken.sub).select('role _id name email')
    if (!userInfo) {
      throw new APIError('Invalid token', 401)
    }
    req.user = userInfo
    next()
  })
}
const refreshToken = async (req, res, next) => {
  if (!req.cookies.refresh_token) throw new APIError('Please sign in', 401)

  const headerToken = req.headers.authorization && req.headers.authorization.startsWith('Bearer ')
  if (!headerToken) {
    throw new APIError('Token needs to start with Bearer!', 400)
  }
  const token = req.headers.authorization.split(' ')[1]
  if (token != req.cookies.refresh_token) throw new APIError('Invalid refresh token!', 401)
  // console.log(token)
  jwt.verify(token, process.env.JWT_REFRESH_SECRET_KEY, async (err, decodedToken) => {
    if (err) {
      res.status(401).json({ message: 'Invalid token please login' })
      return
    }
    //decodedToken.sub ( user._id )
    const userInfo = await User.findById(decodedToken.sub).select('role _id name email')
    if (!userInfo) {
      throw new APIError('Invalid token', 401)
    }
    const payload = {
      sub: userInfo._id,
      name: userInfo.name,
      role: userInfo.role,
    }
    const accessToken = await jwt.sign(payload, process.env.JWT_ACCESS_SECRET_KEY, {
      algorithm: 'HS256',
      expiresIn: process.env.JWT_ACCESS_EXPIRES_IN,
    })
    console.log('REFRESHED ACCESS:' + accessToken)
    req.accessToken = accessToken
    res.cookie('access_token', accessToken, { httpOnly: true, secure: false, maxAge: 1000 * 60 * 15 })
    req.user = userInfo
    next()
  })
}
module.exports = { createToken, checkToken, refreshToken }
