const Company = require('../models/Company')
const Response = require('../utils/response')
const APIError = require('../utils/error')
const moment = require('moment')
const { default: mongoose } = require('mongoose')
const Journal = require('../models/Journal')
const Post = require('../models/Post')

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
    let { companyName, id } = req.params
    id = mongoose.Types.ObjectId(id)
    const company = await Company.findById(id)
    if (company.company_name === companyName) {
      await company.updateOne(req.body)
      await company.save()
      return new Response('', `${companyName} is Updated`).success(res)
    }
    throw new APIError(`  Company not found`)
  } catch (error) {
    console.log(error)
    throw new APIError(`Failed to update Company`)
  }
}
const deletingCompany = async (req, res) => {
  try {
    let { companyName, id } = req.params
    id = mongoose.Types.ObjectId(id)
    const company = await Company.findById(id)
    if (company.company_name === companyName) {
      await company.deleteOne()
      return new Response('', `${companyName} is Deleted`).success(res)
    }
    throw new APIError(`Company not found.`)
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
    const journal = await Journal.find({ company_name: companyName })
    if (!journal) return new Response(null, 'Journal not found.').error400(res)
    return new Response(journal, 'Success').success(res)
  } catch (err) {
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

module.exports = { creatingCompany, updatingCompany, deletingCompany, getCompanyJournals, getCompanyPosts }
