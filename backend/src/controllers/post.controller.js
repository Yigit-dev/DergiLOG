const Post = require('../models/Post')
const checkRole = require('../middlewares/checkRoles')
const APIError = require('../utils/error')
const Response = require('../utils/response')
const moment = require('moment')
const Company = require('../models/Company')
const { default: mongoose } = require('mongoose')

const getPost = async (req, res) => {
  const post = await Post.findOne({ _id: req.params.id })
  if (!post || post.slug != req.params.slug) {
    return new Response(null, 'Böyle bir post bulunamadı').error400(res)
  } else {
    return new Response(post).success(res)
  }
}

const createPost = async (req, res) => {
  try {
    checkRole('admin', 'moderator', 'author')
    const company = await Company.findOne({ company_members: { $elemMatch: { $eq: req.user.id } } })
    if (!company) return new Response('', 'You are not part of any company').error400(res)
    const newPost = await Post.create({
      ...req.body,
      company_name: company.company_name,
      slug: req.body.title.replace(/ /g, '-'),
      date: new Date(moment().format('YYYY-MM-DD HH:mm:ss')),
      company_id: mongoose.Types.ObjectId(company.id),
      author_id: mongoose.Types.ObjectId(req.user.id),
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
  getPost,
}
