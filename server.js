const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const path = require('path')
const cors = require('cors')
require('dotenv').config()

const connectDB = require('./db')

const userRoute = require('./routes/signup/user.route')
const otpRoute = require('./routes/signup/otp.route')
const mailRoute = require('./routes/mail/mail.route')

const PORT = 7000

// connect to DB
connectDB()

const server = app.listen(PORT, () =>
  console.log(`Server Connected to port ${PORT}`)
)
app.use(
  cors({
    allowedHeaders: ['Content-Type'],
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false
  })
)
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header(
    'Access-Control-Allow-Headers',
    'x-www-form-urlencoded, Origin, X-Requested-With, Content-Type, Accept, Authorization, *'
  )
  if (req.method === 'OPTIONS') {
    res.header(
      'Access-Control-Allow-Methods',
      'GET, PUT, POST, PATCH, DELETE, OPTIONS'
    )
    res.setHeader('Access-Control-Allow-Credentials', true)
    return res.status(200).json({})
  }
  next()
})
app.use(bodyParser.json())

app.use('/api/v1/user', userRoute)
app.use('/api/v1/otp', otpRoute)
app.use('/api/v1/mail', mailRoute)


// Handling Error
process.on('unhandledRejection', (err) => {
  console.log(`An error occurred: ${err.message}`)
  server.close(() => process.exit(1))
})