const mongoose = require('mongoose')
mongoose.connect(process.env.DATABASE_CONNECTION_STRING, () => {
  try {
    console.log('Connected to db Successfully!')
  } catch (error) {
    console.log('something went wrong')
  }
})
