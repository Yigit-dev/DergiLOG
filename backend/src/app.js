const express = require('express')
require('dotenv').config()
require('./config/databaseConnection.js')
const app = express()
const { swaggerUi, specs } = require('./utils/swagger')
const cors = require('cors')
const port = process.env.PORT || 500
const indexRouter = require('./routes/index')
const cookieParser = require('cookie-parser')

app.use(cors())

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs))
app.use(cookieParser())
app.use(indexRouter)

app.listen(port, () => {
  console.log(`server listening on port : ${port}`)
})
