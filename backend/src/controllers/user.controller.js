const { createToken, checkToken } = require('../middlewares/auth')
const User = require('../models/User')
const { hashPassword, comparePassword } = require('../middlewares/bcrypt')
const upload = require('../middlewares/lib/upload')
const multer = require('multer')

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
  const comparePass = await comparePassword(password, user.password, res)
  if (!comparePass) {
    res.status(201).json({
      message: 'User not Found',
    })
  }
  const token = await createToken(user)
  console.log(token)
  res.cookie('user_token', token, {
    httpOnly: true,
    secure: false,
  })
  res.status(200).json({
    message: 'Successfully logged in',
  })
}

const userLoggedOut = async (req, res) => {
  await res.clearCookie('user_token')

  res.status(200).json({
    message: 'Successfully logged out',
  })
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

const uploadPhoto = async (req, res) => {
  upload(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      console.log('MULTER KAYNAKLI HATA')
    } else if (err) {
      console.log('FOTO YUKLENIRKEN HATA' + err)
    } else {
      res.status(200).json({
        message: 'FOTO YUKLEME BASARILI',
        name: req.savedImages,
      })
    }
  })
}
module.exports = {
  userRegister,
  getAllUsers,
  getUser,
  userLoggedIn,
  userLoggedOut,
  updateUser,
  deleteUser,
  uploadPhoto,
}
