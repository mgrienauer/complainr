const express = require('express')
const router = express.Router()
const gravatar = require('gravatar')
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const keys = require('../../config/keys')
const passport = require('passport')

//load input validation
const validateRegisterInput = require('../../validation/register.js')
const validateLoginInput = require('../../validation/login.js')

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
    //destructure errors and isvalid keys
    //pass in entire request body to make sure no empty vals
    const { errors, isValid } = validateRegisterInput(req.body)
    
    // check validation and return proper responses
    if(!isValid) {
        return res.status(400).json(errors)
    }

    // make sure that email is not already in db
    User.findOne({ email: req.body.email })
        .then(user => {
            //if user email exists, return a 400 status code (bad request)
            if(user) {
                errors.email = "Oof...email already in use"
                return res.status(400).json({errors})
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
                        if(err && err.length > 0) throw err
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

// @route   POST api/users/login
// @desc    login user and return JWT token
// @access  Public
router.post('/login', (req, res) => {
    //store user's email and password in consts
    const email = req.body.email
    const password = req.body.password

    //destructure errors and isvalid keys
    //pass in entire request body to make sure no empty vals
    const { errors, isValid } = validateLoginInput(req.body)
    
    // check validation and return proper responses
    if(!isValid) {
        return res.status(400).json(errors)
    }

    //find user by email
    User.findOne({email})
        .then(user => {
            //if user not found by id in db, return 404 error
            if(!user) {
                errors.email = 'Email not found'
                return res.status(404).json(errors)
            }

            //check password by using bcrypt to compare the user provided pass with hashed pass in db
            bcrypt.compare(password, user.password)
                .then(isMatch => {
                    //if the promise is resolved, return a success msg
                    if(isMatch) {
                        //create JWT payload object to be returned upon successful login
                        const payload = { id: user.id, name: user.name, avatar: user.avatar }
                        
                        //sign token (givew expiration, designate token type)
                        jwt.sign(
                            payload,
                            keys.secretOrKey,
                            {expiresIn: 3600},
                            (err, token) => {
                                res.json({
                                    success: true,
                                    token: 'Bearer ' + token 
                                })
                            }
                        )

                    //if promise is rejected or error, return 400 error 
                    } else {
                        errors.password = 'Oof... Incorrect password'
                        return res.status(400).json(errors)
                    }
                })
        })
})

// @route   GET api/users/current
// @desc    return current user
// @access  Private

router.get(
    '/current', 
    passport.authenticate('jwt', {session: false}), 
    (req, res) => {
        res.json({
            id: req.user.id,
            name: req.user.name,
            email: req.user.email,
        })
    }
)

module.exports = router