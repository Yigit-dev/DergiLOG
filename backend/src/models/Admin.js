const mongoose = require('mongoose')

const adminSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, required: true },
  journal_id: { type: mongoose.Schema.Types.ObjectId },
})
module.exports = new mongoose.model('Admin', adminSchema)
