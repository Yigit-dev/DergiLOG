const router = require('express').Router()
const { journalCreate, updateJournal, deleteJournal } = require('../controllers/journal.controller')
router.post('/create', journalCreate)
router.put('/', updateJournal)
router.delete('/', deleteJournal)
module.exports = router
