const express = require('express')
const router = express.Router()

// @route   GET api/profile/test
// @desc    Tests profile route
// @access  Public

//handle get resuests for /users path
router.get('/test', (req, res) => res.json({msg: "Profile working"}))

module.exports = router