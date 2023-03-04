const mongoose = require('mongoose')
const JournalSchema = new mongoose.Schema({
  company_id: { type: mongoose.Schema.Types.ObjectId, required: true },
  company_name: { type: String },
  admin_id: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Admin' },
  moderator_id: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Moderator' },
  author_id: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Author' },
  post_list: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Post' }],
  journal_num: { type: Number, default: 1 },
  followers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  subscribers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  confirmation: { type: Boolean, default: false },
})
module.exports = new mongoose.model('Journal', JournalSchema)
