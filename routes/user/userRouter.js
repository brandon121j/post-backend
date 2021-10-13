const express = require('express')
const router = express.Router();

const { 
    register,
    login 
} = require('./controller/userController')

const {
    jwtMiddleware
} = require('./lib/index')

router.post('/create-user', register);

router.post('/login', login)

module.exports = router