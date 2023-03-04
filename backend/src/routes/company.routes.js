const router = require('express').Router()
const {
  creatingCompany,
  updatingCompany,
  deletingCompany,
  getCompanyJournals,
  getCompanyPosts,
} = require('../controllers/company.controllers')
const { checkToken } = require('../middlewares/auth')
const checkRole = require('../middlewares/checkRoles')
const validate = require('../middlewares/validations/validate')
const schemas = require('../utils/validations/Joi.validation.company')
router.post('/', validate(schemas.createValidation), creatingCompany)
router.put('/:companyName/:id', validate(schemas.updateValidation), updatingCompany)
router.get('/:companyName/journals', checkToken, checkRole('admin', 'moderator'), getCompanyJournals)
router.get('/:companyName/posts', checkToken, checkRole('admin', 'moderator'), getCompanyPosts)
router.delete('/:companyName/:id', deletingCompany)

module.exports = router
