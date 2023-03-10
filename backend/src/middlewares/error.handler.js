const APIError = require('../utils/error')

const errorHandlerMiddleware = (err, req, res, next) => {
  if (err instanceof APIError) {
    return res.status(APIError.status || 400).json({
      success: false,
      message: err.message,
    })
  }
  if (err.name === 'ReferenceError') {
    console.log(err)
    return res.status(400).json({
      success: false,
      message: 'ReferenceError occurred',
    })
  }
  if (err.name === 'TypeError') {
    console.log(err)
    return res.status(400).json({
      success: false,
      message: 'TypeError occurred',
    })
  }
  if (err.name === 'SystemError') {
    return res.status(400).json({
      success: false,
      message: 'SystemError occurred',
    })
  } else {
    return res.status(400).json({
      success: false,
      message: 'API ERROR',
    })
  }
}
module.exports = { errorHandlerMiddleware }
