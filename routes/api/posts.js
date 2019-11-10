const express = require('express')
const router = express.Router()

// @route   GET api/posts/test
// @desc    Tests posts route
// @access  Public

//handle get resuests for /users path
router.get('/test', (req, res) => res.json({msg: "Posts working"}))

module.exports = router