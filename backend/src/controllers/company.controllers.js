const Company = require('../models/Company')
const Response = require('../utils/response')
const APIError = require('../utils/error')
const moment = require('moment')
const { default: mongoose } = require('mongoose')
const Journal = require('../models/Journal')
const Post = require('../models/Post')
const Profile = require('../models/Profile')
const creatingCompany = async (req, res) => {
  try {
    let company_name = req.body.company_name.replace(/ /g, '-')
    let info = {
      ...req.body,
      company_name: company_name,
      company_admin: req.user.id,
      company_establishment_date: moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),
    }
    const newCompany = await Company.create(info)
    if (!newCompany) throw new APIError('Failed to Create Company')
    return new Response(newCompany).created(res)
  } catch (error) {
    if (error.name === 'MongoServerError' && error.message.includes('E11000'))
      return new Response('', 'Company name already in use').error500(res)
    throw new APIError('Failed to Create Company')
  }
}
const updatingCompany = async (req, res) => {
  try {
    let { id } = req.params
    id = mongoose.Types.ObjectId(id)
    const company = await Company.findByIdAndUpdate(
      id,
      {
        ...req.body,
        company_name: req.body.company_name.replace(/ /g, '-'),
      },
      { returnOriginal: false }
    )
    if (!company) throw new APIError(`  Company not found`)

    return new Response(company, `company is Updated`).success(res)
  } catch (error) {
    console.log(error)
    throw new APIError(`Failed to update Company`)
  }
}
const deletingCompany = async (req, res) => {
  try {
    let { id } = req.params
    id = mongoose.Types.ObjectId(id)
    const company = await Company.findByIdAndRemove(id)
    if (!company) throw new APIError(`Company not found.`)
    return new Response('', `${company.companyName} is deleted`)
  } catch (error) {
    throw new APIError(`Failed to delete company `)
  }
}
const getCompanyJournals = async (req, res) => {
  try {
    const { companyName } = req.params
    const company = await Company.findOne({ company_name: companyName })
    console.log(company)
    if (!company) return new Response(null, 'Company not found.').error400(res)
    const id = mongoose.Types.ObjectId(req.user._id)
    const member = company.company_members.find(member => member.equals(id))
    console.log('MEMBER:' + member)
    if (!member) return new Response(null, 'You are not part of this company.').error401(res)
    const journal = await Journal.find({ company_id: company.id })
    if (!journal) return new Response(null, 'Journal not found.').error400(res)
    return new Response(journal, 'Success').success(res)
  } catch (err) {
    console.log(err)
    throw new APIError('APIERROR', 400)
  }
}
const getCompanyPosts = async (req, res) => {
  try {
    const { companyName } = req.params
    const company = await Company.findOne({ company_name: companyName })
    console.log(company)
    if (!company) return new Response(null, 'Company not found.').error400(res)
    const id = mongoose.Types.ObjectId(req.user._id)
    const member = company.company_members.find(member => member.equals(id))
    console.log('MEMBER:' + member)
    if (!member) return new Response(null, 'You are not part of this company.').error401(res)
    const post = await Post.find({ company_name: companyName })
    if (!post) return new Response(null, 'Post not found.').error400(res)
    return new Response(post, 'Success').success(res)
  } catch (err) {
    throw new APIError('APIERROR', 400)
  }
}
const getCompanyMembers = async (req, res) => {
  try {
    const { id } = req.params
    const members = await Company.findById(id).select('company_members')
    const profiles = await Profile.find({ user_id: { $in: members.company_members } }).populate('user_id')
    if (!profiles) throw new APIError('Profiller yüklenemedi')
    return new Response(profiles).success(res)
  } catch (error) {
    throw new APIError('APIERROR', 400)
  }
}
const getLastPostsAndJournal = async (req, res) => {
  try {
    let { id } = req.params
    id = mongoose.Types.ObjectId(id)
    const posts = await Post.find({ company_id: id }).sort({ date: -1 }).limit(2)
    const journal = await Journal.find({ company_id: id }).sort({ journal_num: -1 }).limit(1)
    let info = {
      posts: posts,
      journal: journal,
    }
    return new Response(info).success(res)
  } catch (error) {
    throw new APIError('APIERROR', 400)
  }
}
module.exports = {
  creatingCompany,
  updatingCompany,
  deletingCompany,
  getCompanyJournals,
  getCompanyPosts,
  getCompanyMembers,
  getLastPostsAndJournal,
}
