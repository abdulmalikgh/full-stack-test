const express = require('express')

const app = express()

const providerRoute = require('./providers')

app.use('/provider', providerRoute )

module.exports = app