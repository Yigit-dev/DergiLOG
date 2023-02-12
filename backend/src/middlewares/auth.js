const jwt = require('jsonwebtoken')
const User = require('../models/User')

const createToken = async (user, res) => {
  const payload = {
    sub: user._id,
    name: user.name,
  }
  const token = await jwt.sign(payload, process.env.JWT_SECRET_KEY, {
    algorithm: 'HS256',
    expiresIn: process.env.JWT_EXPIRES_IN,
  })
  res.status(200).json({
    success: true,
    message: 'Token successfully created!!',
    token,
  })
}

const checkToken = async (req, res, next) => {
  const headerToken = req.headers.authorization && req.headers.authorization.startsWith('Bearer ')
  if (!headerToken) {
    res.status(401).json({
      message: 'oturum açın',
    })
  }
  const token = req.headers.authorization.split(' ')[1]
  // console.log(token)
  jwt.verify(token, process.env.JWT_SECRET_KEY, async (err, decodedToken) => {
    if (err) {
      res.status(401).json({
        message: 'invalid token',
      })
    }
    //decodedToken.sub ( user._id )
    const userInfo = await User.findById(decodedToken.sub).select('role _id name email')
    if (!userInfo) {
      res.status(401).json({
        message: 'invalid token',
      })
    }
    req.user = userInfo
    console.log(req.user)
    next()
  })
}
module.exports = { createToken, checkToken }
