const express = require('express')
const router = express.Router()
const gravatar = require('gravatar')
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const User = require('../../models/User') // import User model for mongodb
// @route   GET api/users/test
// @desc    Tests users route
// @access  Public

//handle get resuests for /users path
router.get('/test', (req, res) => res.json({msg: "Users working"}))

// @route   POST api/users/register
// @desc    register new users route
// @access  Public

//handle posts requests to users/register route
router.post('/register', (req, res) => {
    // make sure that email is not already in db
    User.findOne({ email: req.body.email })
        .then(user => {
            //if user email exists, return a 400 status code (bad request)
            if(user) {
                return res.status(400).json({email: 'email already in use'})
            } else {
            //else, create a new user with provided email and info
                //create avatar using either email provided or default from gravatar library
                const avatar = gravatar.url(req.body.email, {
                    s: '200', //size
                    r: 'pg',  //rating
                    d: 'mm'   //default avatar icon   
                })

                const newUser = new User({
                    name: req.body.name,
                    email: req.body.email,
                    avatar,
                    password: req.body.password,
                })    

                //use bcrypt to hash password (we dont want to send in plaintext)
                // user gensalt to create random characters to add to password
                bcrypt.genSalt(10, (err, salt) => {
                    //scramble these random chars using hash
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if(err) throw err
                        //set the password of the newUser obj to the hash
                        newUser.password = hash
                        //save to db with mognoose, return the user object in json because we might need to use it
                        newUser.save()
                            .then(user => res.json(user))
                            .catch(err => console.log(err))
                    })
                })
            }
        })

})

module.exports = router