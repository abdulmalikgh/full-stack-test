const express = require('express')

const app = express()

const providerRoute = require('./providers')

const clientRouter = require('./client')

app.use('/providers', providerRoute )

app.use('/clients', clientRouter)

module.exports = app