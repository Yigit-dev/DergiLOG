const Response = require('../utils/response')
const APIError = require('./error')
const Admin = require('../models/Admin')
const Moderator = require('../models/Moderator')
const Author = require('../models/Author')
class Notification {
  constructor() {}

  async createNewNotification(model, info) {
    const createdModel = await model.create(info)
    return createdModel
  }

  async accept(notficitaionId, notificationModel, roleModel, companyModel, reqUserInfo, userModel, role) {
    try {
      //!birincisorgu hangi notification db de onu buluyor
      const notification = await notificationModel.findById(notficitaionId)

      if (!notification) console.log('NOTİ YOK YOK')
      if (roleModel === '') {
        if (notification.message.toLowerCase().includes('moderator')) (roleModel = Moderator), (role = 'moderator')
        else if (notification.message.toLowerCase().includes('admin')) (roleModel = Admin), (role = 'admin')
        else if (notification.message.toLowerCase().includes('author')) (roleModel = Author), (role = 'author')
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
        await userModel.findByIdAndUpdate(reqUserInfo._id, { role: role })
      }

      let info = {
        message: `${reqUserInfo.name} adlı kullanıcı isteğinizi kabul etti`,
        company_id: notification.company_id,
        sender_id: reqUserInfo._id,
        user_id: notification.sender_id,
        notificationType: 'feedback',
        status: 'unseen',
      }
      //! dördüncü sorgu yeni noti oluşturuyor
      await this.createNewNotification(notificationModel, info)
    } catch (err) {
      console.log(err)
      throw new APIError('KABUL EDILIRKEN HATA OLUŞTU', 404)
    }
  }
  async reject(notficitaionId, notificationModel, reqUserInfo) {
    try {
      const notification = await notificationModel.findById(notficitaionId)
      if (!notification) console.log('NOTİ YOK YOK')
      notification.status = 'rejected'
      notification.save()

      let info = {
        message: `${reqUserInfo.name} adlı kullanıcı isteğinizi red etti`,
        company_id: notification.company_id,
        sender_id: reqUserInfo._id,
        user_id: notification.sender_id,
        notificationType: 'feedback',
        status: 'unseen',
      }
      await this.createNewNotification(notificationModel, info)
    } catch (err) {
      throw new APIError('Red EDILIRKEN HATA OLUŞTU', 404)
    }
  }
}
module.exports = { Notification }
