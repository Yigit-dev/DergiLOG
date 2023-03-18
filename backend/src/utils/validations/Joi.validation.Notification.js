const Joi = require('joi')

const createValidation = Joi.object({
  message: Joi.string().max(50),
})
module.exports = { createValidation }
