const mongoose = require('mongoose')
const PostSchema = new mongoose.Schema({
  company_id: { type: mongoose.Schema.Types.ObjectId, required: true },
  company_name: { type: String },
  cover: { type: String },
  title: { type: String, required: true, min: 4, max: 30 },
  slug: { type: String, unique: true, min: 4 },
  description: { type: String, required: true },
  date: { type: String, required: true },
  author_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Author' },
  tags: { type: Array(), required: true },
  category: { type: String, required: true },
  likes: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'User' }],
  status: { type: String, enum: ['draft', 'idea', 'revise', 'Pre-Publish', 'Published'], default: 'draft' },
  post_type: { type: String, enum: ['mostViewed', 'mostLiked', 'mostCommented'] },
  content: { type: String, required: true, min: 10 },
})
module.exports = new mongoose.model('Post', PostSchema)
