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
    const updatedObject = await model.findOneAndUpdate(id, info, { returnOriginal: false })
    return updatedObject
  }
  async gettingInformation(model, info) {
    const information = await model.findOne(info)
    return information
  }
  message(newMessage) {
    return {
      message: newMessage,
    }
  }
}
module.exports = { Notification }
