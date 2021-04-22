const Provider_Controller = require('../controllers/providers')

const express = require('express')

const router = express.Router()

router.post('/', Provider_Controller.postProvider )

router.get('/', Provider_Controller.getProvider)

module.exports = router