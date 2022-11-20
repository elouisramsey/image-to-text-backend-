const userModel = require('../models/user/user')

const otpService = require('../service/otp.service')

const Signup = async ({ username, phone }) => {
  try {
    const user = new userModel({
      username,
      phone,
      status: 'PENDING'
    })

    const savedUser = await user.save()
    await otpService.sendOtp(username, phone)
    return savedUser
  } catch (error) {
    console.error(error)
    throw error
  }
}

const getUserByID = async (id) => {
  try {
    const userByID = await userModel.findById(id)

    return userByID
  } catch (error) {
    console.error(error)
    throw error
  }
}

const getAllUsers = async () => {
  try {
    const allUsers = await userModel.find()
    return allUsers
  } catch (error) {
    console.error(error)
    throw error
  }
}

module.exports = {
  Signup,
  getAllUsers,
  getUserByID
}
