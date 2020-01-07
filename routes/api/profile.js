const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const passport = require('passport') //for accesing protected routes

// load profile model to use with mongoose
const Profile = require('../../models/Profile')
//load user model to use with mongoose
const User = require('../../models/User')

//load validation functions
const validateProfileInput = require('../../validation/profile')

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
        //use populate method to insert name and avatar fields from user model into profile model
        .populate('user', ['name', 'avatar'])
        .then(profile => {
            //if profile doesnt exist, add to the errors obj and return 404 / error
            if (!profile) {
                errors.noprofile = "Oof...no profile found for this user.."
                return res.status(404).json(errors)
            }
            //if profile exists, return the profile object
            res.json(profile)
        })
        //if error for findOne, return 404 and the error obj
        .catch(err => res.json(404).json(err))
})

// @route   POST api/profile
// @desc    Create a new user profile
// @access  Private

router.post(
    '/',
    //pass in passprot authenticate parameter for private session
    passport.authenticate('jwt', {session: false}),
    (req, res) => {
        //get errors and isValid objects from validateProfileInput, pass in request.body
        const { errors, isValid } = validateProfileInput(req.body)

        //check validation of profile form sent by user
        if(!isValid) {
            //if invalid, return errors with 400 status to frontend
            return res.status(400).json(errors)
        }

        //get all fields from user for new profile
        const profileFields = {}
        //populate profileFields.user with id info (username, pw, email) sent in request
        profileFields.user = req.user.id
        //validate info and add to profileFields if valid
        if(req.body.handle) profileFields.handle = req.body.handle
        if(req.body.bio) profileFields.bio = req.body.bio
        if(req.body.location) profileFields.location = req.body.location
        if(req.body.status) profileFields.status = req.body.status
        if(req.body.complaints) profileFields.complaints = req.body.complaints
        //split skills into an array (theyre coming as CSV)
        if(typeof req.body.complaints !== 'undefiend') {
            profileFields.complaints = req.body.complaints.split(',')
        }
        //initialize empty object in profileFields to avoid error
        profileFields.social = {}
        if(req.body.youtube) profileFields.social.youtube = req.body.youtube
        if(req.body.twitter) profileFields.social.twitter = req.body.twitter
        if(req.body.facebook) profileFields.social.facebook = req.body.facebook
        if(req.body.instagram) profileFields.social.instagram = req.body.instagram
        
        //check db for user, if they exist update the user profile and return it to frontend
        //else, create a new user and check if the desired user handle exists
        Profile.findOne({ user: req.user.id }).then(profile => {
            //if user profile exists, update
            if (profile) {
                //update user profile on db
                Profile.findOneAndUpdate(
                    {user: req.user.id},
                    {$set: profileFields},
                    {new: true}
                ).then(profile => res.json(profile))
            } else {
                //else, create new user if not found
                //check is desired user handle already exists
                Profile.findOne({ handle: profileFields.handle }).then(profile => {
                    if(profile) {
                        errors.handle = 'So unoriginal, handle already in use'
                        res.status(400).json(errors)
                    }

                    //create/save new profile
                    new Profile(profileFields).save().then(profile => res.json(profile))
                })
            }
        })
    }
)

// @route   DELETE api/profile
// @desc    Delete a user and their profile
// @access  Private

router.delete(
    '/',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
        //find user and remove their profile with the user id sent in request
        Profile.findOneAndRemove({ user: req.user.id })
            .then(() => {
                //find user and remove their account
                User.findOneAndRemove({ _id: req.user.id }).then(() => 
                    //return success as true to frontend if succesfully deleted
                    res.json({ success: true })
                )
            })
    }
)
    
    

module.exports = router