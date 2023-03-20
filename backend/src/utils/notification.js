const Response = require('../utils/response')
const APIError = require('./error')
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

  async accept(notficitaionId, notificationModel, userModel, roleModel, companyModel) {
    try {
      const notification = await notificationModel.findById(notficitaionId)
      if (!notification) console.log('NOTİ YOK YOK')
      notification.status = 'accepted'
      notification.save()

      const user = await userModel.findById(notification.user_id)

      const company = await companyModel.findById(notification.company_id)

      if (!company) console.log('COMPANY YOK')
      company.company_members.push(user.id)
      company.save()
      await roleModel.findOneAndUpdate(
        { user_id: user.id },
        {
          company_id: company.id,
        }
      )
      let info = {
        message: `${user.name} adlı kullanıcı isteğinizi kabul etti`,
        company_id: notification.company_id,
        sender_id: user.id,
        user_id: notification.sender_id,
        notificationType: 'feedback',
        status: 'unseen',
      }
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
