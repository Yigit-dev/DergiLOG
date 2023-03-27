const mongoose = require('mongoose')

const NotificationSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
  company_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Company' },
  message: { type: String },
  sender_id: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
  notificationType: { type: String, enum: ['invite', 'liked', 'shared', 'feedback'] },
  status: { type: String, enum: ['seen', 'unseen', 'accepted', 'rejected', 'waiting'] },
})
module.exports = new mongoose.model('Notification', NotificationSchema)
