const express = require('express')

const clientRoute = require('./client')

const { clientValidation } = require('../validators/client')

const Client_Controller = require('../controllers/client')

const router = express.Router()

router.get('/', Client_Controller.getClients)

router.post('/', clientValidation(), Client_Controller.createClient)

router.get('/:id', Client_Controller.getClient)

router.delete('/:id', Client_Controller.deleteClient)

router.patch('/:id', Client_Controller.updateClient)

module.exports = router