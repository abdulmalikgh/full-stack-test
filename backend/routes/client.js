const express = require('express')

const clientRoute = require('./client')

const Client_Controller = require('../controllers/client')

const router = express.Router()

router.get('/', Client_Controller.getClient)

router.post('/', Client_Controller.createClient)

router.delete('/:id', Client_Controller.deleteClient)

router.patch('/:id', Client_Controller.updateClient)

module.exports = router