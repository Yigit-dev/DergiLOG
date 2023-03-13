const Post = require('../models/Post')
const checkRole = require('../middlewares/checkRoles')
const APIError = require('../utils/error')
const Response = require('../utils/response')
const moment = require('moment')
const createPost = async (req, res) => {
  try {
    checkRole('admin', 'moderator', 'author')
    const newPost = await Post.create({
      ...req.body,
      company_name: req.body.company_name.replace(/ /g, '-'),
      date: moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),
      company_id: req.user.id,
    })
    if (!newPost) {
      throw new APIError('Failed to Create Post')
    }
    return new Response(newPost).created(res)
  } catch (error) {
    if (error.name === 'MongoServerError' && error.message.includes('E11000')) {
      return new Response('', 'This Slug Already in Use').dubllicateErr(res)
    }
    console.log(error)
    throw new APIError('Failed to Create Post ww')
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
