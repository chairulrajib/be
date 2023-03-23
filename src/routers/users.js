const express = require('express')
const route = express.Router()
const {usersController} = require('../controllers')
const jwt = require('jsonwebtoken')
const {checkUser, checkIdNumber} = require('../config/validator')
const {readToken} = require('../config/encript')
const {uploader} = require('../config/uploader')
const {auth} = require('../middleware/auth')

route.get('/', usersController.getData)
route.post('/regis',checkUser,usersController.regis)
route.post('/login',checkUser, usersController.login)
route.post('/keep',readToken , usersController.keepLogin)
route.patch('/changepass',readToken,usersController.changePassword)

route.patch('/verify', readToken,usersController.verifyAccount)
route.patch('/tobetenant', readToken,uploader('/idCard','IDCARD').array('images',1), usersController.tobeTenant)
route.get('/resetpass', usersController.resetpassword)
module.exports = route;