const Company = require('../models/Company')
const Response = require('../utils/response')
const APIError = require('../utils/error')
const moment = require('moment')
const { default: mongoose } = require('mongoose')

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
    const company = await Company.update(
      { $and: [{ _id: id }, { company_name: companyName }] },
      {
        ...req.body,
        company_name: req.body.company_name.replace(/ /g, '-'),
      },
      {
        upsert: false,
      }
    )
    if (!company || company.modifiedCount < 1) return new Response('', `${companyName}Not Found`).error500(res)
    return new Response('', `${companyName} is Updated`).success(res)
  } catch (error) {
    console.log(error)
    throw new APIError(`Failed to update Company`)
  }
}
const deletingCompany = async (req, res) => {
  try {
    let { companyName, id } = req.params
    id = mongoose.Types.ObjectId(id)
    const company = await Company.deleteOne(
      { $and: [{ _id: id }, { company_name: companyName }] },
      {
        upsert: false,
      }
    )
    console.log(company)
    if (!company || company.deletedCount === 0) return new Response(`Failed to delete Company `).error500(res)
    return new Response('', `Succesfully deleted ${companyName}`).success(res)
  } catch (error) {
    throw new APIError(`Failed to delete company `)
  }
}

module.exports = { creatingCompany, updatingCompany, deletingCompany }
