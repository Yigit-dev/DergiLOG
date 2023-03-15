const mongoose = require('mongoose')
const PostSchema = new mongoose.Schema({
  company_id: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Company' },
  cover: { type: String },
  title: { type: String, min: 4, required: true, max: 30 },
  slug: { type: String, unique: true, min: 4 },
  description: { type: String },
  date: { type: String },
  author_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Author' },
  tags: { type: Array() },
  category: { type: String },
  likes: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'User' }],
  status: { type: String, enum: ['draft', 'idea', 'revise', 'Pre-Publish', 'Published'], default: 'draft' },
  post_type: { type: String, enum: ['mostViewed', 'mostLiked', 'mostCommented'] },
  content: { type: String, min: 10 },
})
module.exports = new mongoose.model('Post', PostSchema)
