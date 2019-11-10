const express = require('express')
const router = express.Router()

// @route   GET api/users/test
// @desc    Tests users route
// @access  Public

//handle get resuests for /users path
router.get('/test', (req, res) => res.json({msg: "Users working"}))

module.exports = router