const Joi = require('joi')

const updateValidation = Joi.object({
  role: Joi.string().default('user'),
  name: Joi.string().min(3).max(30),
  surname: Joi.string().min(3).max(30),
  photo: Joi.string(),
  gender: Joi.string(),
  interests: Joi.array().items(Joi.string()),
  subscription_journal: Joi.array().items(Joi.string()),
  followed: Joi.array().items(Joi.string()),
})
module.exports = { updateValidation }
