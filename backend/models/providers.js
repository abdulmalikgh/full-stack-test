const mongoose = require('mongoose')

const providersSchema = mongoose.Schema({
    id: {
        type: Number,
        required: [true,'ID field is required']
    },
    name: {
        type: String,
        required:[ true,"Name field is required" ]
    }
})

module.exports = mongoose.model('Providers', providersSchema)