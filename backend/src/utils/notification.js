const Response = require('../utils/response')
const APIError = require('./error')
const Admin = require('../models/Admin')
const Moderator = require('../models/Moderator')
const Author = require('../models/Author')
class Notification {
  constructor() {}

  async createInviteNotification(model, info) {
    const createdModel = await model.create(info)
    return createdModel
  }
  async createFeedbackNotification(model, info) {
    const createdModel = await model.create(info)
    return createdModel
  }

  async accept(notficitaionId, notificationModel, roleModel, companyModel, reqUserInfo, userModel) {
    try {
      //!birincisorgu hangi notification db de onu buluyor
      const notification = await notificationModel.findById(notficitaionId)

      if (!notification) console.log('NOTİ YOK YOK')
      if (roleModel === '') {
        if (notification.message.toLowerCase().includes('moderator')) roleModel = Moderator
        else if (notification.message.toLowerCase().includes('admin')) roleModel = Admin
        else if (notification.message.toLowerCase().includes('author')) roleModel = Author
      }
      notification.status = 'accepted'
      notification.save()

      //! ikinci sorgı hangi company olduğunu buluyor
      const company = await companyModel.findById(notification.company_id)

      if (!company) console.log('COMPANY YOK')
      company.company_members.push(reqUserInfo._id)
      company.save()
      //! rol modellerine kullanıcıyı kaydediyor
      const roleModelUpdate = await roleModel.findOneAndUpdate(
        { user_id: reqUserInfo._id },
        {
          company_id: company.id,
        }
      )
      if (!roleModelUpdate) {
        await roleModel.create({ user_id: reqUserInfo._id, company_id: company.id })
      }
      //! User şemasında olan kullanıcının rolünü update ediyor
      await userModel.findByIdAndUpdate(reqUserInfo._id, { role: roleModel.name })

      let info = {
        message: `${reqUserInfo.name} adlı kullanıcı isteğinizi kabul etti`,
        company_id: notification.company_id,
        sender_id: reqUserInfo._id,
        user_id: notification.sender_id,
        notificationType: 'feedback',
        status: 'unseen',
      }
      //! dördüncü sorgu yeni noti oluşturuyor
      await this.createFeedbackNotification(notificationModel, info)
    } catch (err) {
      console.log(err)
      throw new APIError('KABUL EDILIRKEN HATA OLUŞTU', 404)
    }
  }
  async reject(notficitaionId, notificationModel, userModel) {
    try {
      const notification = await notificationModel.findById(notficitaionId)
      if (!notification) console.log('NOTİ YOK YOK')
      notification.status = 'rejected'
      notification.save()

      const user = await userModel.findById(notification.user_id)
      if (!user) console.log('USER YOK')

      let info = {
        message: `${user.name} adlı kullanıcı isteğinizi red etti`,
        company_id: notification.company_id,
        sender_id: user.id,
        user_id: notification.sender_id,
        notificationType: 'feedback',
        status: 'unseen',
      }
      await this.createFeedbackNotification(notificationModel, info)
    } catch (err) {
      throw new APIError('Red EDILIRKEN HATA OLUŞTU', 404)
    }
  }
}
module.exports = { Notification }
