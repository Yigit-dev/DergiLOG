const router = require('express').Router()
const { createPost, updatePost, deletePost } = require('../controllers/post.controller')
const validate = require('../middlewares/validations/validate')
const schemas = require('../utils/validations/Joi.validation.post')
router.post('/create', validate(schemas.createValidation), createPost)
router.put('/update/', validate(schemas.updateValidation), updatePost)
router.delete('/:id', validate(schemas.deleteValidation), deletePost)
module.exports = router
