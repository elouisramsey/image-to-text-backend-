const express = require('express')
const {upload} = require('../../config/cloudinary')

const mailController = require('../../controller/mail.controller')

const router = express.Router()

router.post('/', upload.single('image'), mailController.mailRequest)
router.post('/verify-mail', mailController.verifyMail)
router.get('/', mailController.allUnsubscribeRequests)
router.get('/:id', mailController.allUnsubscribeRequestsFromUser)

module.exports = router
