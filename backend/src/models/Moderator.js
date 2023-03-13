const mongoose = require('mongoose')
const moderatorScehema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
  company_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Company' },
})
module.exports = new mongoose.model('Moderator', moderatorScehema)
