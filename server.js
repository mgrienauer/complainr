const express = require('express') // import express library

const app = express() // set app as new express server

app.get('/', (req, res) => res.send('hello')) //set basic route that returns hello

//create port const, equal to either environment var (heroku deploy) or localhost 5000
const port = process.env.PORT || 5000

//run express server on desired port, log that server is running
app.listen(port, () => console.log(`Server running on ${port}...`))