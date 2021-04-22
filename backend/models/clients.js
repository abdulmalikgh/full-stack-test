const mongoose = require('mongoose')
const {isEmail} = require('validator')

const clientSchema = ({
    id: mongoose.ObjectId,
    name: {
        type:String,
        required:[true, 'Name is required']
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        validate: [isEmail, 'Enter a valid email']
    },
    phone: {
        type:String,
        required:[true, "Phone number is required"]
    },
    providers: [
     {type: mongoose.Schema.Types.ObjectId, ref:'Providers', required: true,},
    ]
})

module.exports = mongoose.model('Client', clientSchema)