const express = require('express')

const dbConnection = require('./dbconnection/mongoconnection')

const app = express()

require('dotenv').config({
    path:'./config/config.env'
})

// MIDDLEWARES
dbConnection.connection()
app.listen(process.env.PORT, function(){
    console.log(`App is listening on ${process.env.PORT}`)
})