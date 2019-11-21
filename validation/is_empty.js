const isEmpty = val => 
    //check for undefined or null vals
    val === undefined ||
    val === null ||
    //if object, convert to array of keys and check if length === 0
    (typeof val === 'object' && Object.keys(val).length === 0) ||
    //if string, trim whitespace and check that length === 0
    (typeof val === 'string' && val.trim().length === 0)

module.exports = isEmpty