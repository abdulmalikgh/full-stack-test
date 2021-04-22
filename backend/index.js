const express = require('express')

const dbConnection = require('./dbconnection/mongoconnection')

const app = express()

const router = require('./routes/index')

const cors = require('cors')

const morgan = require('morgan')

require('dotenv').config({
    path:'./config/config.env'
})

dbConnection.connection()

// MIDDLEWARES
app.use(cors())
app.use(express.json())
app.use(morgan('dev'))
app.use('/api', router)


app.listen(process.env.PORT, function(){
    console.log(`App is listening on ${process.env.PORT}`)
})