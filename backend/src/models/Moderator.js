const mongoose = require('mongoose')
const moderatorScehema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
  followers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  journal_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Journal' },
  admin_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Admin' },
})
module.exports = new mongoose.model('Moderator', moderatorScehema)
