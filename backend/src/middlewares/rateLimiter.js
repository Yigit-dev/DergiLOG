const rateLimit = require('express-rate-limit')

const rateLimiter = rateLimit({
  windowMs: 24 * 60 * 60 * 1000, // 24 hrs in milliseconds
  max: 100000,
  message: 'You have exceeded the 1 requests in 24 hrs limit!',
  standardHeaders: true,
  legacyHeaders: false,
})
module.exports = rateLimiter
