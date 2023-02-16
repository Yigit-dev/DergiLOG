const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
  role: { type: String, enum: ['user', 'admin', 'moderator', 'author'], default: 'user' },
  username: { type: String, required: true, min: 6, max: 30, trim: true },
  email: { type: String, required: true, unique: true, trim: true, min: 3, max: 30 },
  password: { type: String, required: true, trim: true, min: 6, max: 120 },
})
module.exports = new mongoose.model('User', UserSchema)
