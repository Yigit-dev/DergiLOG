const router = require('express').Router()
const { getAllPosts, getPost, getAllJournals, getJournal } = require('../controllers/timeline.controller')
router.get('/posts', getAllPosts)
router.get('/getOne/:title', getPost)
router.get('/journals', getAllJournals)
router.get('/getOne', getJournal)
module.exports = router
