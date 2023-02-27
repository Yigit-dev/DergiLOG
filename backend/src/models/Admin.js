const mongoose = require('mongoose')

const adminSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
  journal_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Journal' },
})
module.exports = new mongoose.model('Admin', adminSchema)
