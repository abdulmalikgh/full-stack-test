const Provider_Controller = require('../controllers/providers')

const express = require('express')

const router = express.Router()

router.post('/', Provider_Controller.postProvider)

router.get('/', Provider_Controller.getProviders)

router.get('/:id', Provider_Controller.getProvider)

router.patch('/:id', Provider_Controller.updateProvider)

router.delete('/:id', Provider_Controller.deleteProvider)

module.exports = router