const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const passport = require('passport')

//Post model
const Post = require('../../models/Post')
//Profile model
const Profile = require('../../models/Profile')

// validation
const validatePostInput = require('../../validation/post')

// @route   GET api/posts/test
// @desc    Tests posts route
// @access  Public
//handle get resuests for /users path
router.get('/test', (req, res) => res.json({msg: "Posts working"}))

// @route   GET api/posts
// @desc    Get all posts
// @access  Public
router.get('/', (req, res) => {
    //retrieve all psots
    Post.find()
        //sort in reverse chronological order
        .sort({ date: -1 })
        .then(posts => res.json(posts))
        .catch(err => res.status(404).json({ nopostsfound: 'No posts found' }))
})

// @route   GET api/posts/:id
// @desc    Get post by id
// @access  Public
router.get('/:id', (req, res) => {
    //retrieve a single post by its id
    Post.findById(req.params.id)
        .then(post => res.json(post))
        .catch(err => res.status(404).json({nopostsfound: 'No psots found with that id'}))
})


// @route   POST api/posts/test
// @desc    Create post
// @access  Private
router.post('/', passport.authenticate('jwt', {session: false}), (req, res) => {
    // destructure errors and isvalid from validatePostInput function
    const { errors, isValid } = validatePostInput(req.body)

    //check validation
    if(!isValid){
        //if any errors, send 400 with errors object
        return res.status(400).json(errors)
    }
    
    const newPost = new Post({
        text: req.body.text,
        name: req.body.name,
        avatar: req.body.avatar,
        user: req.user.id
    })
    //save the post to db and return post to frontend
    newPost.save().then(post => res.json(post))
})

// @route   DELETE api/posts/:id
// @desc    Delete post by id
// @access  Private
router.delete('/:id', passport.authenticate('jwt', {session: false}), (req, res) => {
    //find the profile of the user making the delete request
    Profile.findOne({ user: req.user.id })
        // search their profile for the post by id
        .then(profile => {
            Post.findById(req.params.id)
                .then(post => {
                    // if the post object's user id !== the user id sent by request, return error
                    if (post.user.toString() !== req.user.id) {
                        return res.status(401).json({ notauthorized: 'User not authorized'})
                    }
                    // once sure user making req is user who made post, delete
                    post.remove().then(() => res.json({ success: true }))
                })
                // use error catching if unable to find post in db
                .catch(err => res.status(404).json({ postnotfound: 'no post found'}))
        })
})


module.exports = router