const express = require("express"); // import express library
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");

// import express routes
const users = require("./routes/api/users");
const profile = require("./routes/api/profile");
const posts = require("./routes/api/posts");

// set app as new express middleware server
const app = express();

//import body parser middleware to let us access req.body.(whatever info)
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//DB config
const db = require("./config/keys").mongoURI;

//fix deprecations: https://mongoosejs.com/docs/deprecations.html
mongoose.set("useNewUrlParser", true);
mongoose.set("useFindAndModify", false);
mongoose.set("useCreateIndex", true);
mongoose.set("useUnifiedTopology", true);

//coonect to mongodb with mongoose
mongoose
	.connect(db)
	.then(() => {
		console.log("mongodb connected...");
	})
	.catch((error) => console.log(error));

//use passport middleware
app.use(passport.initialize());

//import passprot config and pass in passprt as arg
require("./config/passport")(passport);

//use express routes
app.use("/api/users", users);
app.use("/api/profile", profile);
app.use("/api/posts", posts);

//create port const, equal to either environment var (heroku deploy) or localhost 5000
const port = process.env.PORT || 5000;

//run express server on desired port, log that server is running
app.listen(port, () => console.log(`Server running on ${port}...`));
