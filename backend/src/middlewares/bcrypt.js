const bcrypt = require('bcrypt')
const hashPassword = async (password, res) => {
  const salt = await bcrypt.genSalt(10)
  const hash = await bcrypt.hash(password, salt)
  return hash
  // parolamız hashlendi
}

const comparePassword = async (password, hash, res, next) => {
  const checkPassword = await bcrypt.compare(password, hash)
  return checkPassword
}
module.exports = { hashPassword, comparePassword }
