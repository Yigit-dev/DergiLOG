const { createToken, checkToken } = require('../middlewares/auth')
const User = require('../models/User')
const Profile = require('../models/Profile')
const { hashPassword, comparePassword } = require('../middlewares/bcrypt')
const Response = require('../utils/response')
const APIError = require('../utils/error')

const getAllUsers = async (req, res) => {
  const users = await User.find({})
  if (!users || users.length == 0) {
    throw new APIError('Users Not Found')
  }
  return new Response(users).success(res)
}

const getUser = async (req, res) => {
  try {
    const { id } = req.params
    const user = await User.findById(id)
    if (!user) {
      throw new APIError('User Not Found')
    }
    return new Response(user).success(res)
  } catch (error) {
    throw new APIError('User Not Found')
  }
}
const userRegister = async (req, res) => {
  try {
    const { password } = req.body
    const hash = await hashPassword(password, res)
    const newUser = await User.create({
      ...req.body,
      password: hash,
    })
    const userProfile = await Profile.create({
      ...req.body,
      user_id: newUser._id,
    })
    // !! multer ile fotografı buraya ekleyecegiz
    return new Response(newUser, userProfile).created(res)
  } catch (error) {
    if (error.name === 'MongoServerError' && error.message.includes('E11000')) {
      return res.status(400).json({
        success: false,
        message: ' must be unique',
      })
    }
    throw new APIError('Failed to Create User')
  }
}
const userLoggedIn = async (req, res) => {
  const { login, password } = req.body
  const user = await User.findOne({ $or: [{ email: login }, { username: login }] })
  console.log(user)
  if (!user) {
    throw new APIError('Email , Password or Username  Incorrect', 210)
  }
  const comparePass = await comparePassword(password, user.password, res)

  if (!comparePass) {
    throw new APIError('Email , Password or Username  Incorrect', 210)
  }

  const { refreshToken, accessToken } = await createToken(user)
  console.log('refresh FROM LOGİN:' + refreshToken)
  console.log('access FROM LOGİN:' + accessToken)
  res
    .cookie('refresh_token', refreshToken, {
      httpOnly: true,
      secure: false,
      maxAge: 1000 * 60 * 60 * 24,
      overwrite: true,
    })
    .cookie('access_token', accessToken, { httpOnly: true, secure: false, maxAge: 1000 * 60 * 15, overwrite: true })
  return new Response(user, 'Successfully logged in').success(res)
}

const userLoggedOut = async (req, res) => {
  await res.clearCookie('refresh_token').clearCookie('access_token')
  return new Response('', 'Successfully logged out').success(res)
}

const updateUser = async (req, res) => {
  //! Updated only username email password

  const { email, password, username } = req.body
  const hash = await hashPassword(password, res)
  const user = await User.findOneAndUpdate(
    { email },
    {
      ...req.body,
      password: hash,
    }
  )

  if (!user) {
    throw new APIError('Email , Password or Username  Incorrect', 210)
  }

  if (!user._id.equals(req.user._id)) throw new APIError('Invalid Token', 210)

  const comparePass = await comparePassword(password, user.password, res)

  if ((username !== undefined && user.username !== username) || !comparePass) {
    throw new APIError('Email , Password or Username  Incorrect', 210)
  }
  return new Response('', 'Successsfully Updated').success(res)
}

const deleteUser = async (req, res) => {
  const { email, password, username } = req.body
  const user = await User.findOneAndRemove({ email })
  if (!user) {
    throw new APIError('Email Password or Username Incorrect', 210)
  }
  const comparePass = await comparePassword(password, user.password, res)
  const profileuser = await Profile.findOneAndRemove(user.user_id)
  if ((username !== undefined && user.username !== username) || !comparePass || !profileuser) {
    throw new APIError('Email Password or Username Incorrect', 210)
  }
  return new Response('', 'Successfully Deleted').success(res)
}

const refreshedToken = async (req, res) => {
  return new Response(req.accessToken, 'New access token created').success(res)
}

module.exports = {
  userRegister,
  getAllUsers,
  getUser,
  userLoggedIn,
  userLoggedOut,
  updateUser,
  deleteUser,
  refreshedToken,
}
