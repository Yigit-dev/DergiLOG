const mongoose = require('mongoose')

const companySchema = new mongoose.Schema({
  company_name: { type: String, required: true, unique: true },
  company_admin: { type: mongoose.Schema.Types.ObjectId, required: true },
  company_moderators: { type: Array() },
  company_authors: { type: Array() },
  company_establishment_date: { type: String },
})
module.exports = new mongoose.model('Company', companySchema)
