const Post = require('../models/Post')
const checkRole = require('../middlewares/checkRoles')

const createPost = async (req, res) => {
  checkRole('admin', 'moderator', 'author')
  const newPost = await Post.create(req.body)
  res.status(200).json(newPost)
}

const updatePost = async (req, res) => {
  checkRole('admin', 'moderator', 'author')
  const { title } = req.body
  const post = await Post.findOneAndUpdate({ title }, { category: 'updated' })
  res.send('updated')
}
const deletePost = async (req, res) => {
  checkRole('admin', 'moderator', 'author')
  const { title } = req.body
  const post = await Post.findOneAndRemove({ title })
  res.status(200).json({
    message: 'deleted',
  })
}

module.exports = {
  createPost,
  updatePost,
  deletePost,
}
