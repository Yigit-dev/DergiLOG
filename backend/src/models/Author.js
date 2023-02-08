const mongoose = require('mongoose')
const authorScehama = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, required: true },
  followers: { type: Array() },
  journal_id: { type: mongoose.Schema.Types.ObjectId },
  admin_id: { type: mongoose.Schema.Types.ObjectId },
  task: { type: String },
  post_list: { type: Array() },
  reject_list: { type: Array() },
})
module.exports = new mongoose.model('Author', authorScehama)
