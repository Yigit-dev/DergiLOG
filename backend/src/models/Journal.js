const mongoose = require('mongoose')
const JournalSchema = new mongoose.Schema({
  admin_id: { type: mongoose.Schema.Types.ObjectId, required: true },
  moderator_id: { type: mongoose.Schema.Types.ObjectId, required: true },
  author_id: { type: mongoose.Schema.Types.ObjectId, required: true },
  post_list: { type: Array() },
  journal_num: { type: Number, default: 1 },
  followers: { type: Array() },
  subscribers: { type: Array() },
  confirmation: { type: Boolean, default: false },
})
module.exports = new mongoose.model('Journal', JournalSchema)
