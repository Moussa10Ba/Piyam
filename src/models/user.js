import mongoose from "mongoose";


const userSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: [true, 'Please enter the first Name']
    },
    lastName: {
        type: String,
        required: [true, 'Please enter the Last Name']
    },
    email: {
        type: String,
        required: [true, 'Please enter the  email']
    },
    phoneNumber: {
        type: String,
        required: [true, 'Please enter the  phone number']
    },
    address: {
        type: String,
        required: [true, 'Please enter the  adress']
    },
    password: {
        type: String,
        required: [true, 'Please Password']
    },

    role: {
        type: String,
        enum: ['admin', 'user'],
        default: 'user'
    },
})

export default mongoose.model('User', userSchema)