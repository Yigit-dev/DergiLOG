const mongoose = require('mongoose')
const PostSchema = new mongoose.Schema({
  cover: { type: String, required: true, min: 4, max: 30 },
  title: { type: Stirng, required: true, unique: true, min: 4, max: 30 },
  slug: { type: String, required: true, unique: true, min: 3, max: 40 },
  description: { type: String, required: true },
  date: { type: Date, required: true, default: Date.now() },
  author_id: { type: mongoose.Schema.Types.ObjectId },
  tags: { type: Array(), required: true },
  category: { type: String, required: true },
  likes: { type: Array() },
  status: { type: String, enum: ['draft', 'idea', 'revise', 'Pre-Publish', 'Published'], default: 'draft' },
  post_type: { type: String, enum: ['mostViewed', 'mostLiked', 'mostCommented'] },
  content: { type: String, required: true, min: 10 },
})
module.exports = new mongoose.model('Post', PostSchema)
