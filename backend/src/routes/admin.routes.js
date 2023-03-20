const router = require('express').Router()
const { sendInvite, accepInvite, rejectInvite } = require('../controllers/admin.controller')
const { checkToken } = require('../middlewares/auth')
const checkRole = require('../middlewares/checkRoles')
const validate = require('../middlewares/validations/validate')
const schemas = require('../utils/validations/Joi.validation.Notification')

router.post(
  '/sendInvite/:id',
  validate(schemas.createValidation),
  checkToken,
  checkRole('admin', 'moderator'),
  sendInvite
)
router.post('/acceptInvite/:notificationId', checkToken, checkRole('admin', 'moderator', 'author', 'user'), accepInvite)
router.post(
  '/rejectInvite/:notificationId',
  checkToken,
  checkRole('admin', 'moderator', 'author', 'user'),
  rejectInvite
)
module.exports = router
