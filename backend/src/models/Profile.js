const mongoose = require('mongoose')

const profileSchema = new mongoose.Schema({
  user_id: { type: mongoose.SchemaTypes.ObjectId, required: true, unique: true, ref: 'User' },
  photo: { type: String },
  gender: { type: String },
  interests: { type: Array() },
  subscription_journal: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'Journal' }],
  followed: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'User' }],
  followers: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'User' }],
  liked_post: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'Post' }],
})
module.exports = new mongoose.model('Profile', profileSchema)
