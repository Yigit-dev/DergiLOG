const mongoose = require('mongoose')

const NotificationSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
  company_id: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Company' },
  message: { type: String },
  inventor_id: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
})
module.exports = new mongoose.model('Notification', NotificationSchema)
