const mongoose = require('mongoose')
const Schema = mongoose.Schema

//create user schema, which is how data will look when sent to db
const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    avatar: {
        type: String
    },
    date: {
        type: Date,
        default: Date.now
    },
})

//export the user schema model to be used by other files
module.exports = User = mongoose.model('users', UserSchema)