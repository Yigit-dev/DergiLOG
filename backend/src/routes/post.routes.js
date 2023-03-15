const router = require('express').Router()
const { createPost, updatePost, deletePost, getPost } = require('../controllers/post.controller')
const validate = require('../middlewares/validations/validate')
const schemas = require('../utils/validations/Joi.validation.post')
router.get('/:slug/:id', getPost)
router.post('/', validate(schemas.createValidation), createPost)
router.put('/:id', validate(schemas.updateValidation), updatePost)
router.delete('/:id', deletePost)
module.exports = router
