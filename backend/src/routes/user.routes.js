const router = require('express').Router()
const { checkToken } = require('../middlewares/auth')
const validate = require('../middlewares/validations/validate')
const schemas = require('../utils/validations/Joi.validation.user')
const {
  userRegister,
  getAllUsers,
  userLoggedIn,
  getUser,
  updateUser,
  deleteUser,
} = require('../controllers/user.controller')
router.get('/', getAllUsers)
router.get('/user/:name', getUser)
router.post('/register', validate(schemas.registerValidation), userRegister)
router.post('/login', validate(schemas.loginValidation), userLoggedIn)
router.put('/', checkToken, validate(schemas.updateValidation), updateUser)
router.delete('/', validate(schemas.deleteValidation), deleteUser)
module.exports = router
