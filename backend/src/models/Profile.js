const mongoose = require('mongoose')

const profileSchema = new mongoose.Schema({
  user_id: { type: mongoose.SchemaTypes.ObjectId, required: true, unique: true, ref: 'User' },
  name: { type: String, required: true, trim: true, min: 3, max: 30 },
  surname: { type: String, trim: true, min: 3, max: 30 },
  photo: { type: String },
  gender: { type: String },
  interests: { type: Array() },
  subscription_journal: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'Journal' }],
  followed: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'User' }],
})
module.exports = new mongoose.model('Profile', profileSchema)
