const mongoose = require('mongoose')

// Connect DB
const connectDB = async () => {
  await mongoose
    .connect(process.env.ATLAS_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    .then(() => console.log('mongoDB is connected'))
    .catch((err) => console.log(err))
}

module.exports = connectDB
