const express = require('express') // import express library
const mongoose = require('mongoose')
const bodyParser = require('body-parser')

// import express routes
const users = require('./routes/api/users')
const profile = require('./routes/api/profile')
const posts = require('./routes/api/posts')

// set app as new express middleware server
const app = express() 
//import body parser middleware to let us access req.body.(whatever info)
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

//DB config
const db = require('./config/keys').mongoURI

//coonect to mongodb with mongoose
mongoose
    .connect(db)
    .then(() => {
        console.log('mongodb connected')
    })
    .catch(error => console.log(error))

app.get('/', (req, res) => res.send('hello')) //set basic route that returns hello

//use express routes
app.use("/api/users", users)
app.use("/api/profile", profile)
app.use("/api/posts", posts)

//create port const, equal to either environment var (heroku deploy) or localhost 5000
const port = process.env.PORT || 5000

//use express routes
app.use('./api/users', users)
app.use('./api/profile', profile)
app.use('./api/posts', posts)

//run express server on desired port, log that server is running
app.listen(port, () => console.log(`Server running on ${port}...`))