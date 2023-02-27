const mongoose = require('mongoose')
const ThreadSchema = new mongoose.Schema({
  post_id: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Post' },
  date: { type: Date, default: Date.now(), required: true },
  vote: { type: Number, default: 0 },
  comment_lists: { type: Array() },
})

module.exports = new mongoose.model('Thread', ThreadSchema)
