const Joi = require('joi')

const createValidation = Joi.object({
  message: Joi.string().max(300),
})
module.exports = { createValidation }
