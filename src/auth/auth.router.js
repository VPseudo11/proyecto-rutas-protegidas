const router = require('express').Router()
const authServices = require('./auth.services')
const { postNewUser } = require('../users/users.services')

router.post('/register', postNewUser)
router.post('/login', authServices.login)

module.exports = router