const Joi = require('Joi')

const createValidation = Joi.object({
  company_name: Joi.string().required(),
  company_moderators: Joi.array().items(Joi.string()),
  company_authors: Joi.array().items(Joi.string()),
})
const updateValidation = Joi.object({
  company_name: Joi.string(),
  company_moderators: Joi.array().items(Joi.string()),
  company_authors: Joi.array().items(Joi.string()),
})
module.exports = { createValidation, updateValidation }
