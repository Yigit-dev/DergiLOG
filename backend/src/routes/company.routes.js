const router = require('express').Router()
const {
  creatingCompany,
  updatingCompany,
  deletingCompany,
  getCompanyJournals,
  getCompanyPosts,
  getCompanyMembers,
  getLastPostsAndJournal,
} = require('../controllers/company.controllers')
const { checkToken } = require('../middlewares/auth')
const checkRole = require('../middlewares/checkRoles')
const validate = require('../middlewares/validations/validate')
const schemas = require('../utils/validations/Joi.validation.company')
router.post('/', validate(schemas.createValidation), checkToken, checkRole('admin'), creatingCompany)
router.put('/:id', validate(schemas.updateValidation), checkToken, checkRole('admin', 'moderator'), updatingCompany)
router.get('/:companyName/journals', checkToken, checkRole('admin', 'moderator'), getCompanyJournals)
router.get('/:companyName/posts', checkToken, checkRole('admin', 'moderator'), getCompanyPosts)
router.delete('/:id', checkToken, checkRole('admin'), deletingCompany)
router.get('/:id', checkToken, checkRole('admin', 'moderator'), getCompanyMembers)
router.get('/:id/LastPostsAndJournal', checkToken, getLastPostsAndJournal)
module.exports = router
