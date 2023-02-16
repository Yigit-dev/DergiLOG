const router = require('express').Router()
const { journalCreate, updateJournal, deleteJournal } = require('../controllers/journal.controller')
const validate = require('../middlewares/validations/validate')
const schemas = require('../utils/validations/Joi.validation.journal')
router.post('/', validate(schemas.createValidation), journalCreate)
router.put('/:id', validate(schemas.updateValidation), updateJournal)
router.delete('/:id', deleteJournal)
module.exports = router
