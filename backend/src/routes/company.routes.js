const router = require('express').Router()
const { creatingCompany, updatingCompany, deletingCompany } = require('../controllers/company.controllers')
const validate = require('../middlewares/validations/validate')
const schemas = require('../utils/validations/Joi.validation.company')
router.post('/', validate(schemas.createValidation), creatingCompany)
router.put('/:companyName/:id', validate(schemas.updateValidation), updatingCompany)
router.delete('/:companyName/:id', deletingCompany)

module.exports = router
