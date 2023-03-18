const Joi = require('joi')

const updateValidation = Joi.object({
  photo: Joi.string(),
  gender: Joi.string(),
  interests: Joi.array().items(Joi.string()),
  username: Joi.string().min(6).max(30),
  name: Joi.string().min(3).max(30),
  surname: Joi.string().min(3).max(30),
  email: Joi.string().email().min(3).max(30),
})
module.exports = { updateValidation }
