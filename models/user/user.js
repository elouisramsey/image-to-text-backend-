const Mongoose = require('mongoose')

const userSchema = new Mongoose.Schema(
  {
    phone: {
      type: String,
      required: [true, 'Enter a valid phone number'],
      trim: true
    },
    status: {
      type: String,
      required: true
    },
    username: {
      required: true,
      type: String,
      trim: true
    }
  },
  {
    timestamps: true
  }
)

module.exports = Mongoose.model('User', userSchema)