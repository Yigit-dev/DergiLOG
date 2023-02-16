const { default: mongoose } = require('mongoose')
const Profile = require('../models/Profile')
const APIError = require('../utils/error')
const Response = require('../utils/response')
const getProfile = async (req, res) => {
  try {
    let { id } = req.params
    id = mongoose.Types.ObjectId(id)
    const user = await Profile.find({ user_id: id }, req.body)
    if (!user) {
      throw new APIError('User Not Found')
    }
    return new Response(user).success(res)
  } catch (error) {
    throw new APIError('User Not Found')
  }
}

const updateUser = async (req, res) => {
  try {
    const { id } = req.params
    const user = await Profile.findOneAndUpdate({ user_id: id }, req.body)
    if (!user) {
      throw new APIError('User Not Found')
    }
    return new Response('', 'Successfully Updated Profile').success(res)
  } catch (error) {
    throw new APIError('Failed to Update Profile')
  }
}

module.exports = { updateUser, getProfile }
