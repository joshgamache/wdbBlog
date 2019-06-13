// included modules
const express = require("express"),
	  app = express(),
	  bodyParser = require("body-parser"),
	  mongoose = require("mongoose");

// module activation and linking
// mongoose.connect("mongodb://localhost:27017/wdb_blog", { useNewUrlParser: true });
// Set up MongoDB/mongoos using ATLAS to make it server-independent
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static("public"));

// Schema and model

// INDEX Overall blog page
app.get('/blog', function(req, res){
	res.render("index");
});
// SHOW Shows more info about a single blog post
// NEW Form to add a new blog post
// CREATE Add blog post
// EDIT Form to edit an existing post
// UPDATE Change the existing post
// DESTROY Delete the existing post

// Server start!
app.listen(3000, function(){
	console.log("The blog app server has started!");
});