const Joi = require('Joi')

const createValidation = Joi.object({
  company_name: Joi.string().required(),
  company_members: Joi.array().items(Joi.string()),
})
const updateValidation = Joi.object({
  company_name: Joi.string(),
  company_members: Joi.array().items(Joi.string()),
})
module.exports = { createValidation, updateValidation }
