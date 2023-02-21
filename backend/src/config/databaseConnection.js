const mongoose = require('mongoose')
try {
  mongoose.connect(process.env.DATABASE_CONNECTION_STRING, () => {
    console.log('Connected to db Successfully!')
  })
} catch (error) {
  console.log('An error occured trying to connect database')
}
