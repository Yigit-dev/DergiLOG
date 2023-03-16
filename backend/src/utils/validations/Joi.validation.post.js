const Joi = require('joi')

const createValidation = Joi.object({
  cover: Joi.string().min(4).max(30),
  title: Joi.string().required().min(4).max(30),
  description: Joi.string(),
  tags: Joi.array().items(Joi.string()),
  category: Joi.string(),
  content: Joi.string().min(10),
})
const updateValidation = Joi.object({
  cover: Joi.string().min(4).max(30),
  title: Joi.string().min(4).max(30),
  description: Joi.string(),
  tags: Joi.array().items(Joi.string()),
  category: Joi.string(),
  status: Joi.array().items(Joi.string()).default('draft'),
  post_type: Joi.string(),
  content: Joi.string().min(10),
})

module.exports = { createValidation, updateValidation }
