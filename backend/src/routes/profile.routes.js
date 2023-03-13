const router = require('express').Router()
const validate = require('../middlewares/validations/validate')
const schemas = require('../utils/validations/Joi.validation.profile')
const { updateUser, getProfile, uploadPhoto } = require('../controllers/profile.controller')

router.get('/:username/:id', getProfile)
router.put('/:username/:id', validate(schemas.updateValidation), uploadPhoto, updateUser)

module.exports = router
