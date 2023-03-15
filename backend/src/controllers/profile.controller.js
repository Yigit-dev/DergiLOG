const { default: mongoose } = require('mongoose')
const Profile = require('../models/Profile')
const User = require('../models/User')
const APIError = require('../utils/error')
const Response = require('../utils/response')
const multer = require('multer')
const upload = require('../middlewares/lib/upload')
const getProfile = async (req, res) => {
  try {
    let { id, username } = req.params
    id = mongoose.Types.ObjectId(id)
    const user = await Profile.findOne({ user_id: id }).populate('user_id')
    if (!user || user.username !== username) {
      throw new APIError('User Not Found')
    }
    return new Response(user).success(res)
  } catch (error) {
    throw new APIError('User Not Found')
  }
}

const updateUser = async (req, res) => {
  try {
    let { id, username } = req.params
    let objectId = mongoose.Types.ObjectId(id)
    const user = await Profile.findOne({ user_id: objectId }).populate('user_id')
    const userdenormalize = await User.findById(objectId)
    console.log(user)
    if (!user || user.user_id.username != username || !userdenormalize) {
      throw new APIError('User Not Found')
    }
    await userdenormalize.updateOne(req.body, { new: true })
    await user.updateOne(req.body, { new: true })
    await user.save()
    await userdenormalize.save()
    return new Response('', 'Successfully Updated Profile').success(res)
  } catch (error) {
    console.log(error)
    throw new APIError('Failed to Update Profile')
  }
}
const uploadPhoto = async (req, res, next) => {
  upload(req, res, function (err) {
    if (req.files) {
      if (err instanceof multer.MulterError) {
        //! Multer status code
        return new Response('', 'Multer Error').error400(res)
      } else if (err) {
        return new Response('', err.message).error400(res)
      } else {
        if (req.files[0].filename) req.body.photo = req.files[0].filename
      }
    }
    next()
  })
}

module.exports = { updateUser, getProfile, uploadPhoto }
