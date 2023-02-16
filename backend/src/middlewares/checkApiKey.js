const APIError = require('../utils/error')
const checkApiKey = async (req, res, next) => {
  if (req.header('x-api-key') === process.env.API_KEY) next()
  else throw new APIError('API KEY IS NOT VALID', 401)
}

module.exports = checkApiKey
