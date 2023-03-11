const express = require('express')
const route = express.Router()
const {usersController} = require('../controllers')
const jwt = require('jsonwebtoken')

route.get('/', usersController.getData)
route.post('/regis', usersController.regis)
route.post('/login', usersController.login)
route.get('/keep', (req,res,next)=>{
// pengecekan token
jwt.verify(req.token, process.env.KEY,(err, decript) =>{
    if(err) { 
        return res.data.status(401).send({
            success:false,
            message: 'Authenticate token failed'
        })
    }

    req.decript = decript // menampung data hasil terjemah token
    next()
} ) //prw adalah kunci, dia harus sama dengan yg di encript
}, usersController.keepLogin)

module.exports = route;