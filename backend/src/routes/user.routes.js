const router = require('express').Router()
const { checkToken } = require('../middlewares/auth')

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
router.post('/register', userRegister)
router.post('/login', userLoggedIn)
router.put('/', checkToken, updateUser)
router.delete('/', deleteUser)
module.exports = router
