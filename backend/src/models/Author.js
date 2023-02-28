const mongoose = require('mongoose')
const authorScehama = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
  followers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  journal_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Journal' },
  admin_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Admin' },
  task: { type: String },
  post_list: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Post' }],
  reject_list: { type: Array() },
})
module.exports = new mongoose.model('Author', authorScehama)
