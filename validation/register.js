const Validator = require('validator')

const isEmpty = require('./is_empty')

//create and export function that validates user input when they are registering
module.exports = function validateRegisterInput(data) {
    //create object literal so store errors
    let errors = {}

    //validator only checks strings, so we have to convert undefined / null to an empty string first
    data.name = !isEmpty(data.name) ? data.name : ''
    data.email = !isEmpty(data.email) ? data.email : ''
    data.password = !isEmpty(data.password) ? data.password : ''
    data.pasword2 = !isEmpty(data.password2) ? data.password2 : ''


    //user Validator library to make sure the length of the str entered for name is between 2 and 30 chars
    if(!Validator.isLength(data.name, { min: 2, max: 30 })) {
        //add error called 'name' to errros object that will be displayed to user if data invalid
        errors.name = "Blegh... Name must be between 2 and 30 characters"
    }
    //validate name field isnt empty
    if(Validator.isEmpty(data.name)) {
        errors.name = "Urgh...Name field is required"
    }
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
    //validate that password2 field isnt empty
    if(Validator.isEmpty(data.password2)) {
        errors.password2 = "Urgh...confirm password field is required"
    }
    //validate that password and password 2 are equal
    if(!Validator.equals(data.password, data.password2)) {
        errors.password2 = "Urgh...passwords didn't match!"
    }

    //return value that will determine if input is valid
    return {
        errors,
        isValid: isEmpty(errors)
    }
}