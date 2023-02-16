const Post = require('../models/Post')
const checkRole = require('../middlewares/checkRoles')
const APIError = require('../utils/error')
const Response = require('../utils/response')

const createPost = async (req, res) => {
  try {
    checkRole('admin', 'moderator', 'author')
    userCheck(req.user.role, res)
    const newPost = await Post.create(req.body)
    if (!newPost) {
      throw new APIError('Failed to Create Post')
    }
    return new Response(newPost).created(res)
  } catch (error) {
    throw new APIError('Failed to Create Post')
  }
}

const updatePost = async (req, res) => {
  try {
    checkRole('admin', 'moderator', 'author')
    const { id } = req.params
    console.log(id)
    const post = await Post.findByIdAndUpdate(id, req.body)
    console.log(post)
    if (!post) {
      throw new APIError('Failed to update post')
    }
    return new Response('', 'Successfully Updated').success(res)
  } catch (error) {
    throw new APIError('Failed to update post')
  }
}
const deletePost = async (req, res) => {
  try {
    checkRole('admin', 'moderator', 'author')
    const { id } = req.params
    const post = await Post.findByIdAndRemove(id)
    if (!post) {
      throw new APIError('Failed to delete post')
    }
    return new Response('', 'Successfully Deleted').success(res)
  } catch (error) {
    throw new APIError('Failed to delete post')
  }
}

module.exports = {
  createPost,
  updatePost,
  deletePost,
}
