const otpService = require('../../service/otp.service')

const sendOTP = async (req, res) => {
  const { username, phone } = req.body
  const response = await otpService.sendOtp(username, phone)

  res.status(200).send({ data: response })
}

const resendOTP = async (req, res) => {
  const { username, phone } = req.body

  const response = await otpService.reSendOTP(username, phone)
  res.status(200).send({ data: response })
}

const verifyOTP = async (req, res) => {
  const { username, otp } = req.body

  const response = await otpService.verifyOtp(username, otp)
  if (response) {
    res.status(200).send({
      data: response
    })
  } else {
    res.status(400).send({
      data: 'There was an error verifying OTP'
    })
  }
}

module.exports = {
  resendOTP,
  sendOTP,
  verifyOTP
}
