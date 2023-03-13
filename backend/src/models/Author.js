const mongoose = require('mongoose')
const authorScehama = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
  company_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Company' },
  task: { type: String },
  post_list: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Post' }],
  reject_list: { type: Array() },
})
module.exports = new mongoose.model('Author', authorScehama)
