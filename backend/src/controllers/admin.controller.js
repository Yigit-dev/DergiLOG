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
const Post = require('../models/Post')
const Journal = require('../models/Journal')
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
    const createdNoti = await notification.createNewNotification(NotificationModel, info)
    const user = await Profile.findOne({ user_id: mongoose.Types.ObjectId(id) })
    user.notifications.push(createdNoti.id)
    user.save()

    return new Response(createdNoti).success(res)
  } catch (error) {
    console.log(error)
    throw new APIError('We cant send notification !!!')
  }
}
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
      User,
      req.user.userInfo.role
    )
    return new Response('', 'Kabul edildi').success(res)
  } catch (error) {
    console.log(error)
    throw new APIError('We cant accept that notification try later')
  }
}
const rejectInvite = async (req, res) => {
  try {
    await notification.reject(req.params.notificationId, NotificationModel, req.user.userInfo)
    return new Response('', 'İstek reddedildi').success(res)
  } catch (error) {
    console.log(error)
    throw new APIError('We cant reject that notification try later')
  }
}

const sendPostStatusUpdate = async (req, res) => {
  try {
    const compnyAdmin = await notification.getModelInformation(Admin, { company_id: req.user.company_info._id })
    const companyMod = await notification.getModelInformation(Moderator, { company_id: req.user.company_info._id })
    const post = await notification.getModelInformation(Post, { _id: req.params.id })
    await companyMod.concat(compnyAdmin).forEach(async member => {
      const info = {
        message: `${req.user.userInfo.name} adlı kullanıcı http://localhost:3000/${post[0].slug}/${post[0]._id} yayınlamak istiyor.`,
        company_id: req.user.company_info._id,
        sender_id: req.user.userInfo._id,
        user_id: member.user_id,
        notificationType: 'invite',
        status: 'unseen',
      }
      newNoti = await notification.createNewNotification(NotificationModel, info)
      console.log(newNoti)
      await notification.updateModel(Profile, { user_id: member.user_id }, { $push: { notifications: newNoti._id } })
    })
    return new Response('').success(res)
  } catch (error) {
    console.log(error)
    throw new APIError('We cant send notification now try laterrr')
  }
}
const acceptPostStatus = async (req, res) => {
  try {
    const { postId } = req.params
    const { notificationId } = req.params
    await notification.updateModel(Post, { _id: mongoose.Types.ObjectId(postId) }, { status: 'Published' })
    await notification.updateModel(NotificationModel, { _id: notificationId }, { status: 'accepted' })
    const postInformation = await notification.getModelInformation(Post, { _id: mongoose.Types.ObjectId(postId) })
    await notification.updateModel(
      Author,
      { user_id: postInformation[0].author_id },
      { $push: { post_list: mongoose.Types.ObjectId(postId) } }
    )
    const allNotifications = await notification.getModelInformation(NotificationModel, {})
    allNotifications.forEach(async noti => {
      if (noti.message.includes(postId) && noti.status !== 'accepted')
        await notification.updateModel(NotificationModel, noti._id, { status: 'accepted' })
    })
    const info = {
      message: `${req.user.userInfo.name} adlı kullanıcı http://localhost:3000/${post[0].slug}/${post[0]._id} yayınlamanıza izin verdi.`,
      company_id: req.user.company_info._id,
      sender_id: req.user.userInfo._id,
      user_id: postInformation[0].author_id,
      notificationType: 'feedback',
      status: 'unseen',
    }
    const newNoti = await notification.createNewNotification(NotificationModel, info)
    await notification.updateModel(
      Profile,
      { user_id: postInformation[0].author_id },
      { $push: { notifications: newNoti._id } }
    )
    return new Response('').success(res)
  } catch (error) {
    console.log(error)
    throw new APIError('We cant accept that notification try later')
  }
}
const rejectPostStatus = async (req, res) => {
  try {
    const { postId } = req.params
    const { notificationId } = req.params
    await notification.updateModel(Post, { _id: mongoose.Types.ObjectId(postId) }, { status: 'revise' })
    await notification.updateModel(NotificationModel, { _id: notificationId }, { status: 'rejected' })
    const postInformation = await notification.getModelInformation(Post, { _id: mongoose.Types.ObjectId(postId) })
    console.log(postInformation[0].author_id)
    await notification.updateModel(
      Author,
      { user_id: postInformation[0].author_id },
      { $push: { reject_list: mongoose.Types.ObjectId(postId) } }
    )
    const allNotifications = await notification.getModelInformation(NotificationModel, {})
    allNotifications.forEach(async noti => {
      if (noti.message.includes(postId))
        await notification.updateModel(NotificationModel, noti._id, { status: 'rejected' })
    })
    const info = {
      message: `${req.user.userInfo.name} adlı kullanıcı http://localhost:3000/${post[0].slug}/${post[0]._id} yayınlamanıza izin vermedi.`,
      company_id: req.user.company_info._id,
      sender_id: req.user.userInfo._id,
      user_id: postInformation[0].author_id,
      notificationType: 'feedback',
      status: 'unseen',
    }
    const newNoti = await notification.createNewNotification(NotificationModel, info)
    await notification.updateModel(
      Profile,
      { user_id: postInformation[0].author_id },
      { $push: { notifications: newNoti._id } }
    )
    return new Response('').success(res)
  } catch (error) {
    throw new APIError('We cant rejected that notification try later')
  }
}

