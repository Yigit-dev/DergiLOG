const router = require('express').Router()
const { getAllPosts, getPost, getAllJournals, getJournal } = require('../controllers/timeline.controller')
router.get('/posts', getAllPosts)
router.get('/post/:id', getPost)
router.get('/journals', getAllJournals)
router.get('/journal/:id', getJournal)
module.exports = router
