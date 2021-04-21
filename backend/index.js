const express = require('express')

const app = express()

require('dotenv').config({
    path:'./config/config.env'
})

app.listen(process.env.PORT, function(){
    console.log(`App is listening on ${process.env.PORT}`)
})