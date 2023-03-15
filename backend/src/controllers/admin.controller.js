const { Notification } = require('../utils/event-emitter')
const User = require('../models/User')
const { default: mongoose } = require('mongoose')
const deneme = async (req, res) => {
  let notification = new Notification()
  const info = req.body
  const id = mongoose.Types.ObjectId('6411eb3d14f84a122999f005')
  notification.on('start', async () => {
    console.log(await notification.updateObject(User, id, info))
  })
  notification.emit('start')
}

module.exports = { deneme }
