const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const passport = require('passport') //for accesing protected routes

// load profile model to use with mongoose
const Profile = require('../../models/Profile')
//load user model to use with mongoose
const User = require('../../models/User')

// @route   GET api/profile/test
// @desc    Tests profile route
// @access  Public
//handle get resuests for /users path
router.get('/test', (req, res) => res.json({msg: "Profile working"}))

// @route   GET api/profile
// @desc    Get current user's profile
// @access  Private
//pass in passport.authenticate() as second arguement on router.get,
//pass in 'jwt' as the strategy, and {session: false} because we want credentials with each API request
router.get('/', passport.authenticate('jwt', {session: false}), (req, res) => {
    //initialize empty errors object
    const errors = {}

    //on the Profile collection/model, find a user with the id in the request sent to the API
    Profile.findOne({ user: req.user.id })
        .then(profile => {
            //if profile doesnt exist, add to the errors obj and return 404 / error
            if (!profile) {
                errors.noprofile = "oof...no profile found for thsi user.."
                return res.status(404).json(errors)
            }
            //if profile exists, return the profile object
            res.json(profile)
        })
        //if error for findOne, return 404 and the error obj
        .catch(err => res.json(404).json(err))
})

module.exports = router