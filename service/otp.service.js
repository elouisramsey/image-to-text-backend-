const { CourierClient } = require('@trycourier/courier')
const otpGenerator = require('otp-generator')
require('dotenv').config()

const UserModel = require('../models/user/user')
const OtpModel = require('../models/otp/otp')

const courier = CourierClient({
  authorizationToken: process.env.COURIER_TOKEN
})

const sendOtp = async (username, phone) => {
  try {
    const otp = otpGenerator.generate(4, {
      upperCaseAlphabets: false,
      specialChars: false
    })

    await addNewOTP(otp, 15, username, 'PENDING')
    await sendVerificationMessage(
      {
        username,
        otp
      },
      phone
    )

    return {
      success: true,
      message: 'OTP sent successfully'
    }
  } catch (error) {}
}

const reSendOTP = async (username, phone) => {
  try {
    await rejectPendingOTP(username)
    return await sendOtp(username, phone)
  } catch (error) {
    console.error(error)
    throw error
  }
}

const addMinutesToDate = (date, minutes) => {
  return new Date(date.getTime() + minutes * 60000)
}

const verifyOtp = async (username, otp) => {
  try {
    const validOtp = await OtpModel.findOne({
      otp,
      username,
      status: 'PENDING',
      expireIn: {
        $gte: new Date().getTime()
      }
    })

    if (validOtp) {
      await OtpModel.updateOne(
        { _id: validOtp._id },
        {
          $set: {
            status: 'CONFIRMED'
          }
        }
      )
      await UserModel.updateOne(
        { username },
        {
          $set: {
            status: 'VERIFIED'
          }
        }
      )
      return {
        success: true,
        message: 'User Verified'
      }
    }
    throw new Error('Invalid OTP')
  } catch (error) {
    console.error(error)
    throw error
  }
}

const sendVerificationMessage = (params, phone) => {
  return courier.send({
    message: {
      to: {
        data: params,
        phone_number: phone
      },
      content: {
        title: 'Constant Click Verification',
        body: 'Hello, \nYour verification code for Constant Click is {{otp}}.'
      },
      routing: {
        method: 'single',
        channels: ['sms']
      }
    }
  })
}

const addNewOTP = (otp, expirationTime, username, status) => {
  const otpModel = new OtpModel({
    otp,
    expireIn: addMinutesToDate(new Date(), expirationTime),
    username,
    status
  })
  return otpModel.save()
}

const rejectPendingOTP = (username) => {
  return OtpModel.updateMany(
    { username, status: 'PENDING' },
    { $set: { status: 'REJECTED' } }
  )
}

module.exports = {
  verifyOtp,
  reSendOTP,
  sendOtp
}
