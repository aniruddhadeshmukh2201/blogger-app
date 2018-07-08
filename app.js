var express = require("express");
var app = express();
var mongoose = require("mongoose");
var bodyParser = require("body-parser");
var methodOverride = require("method-override");
var Blog = require("./models/blog");
var Comment = require("./models/comment");

mongoose.connect("mongodb://localhost/blogger_app");
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(methodOverride("_method"));

//****************************************************
//RESTful ROUTES...
//****************************************************

app.get("/", function(req, res){
    res.redirect("/blogs");
});

//INDEX ROUTE...
app.get("/blogs", function(req, res){
    Blog.find({}, function(err, blogs){
       if(err){
           console.log(err);
       } else {
           res.render("campgrounds/index", {blogs: blogs});
       }
    });
});

// NEW ROUTE..
app.get("/blogs/new", function(req, res){
            res.render("campgrounds/new");
});

// CREATE ROUTE...
app.post("/blogs", function(req, res){
    Blog.create(req.body.blog, function(err, newBLog){
        if(err){
            console.log("error!!!");
            res.render("campgrounds/new");
        } else {
            res.redirect("/blogs");
        }
    });
});

//SHOW ROUTE...
app.get("/blogs/:id", function(req, res){
    Blog.findById(req.params.id, function(err, foundBlog){
        if(err){
            console.log(err);
            res.redirect("/blogs");
        } else {
            res.render("campgrounds/show", {blog: foundBlog});
        }
    });
});

// EDIT ROUTE...
app.get("/blogs/:id/edit", function(req, res){
    Blog.findById(req.params.id, function(err, foundBlog){
        if(err){
            res.redirect("/blogs/"+ req.params.id);
        } else {
            res.render("campgrounds/edit", {blog: foundBlog});
        }
    });
});

//UPDATE ROUTE...
app.put("/blogs/:id", function(req, res){
    Blog.findByIdAndUpdate(req.params.id, req.body.blog, function(err, updatedBlog){
      if(err){
        res.redirect("/blogs");
    } else {
        res.redirect("/blogs/" + req.params.id);
    }
    });
});

//DELETE ROUTE
app.delete("/blogs/:id", function(req, res){
    Blog.findByIdAndRemove(req.params.id, function(err){
      if(err){
          res.redirect("/blogs");
      } else {
          res.redirect("/blogs");
      }
    });
    //res.send("you reached the delete route...");
});

//*********************************************************
// COMMENT ROUTES...
//*********************************************************

//NEW ROUTE...

app.get("/blogs/:id/comments/new", function(req, res){
    Blog.findById(req.params.id, function(err, blog){
        if(err){
            console.log(err);
        } else {
            res.render("comments/new", {blog: blog});
        }
    });
});

//COMMENT CREATE ROUTE...

app.post("/blogs/:id/comments", function(req, res){
    Blog.findById(req.params.id, function(err, blog){
       if(err){
           console.log(err);
       } else {
           Comment.create(req.body.comment, function(err, comment){
               if(err){
                   console.log(err);
               } else {
                   blog.comments.push(comment);
                   blog.save();
                   res.redirect("/blogs/"+ req.params.id);
               }
           });
       }
    });
});

// EDIT ROUTE...

app.put("/blogs/:id/comments/edit", function(req, res){
    res.send("edit route");
});

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Server started");
});