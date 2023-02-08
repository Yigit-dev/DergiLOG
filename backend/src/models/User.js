const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
  role: { type: String, enum: ['user', 'admin', 'moderator', 'author'], default: 'user' }, // int deger de tutulabilir videodaki adam gibi
  name: { type: String, required: true, trim: true, min: 3, max: 30 },
  surname: { type: String, required: true, trim: true, min: 3, max: 30 },
  email: { type: String, required: true, unique: true, trim: true, min: 3, max: 30 },
  photo: { type: String, required: true },
  password: { type: String, required: true, trim: true, min: 6, max: 120 },
  gender: { type: String, required: true },
  interests: { type: Array() },
  subscription_journal: { type: Array() },
  followed: { type: Array() },
})
module.exports = new mongoose.model('User', UserSchema)
