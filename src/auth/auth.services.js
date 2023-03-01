const jwt = require('jsonwebtoken')
const checkUsersCredentials = require('./auth.controllers')
const response = require('../utils/responses.handler')
const { api } = require('../../config')

const login = (req, res) => {
    const { email, password } = req.body
    if (email && password) {
        checkUsersCredentials(email, password)
            .then(data => {
                if (data) {
                    const token = jwt.sign({
                        id: data.id,
                        email: data.email
                    }, api.jwtSecret, {
                        expiresIn: '30 minutes'
                    })
                    response.success({
                        res,
                        status: 200,
                        message: 'correct credentials',
                        data: token
                    })
                } else {
                    response.error({
                        res,
                        status: 401,
                        message: 'Invalid Credentials'
                    })
                }
            })
            .catch(err => response.error({
                res,
                status: 401,
                data: err
            }))
    } else {
        response.error({
            res,
            status: 401,
            message: 'Missing data',
            fields: {
                "email": "example@example.com",
                "password": "******"
            }
        })
    }
}

module.exports = {login}