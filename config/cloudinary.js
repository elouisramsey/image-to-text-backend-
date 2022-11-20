const cloudinary = require('cloudinary').v2
const { CloudinaryStorage } = require('multer-storage-cloudinary')
const multer = require('multer')

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET
})

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'Constant Click',
    upload_preset: 'ihe ejigoro',
    format: async (req, file) => {
      'jpg', 'png', 'JPG', 'jpeg'
    }, // supports promises as well
    public_id: (req, file) => {
      console.log({
        fileoncloudinary: file
      });
      console.log(
        new Date().toISOString().replace(/:/g, '-') + file.originalname
      )
      return new Date().toISOString().replace(/:/g, '-') + file.originalname
    }
  }
})

const upload = multer({ storage: storage })

module.exports = { upload, cloudinary }