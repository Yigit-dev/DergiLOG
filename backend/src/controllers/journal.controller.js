const Journal = require('../models/Journal')
const User = require('../models/User')

const { userCheck } = require('../middlewares/checkAuth')

const journalCreate = async (req, res) => {
  userCheck(req.user.role, res)
  const user = await User.findOne({ name: 'sahra' })
  const count = await Journal.find({}).count()
  let info = {
    admin_id: req.user._id,
    moderator_id: user._id,
    author_id: user._id,
    followers: req.body.followers,
    journal_num: count + 1,
  }
  console.log(info)
  const journal = await Journal.create(info)
  res.status(200).json(journal)
}

const updateJournal = async (req, res) => {
  userCheck(req.user.role, res)
  const { journal_num } = req.body
  const journal = await Journal.findOneAndUpdate({ journal_num }, { post_list: ['updated'] })
  res.status(200).json({
    message: 'Journal updated',
  })
}
const deleteJournal = async (req, res) => {
  userCheck(req.user.role, res)
  const { journal_num } = req.body
  await Journal.findOneAndRemove({ journal_num })
  res.status(200).json({ message: 'Journal deleted' })
}

module.exports = { journalCreate, updateJournal, deleteJournal }
