const APIError = require('../utils/error')

const errorHandlerMiddleware = (err, req, res, next) => {
  console.log('err name :')
  if (err instanceof APIError) {
    return res.status(APIError.status || 400).json({
      success: false,
      message: err.message,
    })
  }
  if (err instanceof ReferenceError) {
    return res.status(400).json({
      success: false,
      message: 'ReferenceError occurred',
    })
  }
  if (err instanceof SystemError) {
    return res.status(400).json({
      success: false,
      message: 'SystemError occurred',
    })
  }
}
module.exports = { errorHandlerMiddleware }
