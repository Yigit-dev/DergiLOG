const Post = require('../models/Post')
const Journal = require('../models/Journal')
const getAllPosts = async (req, res) => {
  const posts = await Post.find({})
  res.status(200).json(posts)
}
const getPost = async (req, res) => {
  const { title } = req.params
  //   title?=title
  console.log(req)
  const post = await Post.findOne({ title: title })
  if (post) res.status(200).json(post)
  else res.status(404).json({ 'message ': 'GetPost function' })
}
const getAllJournals = async (req, res) => {
  const journals = await Journal.find({})
  res.status(200).json({ journals })
}
const getJournal = async (req, res) => {
  const { journal_num } = req.body
  const journal = await Journal.findOne({ journal_num })
  res.status(200).json({ journal })
}
module.exports = { getAllPosts, getPost, getAllJournals, getJournal }
