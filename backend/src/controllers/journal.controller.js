const Journal = require('../models/Journal')
const APIError = require('../utils/error')
const Response = require('../utils/response')
const checkRole = require('../middlewares/checkRoles')
const Post = require('../models/Post')
const moment = require('moment')
const journalCreate = async (req, res) => {
  checkRole('admin', 'moderator', 'author')
  const count = await Journal.find({}).count()
  let info = {
    ...req.body,
    company_name: req.body.company_name.replace(/ /g, '-'),
    admin_id: req.user._id,
    moderator_id: req.user._id,
    author_id: req.user._id,
    journal_num: count + 1,
  }
  const journal = await Journal.create(info)
  if (!journal) {
    throw new APIError('Failed To Create Journal')
  }
  return new Response(journal).created(res)
}
const updateJournal = async (req, res) => {
  try {
    checkRole('admin', 'moderator', 'author')
    const { id } = req.params
    const journal = await Journal.findOneAndUpdate(id, req.body)
    if (!journal) {
      throw new APIError('Failed to Update Journal')
    }
    return new Response(journal, 'Successfully Updated').success(res)
  } catch (error) {
    throw new APIError('Failed to Update Journal')
  }
}
const deleteJournal = async (req, res) => {
  try {
    checkRole('admin', 'moderator', 'author')
    const { id } = req.params
    const journal = await Journal.findOneAndRemove(id)
    if (!journal) {
      throw new APIError('Failed to Update Journal')
    }
    return new Response('', 'Successfully Deleted').success(res)
  } catch (error) {
    throw new APIError('Failed to Update Journal')
  }
}

const addPostToJournal = async (req, res) => {
  const { id } = req.params
  try {
    const journal = await Journal.findById(id, 'post_list')
    const post = await Post.create({ ...req.body, date: moment(new Date()).format('YYYY-MM-DD HH:mm:ss') })
    journal.post_list.push(post)
    journal.save()
    return new Response(post, 'Post başarıyla eklendi').success(res)
  } catch (err) {
    if (err.name === 'MongoServerError' && err.message.includes('E11000')) {
      return new Response('', 'Slug dublicated').dubllicateErr(res)
    }
    return new Response(err, 'Post eklenirken hata oldu').error400(res)
  }
}
module.exports = { journalCreate, updateJournal, deleteJournal, addPostToJournal }
