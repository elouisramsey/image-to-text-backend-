const userService = require('../service/user.service')

const signUp = async (req, res) => {
  const user = await userService.Signup(req.body)

  res.status(200).send({ meta: 200, user })
}

const userByID = async (req, res) => {
  const user = await userService.getUserByID(req.params.id)

  res.status(200).send({ meta: 200, user })
}

const allUsers = async (req, res) => {
    // console.log({
    //   req18: req
    // })
  const users = await userService.getAllUsers()

  res.status(200).send({
    meta: 200,
    users
  })
}



module.exports = {
  signUp,
  allUsers,
  userByID
}
