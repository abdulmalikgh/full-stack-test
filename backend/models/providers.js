const mongoose = require('mongoose')

const providersSchema = mongoose.Schema({
    id:{
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Providers', providersSchema)