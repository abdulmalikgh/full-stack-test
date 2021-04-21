const express = require('express')

const dbConnection = require('./dbconnection/mongoconnection')

const app = express()

const router = require('./routes/index')

const cors = require('cor')

require('dotenv').config({
    path:'./config/config.env'
})

// MIDDLEWARES
app.use(cors())
app.use(express.json)
app.use('/api', router)

dbConnection.connection()

app.listen(process.env.PORT, function(){
    console.log(`App is listening on ${process.env.PORT}`)
})