const mongoose = require('mongoose')
const moderatorScehema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, required: true },
  followers: { type: Array() },
  journal_id: { type: mongoose.Schema.Types.ObjectId },
  admin_id: { type: mongoose.Schema.Types.ObjectId },
})
module.exports = new mongoose.model('Moderator', moderatorScehema)
