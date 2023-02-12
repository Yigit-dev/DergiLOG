const { createToken, checkToken } = require('../middlewares/auth')
const User = require('../models/User')
const { hashPassword, comparePassword } = require('../middlewares/bcrypt')

const getAllUsers = async (req, res) => {
  const users = await User.find({})
  res.status(200).json(users)
}
const getUser = async (req, res) => {
  console.log(req.params)
  const name = req.params.name
  const user = await User.findOne({ name })
  res.status(200).json(user)
}
const userRegister = async (req, res) => {
  try {
    const { password } = req.body
    const hash = await hashPassword(password, res)
    const newUser = await User.create({
      username: req.body.username,
      name: req.body.name,
      surname: req.body.surname,
      email: req.body.email,
      password: hash,
      photo: req.body.photo,
      password: hash,
      gender: req.body.gender,
    })
    res.status(200).json(newUser)
  } catch (error) {
    res.send('HATALI')
  }
}
const userLoggedIn = async (req, res) => {
  const { email, password } = req.body
  const user = await User.findOne({ email })
  if (!user) {
    res.status(201).json({
      message: 'User cant find',
    })
  }
  const comparePass = await comparePassword(req.body.password, user.password, res)
  if (!comparePass) {
    res.status(201).json({
      message: 'User not Found',
    })
  }
  createToken(user, res)
}

const updateUser = async (req, res) => {
  const { email, password } = req.body
  const user = await User.findOneAndUpdate(
    { email },
    {
      email: 'new' + email,
    }
  )
  if (!user) {
    res.status(201).json({
      message: 'User cant find',
    })
  }

  const comparePass = await comparePassword(password, user.password, res)
  if (!comparePass) {
    res.status(201).json({
      message: 'User cant find',
    })
  }
  res.status(200).json(user)
}
const deleteUser = async (req, res) => {
  const { email, password } = req.body
  const user = await User.findOneAndRemove({ email })
  res.send('user deleted')
}
module.exports = { userRegister, getAllUsers, getUser, userLoggedIn, updateUser, deleteUser }
