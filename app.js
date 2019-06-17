// included modules
const express = require("express"),
	  app = express(),
	  bodyParser = require("body-parser"),
	  mongoose = require("mongoose");

// module activation and linking
// mongoose.connect("mongodb://localhost:27017/wdb_blog", { useNewUrlParser: true });
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static("public"));

const mongoURI = "mongodb+srv://devidle:" + process.env.MDBauth + "@cluster0-jcmtm.mongodb.net/test?retryWrites=true&w=majority";

// Set up MongoDB/mongoos using ATLAS to make it server-independent (code pulled from MongoDB atlas page )
mongoose.connect(mongoURI, { useNewUrlParser: true },).then(() => {
	console.log('Connected to DB!');
}).catch(err => {
	console.log('ERROR:', err.message);
});


// Schema and model
const blogSchema = new mongoose.Schema({
    title: String;
    image: String;
    body: String;
    postCreated: {type: Date, default: Date.now}
});
const Blog = mongoose.model("Blog", blogSchema);

// Redirect from main to the app page.
app.get('/', function(req, res){
    res.redirect('/blog');
})

// INDEX Overall blog page.
app.get('/blog', function(req, res){
Blog.find({},

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