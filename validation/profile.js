const Validator = require('validator')

const isEmpty = require('./is_empty')

//create and export function that validates user input when they are registering
module.exports = function validateProfileInput(data) {
    //create object literal so store errors
    let errors = {}

    //validator only checks strings, so we have to convert undefined / null to an empty string first
    data.handle = !isEmpty(data.handle) ? data.handle : ''
    data.status = !isEmpty(data.status) ? data.status : ''
    data.skills = !isEmpty(data.skills) ? data.skills : ''

    //validate that handle length is 2-40 chars
    if (!Validator.isLength(data.handle, { min:3, max:40 })) {
        errors.handle = "Handle has to be between 3-40 characters"
    }
    //validate that handle is not empty
    if (Validator.isEmpty(data.handle)) {
        errors.handle = "Handle can't be empty..yeesh"
    }
    //validate that skills field isnt empty
    if (Validator.isEmpty(data.skills)) {
        errors.skills = "skills can't be empty..yeesh"
    }
    //check social media and validate that they are URLs
    if(!isEmpty(data.youtube)) {
        if(!Validator.isURL(data.youtube)) {
            errors.youtube = "Social media links gotta be URLs"
        }
    }
    if(!isEmpty(data.twitter)) {
        if(!Validator.isURL(data.twitter)) {
            errors.twitter = "Social media links gotta be URLs"
        }
    }
    if(!isEmpty(data.facebook)) {
        if(!Validator.isURL(data.facebook)) {
            errors.facebook = "Social media links gotta be URLs"
        }
    }
    if(!isEmpty(data.instagram)) {
        if(!Validator.isURL(data.instagram)) {
            errors.instagram = "Social media links gotta be URLs"
        }
    }

    //return value that will determine if input is valid
    return {
        errors,
        isValid: isEmpty(errors)
    }
}