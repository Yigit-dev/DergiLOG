const { Notification } = require('../utils/event-emitter')
const User = require('../models/User')
const NotificationModel = require('../models/Notification')
const { default: mongoose } = require('mongoose')
const Response = require('../utils/response')
const APIError = require('../utils/error')

const sendAnInvate = async (req, res) => {
  try {
    let { id } = req.params
    id = mongoose.Types.ObjectId(id)
    let info = {
      ...req.body,
      company_id: req.user.company_info._id,
      inventor_id: req.user.userInfo._id,
      user_id: id,
    }
    let notification = new Notification()
    notification.on('create', async () => {
      const respone = await notification.saveObject(NotificationModel, info)
      if (!respone) throw new APIError('we cant send notification')
      return new Response(respone).success(res)
    })
    notification.emit('create')
  } catch (error) {
    console.log(error)
    throw new APIError('We cant send notification !!!')
  }
}
module.exports = { sendAnInvate }
