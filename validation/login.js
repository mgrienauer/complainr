const Validator = require('validator')

const isEmpty = require('./is_empty')

//create and export function that validates user input when they are registering
module.exports = function validateLoginInput(data) {
    //create object literal so store errors
    let errors = {}

    //validator only checks strings, so we have to convert undefined / null to an empty string first
    data.email = !isEmpty(data.email) ? data.email : ''
    data.password = !isEmpty(data.password) ? data.password : ''

    //validate email isnt empty
    if(Validator.isEmpty(data.email)) {
        errors.email = "Urgh...email field is required"
    }
    //validate email is in fact an email
    if(!Validator.isEmail(data.email)) {
        errors.email = "Urgh...email field is required"
    }
    //validate that password field isnt empty
    if(Validator.isEmpty(data.password)) {
        errors.password = "Urgh...password field is required"
    }
    //validate password is between 6-30 chars
    if(!Validator.isLength(data.password, {min:6, max:30})) {
        errors.password = "Doh...password must be between 6-30 characters"
    }

    //return value that will determine if input is valid
    return {
        errors,
        isValid: isEmpty(errors)
    }
}