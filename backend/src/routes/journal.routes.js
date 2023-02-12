const router = require('express').Router()
const { journalCreate, updateJournal, deleteJournal } = require('../controllers/journal.controller')
const validate = require('../middlewares/validations/validate')
const schemas = require('../utils/validations/Joi.validation.journal')
router.post('/create', validate(schemas.createValidation), journalCreate)
router.put('/', validate(schemas.updateValidation), updateJournal)
router.delete('/', validate(schemas.deleteValidation), deleteJournal)
module.exports = router
