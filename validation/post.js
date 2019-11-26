const Validator = require('validator')

const isEmpty = require('./is_empty')

//create and export function that validates user input when they are registering
module.exports = function validatePostInput(data) {
    //create object literal so store errors
    let errors = {}

    //validator only checks strings, so we have to convert undefined / null to an empty string first
    data.text = !isEmpty(data.text) ? data.text : ''

    //validate that length is between 10 and 300 chars
    if(!Validator.isLength(data.text, { min: 10, max: 300 })) {
        errors.text = "Posts gotta be between 10 and 300 characters"
    }
    //validate that text isnt empty
    if (Validator.isEmpty(data.text)) {
        errors.text = "Text field is required"
    }

    //return value that will determine if input is valid
    return {
        errors,
        isValid: isEmpty(errors)
    }
}