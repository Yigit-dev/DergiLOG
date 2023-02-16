const router = require('express').Router()
const validate = require('../middlewares/validations/validate')
const schemas = require('../utils/validations/Joi.validation.profile')
const { updateUser, getProfile } = require('../controllers/profile.controller')

router.get('/:id', getProfile)
router.put('/:id', validate(schemas.updateValidation), updateUser)

module.exports = router
