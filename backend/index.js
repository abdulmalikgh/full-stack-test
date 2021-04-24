const express = require('express')

const dbConnection = require('./dbconnection/mongoconnection')

const app = express()

const swaggerUI = require('swagger-ui-express')

const router = require('./routes/index')

const cors = require('cors')

const morgan = require('morgan')

const YAML = require('yamljs')

const path = require('path')

const swaggerDocument = YAML.load(path.join(__dirname, '../swagger.yaml'))

// swagger 
// const options = {
//     definition: {
//       openapi: '3.0.0',
//       info: {
//         title: 'Client app API',
//         version: '1.0.0',
//       },
//     },
//     apis: ['./routes/index.js'], 
//   };
  
// const swaggerDocs = swaggerJSDoc(options)


require('dotenv').config()

dbConnection.connection()

// MIDDLEWARES
app.use(cors())
app.use(express.json())
app.use(morgan('dev'))
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument))
app.use('/api', router)

app.listen(process.env.PORT, function(){
    console.log(`App is listening on ${process.env.PORT}`)
})