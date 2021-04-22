const express = require('express')

const clientRoute = require('./client')

const Client_Controller = require('../controllers/client')

const router = express.Router()

router.get('/', Client_Controller.getClient)

router.post('/', Client_Controller.createClient)

router.delete('/', Client_Controller.deleteClient)

router.patch('/', Client_Controller.updateClient)

module.exports = router