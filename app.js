// included modules
const express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose"),
    methodOverride = require('method-override'),
    expressSanitizer = require('express-sanitizer');

// Constant for environment variables and bindings
const PORT = process.env.PORT || 3000;

// module activation and linking
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(expressSanitizer());


// Set up MongoDB/mongoose using ATLAS to make it server-independent (code pulled from MongoDB atlas page )
const mongoURI = process.env.databaseURL;
mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    dbName: "wdbBlog",
    useFindAndModify: false
}, ).then(() => {
    console.log('Connected to DB!');
}).catch(err => {
    console.log('ERROR:', err.message);
});

// override with POST having ?_method=PUT or ?_method=DELETE
app.use(methodOverride('_method'));

// Schema and model
const blogSchema = new mongoose.Schema({
    title: String,
    image: String,
    body: String,
    postCreated: {
        type: Date,
        default: Date.now
    }
});
const Blog = mongoose.model("Blog", blogSchema);

// Redirect from main to the app page.
app.get('/', function (req, res) {
    res.redirect('/blog');
});

// INDEX Overall blog page.
app.get("/blog", (req, res) => {
    Blog.find({}, (err, blogs) => {
        if (err) {
            console.log("Error! Output: " + err);
        } else {
            res.render("index", {
                blogs: blogs
            });
        }
    });
});

// NEW Form to add a new blog post
app.get("/blog/new", (req, res) => {
    res.render("new");
});

// CREATE Add blog post
app.post("/blog", (req, res) => {
    req.body.blog.body = req.sanitize(req.body.blog.body);
    Blog.create(req.body.blog, (err, newlyCreated) => {
        if (err) {
            console.log(err);
        } else {
            console.log(newlyCreated);
            res.redirect("/blog");
        }
    });
});

// SHOW Shows more info about a single blog post
app.get("/blog/:id", (req, res) => {
    // find the blog post with the given ID
    Blog.findById(req.params.id, (err, foundBlog) => {
        if (err) {
            console.log(err);
        } else {
            res.render("show", {
                blog: foundBlog
            });
        }
    });
});


// EDIT Form to edit an existing post
app.get("/blog/:id/edit", (req, res) => {
    Blog.findById(req.params.id, (err, foundBlog) => {
        if (err) {
            console.log(err);
        } else {
            res.render("edit", {
                blog: foundBlog
            });
        }
    });
});

// UPDATE Change the existing post
app.put("/blog/:id", (req, res) => {
    req.body.blog.body = req.sanitize(req.body.blog.body);
    Blog.findByIdAndUpdate(req.params.id, req.body.blog, (err, updateBlog) => {
        if (err) {
            console.log(err);
        } else {
            console.log(updateBlog);
            res.redirect("/blog/" + req.params.id);
        }
    });
});

// DESTROY Delete the existing post
app.delete("/blog/:id", (req, res) => {
    Blog.findByIdAndDelete(req.params.id, (err) => {
        if (err) {
            console.log(err);
            res.redirect("/blog");
        } else {
            res.redirect("/blog");
        }
    });
});


// Server start!
app.listen(PORT, () => {
    console.log("The blog app server has started!");
});
