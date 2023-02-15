const Joi = require('joi')
const registerValidation = Joi.object({
  role: Joi.string().default('user'),
  username: Joi.string().required().min(6).max(30),
  name: Joi.string().required().min(3).max(30),
  surname: Joi.string().required().min(3).max(30),
  email: Joi.string().required().email().min(3).max(30),
  photo: Joi.string().required(),
  password: Joi.string().required().min(6).max(120),
  gender: Joi.string().required(),
  interest: Joi.array().items(Joi.string()),
  subsciption_journal: Joi.array().items(Joi.string()),
  followed: Joi.array().items(Joi.string()),
})
const loginValidation = Joi.object({
  username: Joi.string().required().min(6).max(30),
  email: Joi.string().email().required().min(3).max(30),
  password: Joi.string().required().min(6).max(120),
})
const updateValidation = Joi.object({
  role: Joi.string().default('user'),
  username: Joi.string().min(6).max(30),
  name: Joi.string().min(3).max(30),
  surname: Joi.string().min(3).max(30),
  email: Joi.string().email().required().min(3).max(30),
  photo: Joi.string(),
  password: Joi.string().required().min(6).max(120),
  gender: Joi.string(),
})
const deleteValidation = Joi.object({
  email: Joi.string().email().min(3).max(30),
  password: Joi.string().min(6).max(120),
  username: Joi.string().min(6).max(30),
})
module.exports = { registerValidation, loginValidation, updateValidation, deleteValidation }
