const router = require('express').Router()
const { journalCreate, updateJournal, deleteJournal, addPostToJournal } = require('../controllers/journal.controller')
const validate = require('../middlewares/validations/validate')
const schemas = require('../utils/validations/Joi.validation.journal')
const postschema = require('../utils/validations/Joi.validation.post')
router.post('/', validate(schemas.createValidation), journalCreate)
router.put('/:id', validate(schemas.updateValidation), updateJournal)
router.post('/:id/addPost', validate(postschema.createValidation), addPostToJournal)
router.delete('/:id', deleteJournal)
module.exports = router
