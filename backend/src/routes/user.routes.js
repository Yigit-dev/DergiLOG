const router = require('express').Router()
const { checkToken, refreshToken } = require('../middlewares/auth')
const validate = require('../middlewares/validations/validate')
const schemas = require('../utils/validations/Joi.validation.user')
const {
  userRegister,
  getAllUsers,
  userLoggedIn,
  userLoggedOut,
  getUser,
  deleteUser,
  refreshedToken,
} = require('../controllers/user.controller')

router.get('/', getAllUsers)
router.get('/:id', getUser)
router.post('/register', validate(schemas.registerValidation), userRegister)
router.post('/login', validate(schemas.loginValidation), userLoggedIn)
router.post('/logout', userLoggedOut)
router.post('/refreshToken', refreshToken, refreshedToken)
router.delete('/', deleteUser)
module.exports = router
