const Mongoose = require('mongoose')

const mailSchema = new Mongoose.Schema({
  image: {
    type: String,
    required: true
  },
  imageText: {
    type: String,
    required: [true, 'Image text is required']
  },
  id: {
    type: String,
    required: [true, 'Enter your ID'],
    trim: true
  },
  status: {
    type: String,
    required: true
  }
})

module.exports = Mongoose.model('Mail', mailSchema)