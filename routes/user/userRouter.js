const express = require('express')
const router = express.Router();

const { 
    register,
    login, 
    getUserInfo
} = require('./controller/userController')

const {
    jwtMiddleware, validateCreateData, validateLoginData, checkIsEmpty, checkIsUndefined
} = require('./lib/index')

router.post('/create-user', checkIsUndefined, checkIsEmpty, validateCreateData, register);

router.post('/login', checkIsUndefined, checkIsEmpty, validateLoginData, login);

router.get('/', jwtMiddleware, getUserInfo);

module.exports = router