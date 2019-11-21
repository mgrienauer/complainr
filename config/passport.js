const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
const mongoose = require('mongoose')
const User = mongoose.model('users')
const keys = require('../config/keys')

//create passport options
//more info on jwt passport config at http://www.passportjs.org/packages/passport-jwt/
const opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken()
opts.secretOrKey = keys.secretOrKey

//export passport auth of private api endpoints
module.exports = passport => {
    passport.use(
        new JwtStrategy(opts, (jwt_payload, done) => {
            //use mongoose to find the user in db, web token has user id
            //this returns a promise
            User.findById(jwt_payload.id)
                .then(user => {
                    //if user found, return pasport `done` function with null for error arg and user as 2nd arg
                    //else, return null for error and false for user
                    if (user) {
                        return done(null, user)
                    }
                    return done(null, false)
                })
                .catch(err => console.log(err))
        })
    )
}