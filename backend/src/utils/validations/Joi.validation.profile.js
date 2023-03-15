const Joi = require('joi')

const updateValidation = Joi.object({
  photo: Joi.string(),
  gender: Joi.string(),
  interests: Joi.array().items(Joi.string()),
})
module.exports = { updateValidation }
