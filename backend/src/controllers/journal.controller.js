const Journal = require('../models/Journal')
const APIError = require('../utils/error')
const Response = require('../utils/response')
const checkRole = require('../middlewares/checkRoles')

const journalCreate = async (req, res) => {
  checkRole('admin', 'moderator', 'author')
  const count = await Journal.find({}).count()
  let info = {
    ...req.body,
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

module.exports = { journalCreate, updateJournal, deleteJournal }
