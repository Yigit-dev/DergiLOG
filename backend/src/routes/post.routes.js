const router = require('express').Router()
const { createPost, updatePost, deletePost } = require('../controllers/post.controller')
router.post('/create', createPost)
router.put('/update/', updatePost)
router.delete('/delete', deletePost)
module.exports = router
