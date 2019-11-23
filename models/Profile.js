const mongoose = require('mongoose')
const Schema = mongoose.Schema

//create profile schema for mongodb
const ProfileSchema = new Schema({
    //connect the user schemas with the profile schema
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    //create user profile fields
    handle: {
        type: String,
        required: true,
        max: 40
    },
    bio: {
        type: String,
        max: 300
    },
    location: {
        type: String,
        max: 150
    },
    status: {
        type: String,
        required: false
    },
    skills: {
        type: [String],
        required: true
    },
    social: {
        youtube: {
            type: String
        },
        twitter: {
            type: String
        },
        facebook: {
            type: String
        },
        instagram: {
            type: String
        },
    },
    date: {
        type: Date,
        default: Date.now
    }
})

module.exports = Profile = mongoose.model('profile', ProfileSchema)