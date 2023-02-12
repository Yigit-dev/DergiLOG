const Joi = require('joi')

const createValidation = Joi.object({
  cover: Joi.string().required().min(4).max(30),
  title: Joi.string().required().min(4).max(30),
  slug: Joi.string().required().min(3).max(40),
  description: Joi.string().required(),
  date: Joi.date().required(),
  author_id: Joi.string().hex().length(24).required(),
  tags: Joi.array().items(Joi.string()).required(),
  category: Joi.string().required(),
  likes: Joi.array().items(Joi.string()),
  status: Joi.array().items(Joi.string()).default('draft'),
  post_type: Joi.string(),
  content: Joi.string().required().min(10),
})
const updateValidation = Joi.object({
  post_id: Joi.string().hex().length(24).required(),
  cover: Joi.string().min(4).max(30),
  title: Joi.string().min(4).max(30),
  slug: Joi.string().min(3).max(40),
  description: Joi.string(),
  date: Joi.date(),
  author_id: Joi.string().hex().length(24).required(),
  tags: Joi.array().items(Joi.string()),
  category: Joi.string(),
  likes: Joi.array().items(Joi.string()),
  status: Joi.array().items(Joi.string()).default('draft'),
  post_type: Joi.string(),
  content: Joi.string().min(10),
})
const deleteValidation = Joi.object({
  post_id: Joi.string().hex().length(24).required(),
  title: Joi.string().min(4).max(30),
})
module.exports = { createValidation, updateValidation, deleteValidation }
