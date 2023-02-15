const Post = require('../models/Post')
const Journal = require('../models/Journal')
const APIError = require('../utils/error')
const Response = require('../utils/response')

const getAllPosts = async (req, res) => {
  const posts = await Post.find({})
  if (!posts || posts.length === 0) {
    throw new APIError('Posts Not Found')
  }
  return new Response(posts).success(res)
}
const getPost = async (req, res) => {
  try {
    const { id } = req.params
    const post = await Post.findById(id)
    if (!post) {
      throw new APIError('Post Not Found')
    }
    return new Response(post).success(res)
  } catch (error) {
    throw new APIError('Post Not Found')
  }
}
const getAllJournals = async (req, res) => {
  const journals = await Journal.find({})
  if (!journals || journals.length === 0) {
    throw new APIError('Journals Not Found')
  }
  return new Response(journals).success(res)
}
const getJournal = async (req, res) => {
  try {
    const { id } = req.params
    const journal = await Journal.findById(id)
    if (!journal) {
      throw new APIError('Journal Not Found')
    }
    return new Response(journal).success(res)
  } catch (error) {
    throw new APIError('Journal Not Found')
  }
}
module.exports = { getAllPosts, getPost, getAllJournals, getJournal }
