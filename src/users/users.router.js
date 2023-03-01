const router = require('express').Router()
const passport = require('passport')
const userServices = require('./users.services')
require('../middlewares/auth.middleware')(passport)

router.route('/')
    .get(userServices.getAllUsers)
    .post(userServices.postNewUser)

router.route('/:id')
    .get(userServices.getUserById)
    .patch(passport.authenticate('jwt', { session: false }), userServices.patchUser)
    .delete(passport.authenticate('jwt', { session: false }), userServices.deleteUser)


module.exports = router  