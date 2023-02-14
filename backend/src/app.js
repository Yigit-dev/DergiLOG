require('express-async-errors')
const express = require('express')
require('dotenv').config()
require('./config/databaseConnection.js')
const app = express()
const { swaggerUi, specs } = require('./utils/swagger')
const cors = require('cors')
const port = process.env.PORT || 500
const indexRouter = require('./routes/index')
const cookieParser = require('cookie-parser')
const path = require('path')
const { errorHandlerMiddleware } = require('./middlewares/error.handler')
app.use(cors())

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs))
app.use(cookieParser())
app.use(indexRouter)

app.use(errorHandlerMiddleware)
//  MULTER
app.use('/uploads', express.static(path.join(__dirname, 'public')))

app.listen(port, () => {
  console.log(`server listening on port : ${port}`)
})
