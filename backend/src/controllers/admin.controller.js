const { Notification } = require('../utils/event-emitter')
const NotificationModel = require('../models/Notification')
const { default: mongoose } = require('mongoose')
const Response = require('../utils/response')
const APIError = require('../utils/error')
const Admin = require('../models/Admin')
const Moderator = require('../models/Moderator')
const Author = require('../models/Author')
const CompanyModel = require('../models/Company')
const sendAnInvate = async (req, res) => {
  try {
    let { id } = req.params
    id = mongoose.Types.ObjectId(id)
    if (req.user.company_info === null) return new Response('You are not part of any Company').error401(res)
    let info = {
      ...req.body,
      company_id: req.user.company_info._id,
      sender_id: req.user.userInfo._id,
      user_id: id,
    }
    let notification = new Notification()
    notification.on('create', async () => {
      const dublicateCheck = await notification.gettingInformation(NotificationModel, info)
      if (dublicateCheck) return new Response('We have already send notification !!!').error500(res)

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
//! sıkıntıısı birden fazla kez aynı bildirim gönderiyor accept ve reject
//! accept bi tık yavaş 3 tane db sordugus ve update var
const accepInvate = async (req, res) => {
  try {
    var model = req.user.userInfo.role.toLowerCase()
    if (model === 'admin') model = Admin
    else if (model === 'moderator') model = Moderator
    else if (model === 'author') model = Author
    let notification = new Notification()
    notification.on('accept', async () => {
      const notificationInfo = await notification.gettingInformation(NotificationModel, {
        user_id: req.user.userInfo._id,
      })
      const RoleModelUpdate = await notification.updateObject(
        model,
        { user_id: mongoose.Types.ObjectId(req.user.userInfo.id) },
        { company_id: notificationInfo.company_id },
        { upsert: true }
      )
      const companyMembersUpdate = await notification.updateObject(
        CompanyModel,
        { _id: notificationInfo.company_id },
        { $push: { company_members: mongoose.Types.ObjectId(req.user.userInfo._id) } }
      )
      console.log('companyMembersUpdate', companyMembersUpdate)
      console.log('RoleModelUpdate', RoleModelUpdate)
      if (!RoleModelUpdate || !companyMembersUpdate)
        return new Response('We cant accept that notification try later').error500(res)
      // ! gönderen kişiye olumlu mesaj gidecekkk
      let info = {
        message: 'I accepted your notification',
        user_id: notificationInfo.sender_id,
        sender_id: req.user.userInfo.id,
        company_id: notificationInfo.company_id,
      }
      const createNotificationToSender = await notification.saveObject(NotificationModel, info)
      if (!createNotificationToSender) throw new APIError('we cant send notification to sender')
      return new Response('', 'We accepted that notification and send new notification to sender').success(res)
    })
    notification.emit('accept')
  } catch (error) {
    throw new APIError('We cant accept that notification try later')
  }
}

const rejectInvate = async (req, res) => {
  try {
    let notification = new Notification()
    notification.on('reject', async () => {
      const notificationInfo = await notification.gettingInformation(NotificationModel, {
        user_id: req.user.userInfo.id,
      })
      let info = {
        message: 'I rejected your notification',
        user_id: notificationInfo.sender_id,
        sender_id: req.user.userInfo.id,
        company_id: notificationInfo.company_id,
      }
      const createNotificationToSender = await notification.saveObject(NotificationModel, info)
      if (!createNotificationToSender) throw new APIError('we cant send notification to sender')
      return new Response('', 'We rejected that notification and send new notification to sender').success(res)
    })
    notification.emit('reject')
  } catch (error) {
    throw new APIError('We cant reject that notification try later')
  }
}
module.exports = { sendAnInvate, accepInvate, rejectInvate }
