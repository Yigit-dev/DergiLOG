const Journal = require('../models/Journal')
const APIError = require('../utils/error')
const Response = require('../utils/response')
const checkRole = require('../middlewares/checkRoles')
const Company = require('../models/Company')
const Post = require('../models/Post')
const moment = require('moment')
const { default: mongoose } = require('mongoose')

const journalCreate = async (req, res) => {
  checkRole('admin', 'moderator', 'author')
  const company = await Company.findOne({ company_members: { $elemMatch: { $eq: req.user.id } } })
  if (!company) return new Response('', 'You are not part of any company').error400(res)

  const isJournalExist = await Journal.find({ company_id: company.id, journal_name: req.body.journal_name })
  let num
  console.log(isJournalExist)
  if (!isJournalExist || isJournalExist.length === 0) {
    num = 1
  } else {
    num = isJournalExist[isJournalExist.length - 1].journal_num + 1
  }

  let info = {
    ...req.body,
    company_id: mongoose.Types.ObjectId(company.id),
    admin_id: req.user._id,
    journal_num: num,
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
    const journal = await Journal.findOneAndUpdate(id, req.body, { returnOriginal: false })
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
      throw new APIError('Failed to Delete Journal')
    }
    return new Response('', 'Successfully Deleted').success(res)
  } catch (error) {
    throw new APIError('Failed to Delete Journal')
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
