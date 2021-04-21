const mongoose = require('mongoose')

const providersSchema = mongoose.Schema({
    id: {
        type:String,
        required:true,
    },
    name: {
        type: String,
        require: true
    }
})

module.exports = mongoose.model('Providers', providersSchema)