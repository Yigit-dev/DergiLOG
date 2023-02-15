const Journal = require('../models/Journal')

const checkRole = require('../middlewares/checkRoles')

const journalCreate = async (req, res) => {
  checkRole('admin', 'moderator', 'author')
  const count = await Journal.find({}).count()
  let info = {
    admin_id: req.user._id,
    moderator_id: req.user._id,
    author_id: req.user._id,
    followers: req.body.followers,
    journal_num: count + 1,
  }
  console.log(info)
  const journal = await Journal.create(info)
  res.status(200).json(journal)
}

const updateJournal = async (req, res) => {
  checkRole('admin', 'moderator', 'author')
  const { journal_num } = req.body
  const journal = await Journal.findOneAndUpdate({ journal_num }, { post_list: ['updated'] })
  res.status(200).json({
    message: 'Journal updated',
  })
}
const deleteJournal = async (req, res) => {
  checkRole('admin', 'moderator', 'author')
  const { journal_num } = req.body
  await Journal.findOneAndRemove({ journal_num })
  res.status(200).json({ message: 'Journal deleted' })
}

module.exports = { journalCreate, updateJournal, deleteJournal }
