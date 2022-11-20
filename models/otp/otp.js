const Mongoose = require('mongoose')

const otpSchema = new Mongoose.Schema({
  otp: {
    type: String,
    required: true,
    trim: true
  },
  username: {
    required: true,
    type: String,
    trim: true
  },
  status: {
    type: String,
    required: true
  },
  expireIn: {
    type: String,
    required: true,
    trim: true
  }
}, {
    timestamps: true
})

module.exports = Mongoose.model('Otp', otpSchema)