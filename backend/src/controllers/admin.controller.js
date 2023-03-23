const { Notification } = require('../utils/notification')
const NotificationModel = require('../models/Notification')
const { default: mongoose } = require('mongoose')
const Response = require('../utils/response')
const APIError = require('../utils/error')
const Admin = require('../models/Admin')
const Moderator = require('../models/Moderator')
const Author = require('../models/Author')
const CompanyModel = require('../models/Company')
const Profile = require('../models/Profile')
const User = require('../models/User')
let notification = new Notification()

const sendInvite = async (req, res) => {
  try {
    let { id } = req.params
    id = mongoose.Types.ObjectId(id)
    if (!req.user.company_info) return new Response('You are not part of any Company').error401(res)

    let info = {
      message:
        req.body.message ||
        `${req.user.userInfo.name} adlı kullanıcı ${req.user.company_info.company_name} şirketinde çalışmayı.`,
      company_id: req.user.company_info._id,
      sender_id: req.user.userInfo._id,
      user_id: id,
      notificationType: 'invite',
      status: 'waiting',
    }
    const createdNoti = await notification.createInviteNotification(NotificationModel, info)
    const user = await Profile.findOne({ user_id: mongoose.Types.ObjectId(id) })
    user.notifications.push(createdNoti.id)
    user.save()

    return new Response(createdNoti).success(res)
  } catch (error) {
    console.log(error)
    throw new APIError('We cant send notification !!!')
  }
}
//! sıkıntıısı birden fazla kez aynı bildirim gönderiyor accept ve reject
//! accept bi tık yavaş 3 tane db sordugus ve update var
const accepInvite = async (req, res) => {
  try {
    let model
    if (req.user.userInfo.role.toLowerCase() == 'author') model = Author
    else if (req.user.userInfo.role.toLowerCase() == 'moderator') model = Moderator
    else if (req.user.userInfo.role.toLowerCase() == 'admin') model = Admin
    else if (req.user.userInfo.role.toLowerCase() == 'user') model = ''
    await notification.accept(
      req.params.notificationId,
      NotificationModel,
      model,
      CompanyModel,
      req.user.userInfo,
      User
    )
    return new Response('', 'Kabul edildi').success(res)
  } catch (error) {
    console.log(error)
    throw new APIError('We cant accept that notification try later')
  }
}
const rejectInvite = async (req, res) => {
  try {
    await notification.reject(req.params.notificationId, NotificationModel, User)
    return new Response('', 'İstek reddedildi').success(res)
  } catch (error) {
    console.log(error)
    throw new APIError('We cant reject that notification try later')
  }
}

module.exports = { sendInvite, accepInvite, rejectInvite }
