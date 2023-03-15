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
    const updatedObject = await model.findById(id)
    await updatedObject.updateOne(info)
    await updatedObject.save()
    return updatedObject
  }
  message(newMessage) {
    return {
      message: newMessage,
    }
  }
}
module.exports = { Notification }
