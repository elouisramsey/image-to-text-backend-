const express = require('express')

const otpController = require('../../controller/otp/otp.controller')

const router = express.Router()

router.post('/', otpController.sendOTP)
router.post('/resend', otpController.resendOTP)
router.post('/verify', otpController.verifyOTP)

module.exports = router