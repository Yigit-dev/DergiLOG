require('express-async-errors')
const express = require('express')
require('dotenv').config()
require('./config/databaseConnection.js')
const app = express()
const cors = require('cors')
const port = process.env.PORT || 500
const indexRouter = require('./routes/index')
const cookieParser = require('cookie-parser')
const path = require('path')
const { errorHandlerMiddleware } = require('./middlewares/error.handler')
const mongoSanitize = require('express-mongo-sanitize')
const helmet = require('helmet')
const swaggerUi = require('swagger-ui-express')
const swaggerOutput = require('../swagger-output.json')
const swaggerFile = require('../src/utils/swagger')

app.use(
  cors({
    origin: 'http://localhost:5000',
    credentials: true,
  })
)
app.use(helmet())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(cookieParser())
app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerOutput))
app.use(
  mongoSanitize({
    replaceWith: '_',
  })
)

app.use(indexRouter)
app.use(errorHandlerMiddleware)
//  MULTER
app.use('/uploads', express.static(path.join(__dirname, 'public')))

app.listen(port, () => {
  console.log(`server listening on port : ${port}`)
})
