const Joi = require('joi')
const registerValidation = Joi.object({
  role: Joi.string().default('user'),
  username: Joi.string().required().min(6).max(30),
  name: Joi.string().required().min(3).max(30),
  email: Joi.string().required().email().min(3).max(30),
  password: Joi.string().required().min(6).max(120),
})
const loginValidation = Joi.object({
  login: Joi.string().required().min(3).max(30),
  password: Joi.string().required().min(6).max(120),
})

module.exports = { registerValidation, loginValidation }
