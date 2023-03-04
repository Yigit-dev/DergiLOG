const mongoose = require('mongoose')

const companySchema = new mongoose.Schema({
  company_name: { type: String, required: true, unique: true },
  company_members: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
})
module.exports = new mongoose.model('Company', companySchema)
