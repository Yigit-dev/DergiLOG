const mongoose = require('mongoose')

const profileSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, required: true, unique: true },
  name: { type: String, required: true, trim: true, min: 3, max: 30 },
  surname: { type: String, required: true, trim: true, min: 3, max: 30 },
  photo: { type: String, required: true },
  gender: { type: String, required: true },
  interests: { type: Array() },
  subscription_journal: { type: Array() },
  followed: { type: Array() },
})
module.exports = new mongoose.model('Profile', profileSchema)