const sendJournalConfirmationUpdate = async (req, res) => {
  try {
    const journal_id = mongoose.Types.ObjectId(req.params.id)
    const journal_info = await notification.getModelInformation(Journal, { _id: journal_id })
    const info = {
      message: `${req.user.userInfo.name} adlı kullanıcı http://localhost:3000/${journal_info[0].journal_name}/${journal_info[0]._id} yayınlamak istiyor.`,
      company_id: req.user.company_info._id,
      sender_id: req.user.userInfo._id,
      user_id: journal_info[0].admin_id,
      notificationType: 'invite',
      status: 'unseen',
    }
    const newNoti = await notification.createNewNotification(NotificationModel, info)
    await notification.updateModel(
      Profile,
      { user_id: journal_info[0].admin_id },
      { $push: { notifications: newNoti._id } }
    )

    return new Response('').success(res)
  } catch (error) {
    throw new APIError('We cant send notification try later!!!')
  }
}
const acceptJournalConfirmation = async (req, res) => {
  try {
    //!notification status update edilecek
    //! journal confirmation true olacak ve moderatore geri bildirim gidecek.
    await notification.updateModel(
      NotificationModel,
      { _id: mongoose.Types.ObjectId(req.params.notificationId) },
      { status: 'accepted' }
    )
    await notification.updateModel(
      Journal,
      { _id: mongoose.Types.ObjectId(req.params.JournalId) },
      { confirmation: true }
    )
    const notiInfo = await notification.getModelInformation(NotificationModel, {
      _id: mongoose.Types.ObjectId(req.params.notificationId),
    })
    const info = {
      message: `${req.user.userInfo.name} adlı kullanıcı  yayınlamanıza izin verdi.`,
      company_id: req.user.company_info._id,
      sender_id: req.user.userInfo._id,
      user_id: notiInfo[0].sender_id,
      notificationType: 'feedback',
      status: 'unseen',
    }
    const newNoti = await notification.createNewNotification(NotificationModel, info)
    await notification.updateModel(
      Profile,
      { user_id: notiInfo[0].sender_id },
      { $push: { notifications: newNoti._id } }
    )
    return new Response('').success(res)
  } catch (error) {
    console.log(error)
    throw new APIError('We cant send notification try later!!!')
  }
}
const rejectJournalConfirmation = async (req, res) => {
  try {
    await notification.updateModel(
      NotificationModel,
      { _id: mongoose.Types.ObjectId(req.params.notificationId) },
      { status: 'rejected' }
    )
    await notification.updateModel(
      Journal,
      { _id: mongoose.Types.ObjectId(req.params.JournalId) },
      { confirmation: false }
    )
    const notiInfo = await notification.getModelInformation(NotificationModel, {
      _id: mongoose.Types.ObjectId(req.params.notificationId),
    })
    const info = {
      message: `${req.user.userInfo.name} adlı kullanıcı yayınlamanıza izin vermedi.`,
      company_id: req.user.company_info._id,
      sender_id: req.user.userInfo._id,
      user_id: notiInfo[0].sender_id,
      notificationType: 'feedback',
      status: 'rejected',
    }
    const newNoti = await notification.createNewNotification(NotificationModel, info)
    await notification.updateModel(
      Profile,
      { user_id: notiInfo[0].sender_id },
      { $push: { notifications: newNoti._id } }
    )
    return new Response('').success(res)
  } catch (error) {
    throw new APIError('We cant send notificaiton try later !!!')
  }
}
module.exports = {
  sendInvite,
  accepInvite,
  rejectInvite,
  sendPostStatusUpdate,
  acceptPostStatus,
  rejectPostStatus,
  sendJournalConfirmationUpdate,
  acceptJournalConfirmation,
  rejectJournalConfirmation,
}
