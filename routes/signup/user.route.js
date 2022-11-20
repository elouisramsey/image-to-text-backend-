const express = require('express')

const userController = require('../../controller/user.controller')

const router = express.Router()

router.post('/', userController.signUp)
router.get('/single/:id', userController.userByID)
router.get('/', userController.allUsers)

module.exports = router