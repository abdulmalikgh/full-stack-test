const mongoose = require('mongoose')
const {isEmail} = require('validator')

const clientSchema = ({
    name: {
        type:String,
        required:true
    },
    email: {
        type: String,
        required: true,
        unique:true
    },
    phone: {
        type:String,
        required:true
    },
    providers: [
     {type: mongoose.Schema.Types.ObjectId, ref:'Providers', required: true,},
    ]
})

module.exports = mongoose.model('Client', clientSchema)