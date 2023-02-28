const router = require('express').Router()
const { checkToken, refreshToken } = require('../middlewares/auth')
const checkRoles = require('../middlewares/checkRoles')
const validate = require('../middlewares/validations/validate')
const schemas = require('../utils/validations/Joi.validation.user')
const {
  userRegister,
  getAllUsers,
  userLoggedIn,
  userLoggedOut,
  getUser,
  updateUser,
  deleteUser,
  refreshedToken,
} = require('../controllers/user.controller')

router.get('/', getAllUsers)
router.get('/:id', getUser)
router.post('/register', validate(schemas.registerValidation), userRegister)
router.post('/login', validate(schemas.loginValidation), userLoggedIn)
router.post('/logout', userLoggedOut)
router.put('/', checkToken, checkRoles('admin', 'user'), validate(schemas.updateValidation), updateUser)
router.post('/refreshToken', refreshToken, refreshedToken)
router.delete('/', validate(schemas.deleteValidation), deleteUser)
module.exports = router
