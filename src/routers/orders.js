const express = require('express')
const route = express.Router()
const { ordersController } = require('../controllers')
const {uploader} = require('../config/uploader')

route.patch('/paymentproof',uploader('/paymentProof','PAYMENT').array('images',1), ordersController.paymentProof)

module.exports = route