const Joi = require('joi')

const createValidation = Joi.object({
  admin_id: Joi.string().hex().length(24),
  moderator_id: Joi.string().hex().length(24),
  author_id: Joi.string().hex().length(24),
  post_list: Joi.array().items(Joi.string()),
  followers: Joi.array().items(Joi.string()),
  subscribers: Joi.array().items(Joi.string()),
  confirmation: Joi.boolean().default(false),
  journal_num: Joi.number().default(1),
})
const updateValidation = Joi.object({
  journal_num: Joi.number().required(),
  admin_id: Joi.string().hex().length(24),
  moderator_id: Joi.string().hex().length(24),
  author_id: Joi.string().hex().length(24),
  post_list: Joi.array().items(Joi.string()),
  followers: Joi.array().items(Joi.string()),
  subscribers: Joi.array().items(Joi.string()),
  confirmation: Joi.boolean().required().default(false),
})
const deleteValidation = Joi.object({
  journal_num: Joi.number().required(),
})
module.exports = { createValidation, updateValidation, deleteValidation }
