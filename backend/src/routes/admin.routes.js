const router = require('express').Router()
const { sendAnInvate } = require('../controllers/admin.controller')
const { checkToken } = require('../middlewares/auth')
const checkRole = require('../middlewares/checkRoles')
const validate = require('../middlewares/validations/validate')
const schemas = require('../utils/validations/Joi.validation.Notification')

router.post(
  '/sendInvate/:id',
  validate(schemas.createValidation),
  checkToken,
  checkRole('admin', 'moderator'),
  sendAnInvate
)

module.exports = router
