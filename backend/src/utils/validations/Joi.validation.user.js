const Joi = require('joi')
const registerValidation = Joi.object({
  role: Joi.string().default('user'),
  username: Joi.string().required().min(6).max(30),
  name: Joi.string().required().min(3).max(30),
  email: Joi.string().required().email().min(3).max(30),
})
const loginValidation = Joi.object({
  login: Joi.string().required().min(3).max(30),
  password: Joi.string().required().min(6).max(120),
})
const updateValidation = Joi.object({
  username: Joi.string().min(6).max(30),
  email: Joi.string().email().required().min(3).max(30),
  password: Joi.string().required().min(6).max(120),
})
const deleteValidation = Joi.object({
  email: Joi.string().email().min(3).max(30),
  password: Joi.string().min(6).max(120),
  username: Joi.string().min(6).max(30),
})
module.exports = { registerValidation, loginValidation, updateValidation, deleteValidation }
