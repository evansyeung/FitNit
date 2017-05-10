var express = require("express");
// Will merge the params (:id) from the campground and comments so now we can use "/campgrounds/:id/comments"
var router = express.Router({mergeParams: true});
var Program = require("../models/program");
var Comment = require("../models/comment");

var middleware = require("../middleware");

// ==================
// COMMENTS ROUTES
// ==================

// CREATE ROUTE
router.post("/", middleware.isLoggedIn, function(req, res){
    Program.findById(req.params.id, function(err, foundProgram) {
       if(err) {
           console.log(err);
           res.redirect("/workout-programs");
       } else {
        //   console.log(req.body.comment);
           Comment.create(req.body.comment, function(err, comment){
               if(err) {
                   // Could happen when the databse messes up
                   req.flash("error", "Something went wrong");
                   console.log(err);
               } else {
                   // Add username and _id to comments
                   comment.author.id = req.user._id;
                   comment.author.username = req.user.username;
                   // save comment
                   comment.save();
                   // push to program's comment object
                   foundProgram.comments.push(comment);
                   // save program
                   foundProgram.save();
                   
                   req.flash("success", "Successfully added comment");
                   res.redirect("/workout-programs/" + foundProgram.category + "/" + foundProgram._id);
               }
           });
       }
    });
});

// EDIT ROUTE
router.get("/:comment_id/edit", middleware.checkCommentOwnership, function(req, res){
   Program.findById(req.params.id, function(err, foundProgram) {
       if(err) {
           console.log(err);
           res.redirect("/workout-programs");
       } else {
           Comment.findById(req.params.comment_id, function(err, foundComment) {
               if(err) {
                   res.redirect("back");
               } else {
                   res.render("comments/edit", {program: foundProgram, comment: foundComment}); 
               }
            });
        }
    });
});

// UPDATE ROUTE
router.put("/:comment_id", middleware.checkCommentOwnership, function(req, res){
    Program.findById(req.params.id, function(err, foundProgram) {
       if(err) {
           console.log(err);
           res.redirect("/workout-programs");
       } else {
          Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment){
              if(err) {
                  res.redirect("back");
              } else {
                  res.redirect("/workout-programs/" + foundProgram.category + "/" + req.params.id)
              }
          });
       }
    });
});

// DESTROY ROUTE
router.delete("/:comment_id", middleware.checkCommentOwnership, function(req, res){
    Program.findById(req.params.id, function(err, foundProgram) {
        if(err) {
            console.log(err);
            res.redirect("/workout-programs");
        } else {
            Comment.findByIdAndRemove(req.params.comment_id, function(err){
                if(err) {
                    req.flash("error", "Something went wrong");
                    res.redirect("back");
                } else {
                    req.flash("success", "Successfully deleted comment");
                    res.redirect("/workout-programs/" + foundProgram.category + "/" + req.params.id);
                }
            });
        }
    });
});

module.exports = router;
