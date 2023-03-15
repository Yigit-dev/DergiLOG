const Joi = require('joi')

const createValidation = Joi.object({
  journal_name: Joi.string().required().min(4).max(30),
  cover: Joi.string(),
})
const updateValidation = Joi.object({
  company_id: Joi.string().hex().length(24),
  company_name: Joi.string(),
  admin_id: Joi.string().hex().length(24),
  moderator_id: Joi.string().hex().length(24),
  author_id: Joi.string().hex().length(24),
  post_list: Joi.array().items(Joi.string()),
  followers: Joi.array().items(Joi.string()),
  subscribers: Joi.array().items(Joi.string()),
  confirmation: Joi.boolean().default(false),
})

module.exports = { createValidation, updateValidation }
