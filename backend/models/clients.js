const mongoose = require('mongoose')
const {isEmail} = require('validator')

const clientSchema = ({
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
    providers: [{
        id:Number
    }]
})

module.exports = mongoose.model('Client', clientSchema)