const EventEmitter = require('events')

class Notification extends EventEmitter {
  constructor() {
    super()
    console.log('eventemitter worked')
  }
  async saveObject(model, info) {
    const savedObject = await model.create(info)
    return savedObject
  }
  async updateObject(model, id, info) {
    const updatedObject = await model.findByIdAndUpdate(id, info, { returnOriginal: false })
    return updatedObject
  }
  async gettingInformation(model, id) {
    const information = await model.findById({ user_id: id })
    return information
  }
  message(newMessage) {
    return {
      message: newMessage,
    }
  }
}
module.exports = { Notification }
