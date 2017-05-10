var express = require("express");
var router = express.Router();
var mongoose = require('mongoose');
var User = require("../models/user");
var Program = require("../models/program");

var middleware = require("../middleware");

// SHOW my programs route
router.get("/:id/my-programs", middleware.checkAccountOwnership, function(req, res) {
    var id = mongoose.Types.ObjectId(req.user._id);
    var username = req.user.username;
    Program.find({"author" : { "id" : id, "username" : username }}, function(err, foundPrograms){
        if(err) {
            console.log(err);
        } else {
            res.render("users/programs", {programs: foundPrograms, cartegory: req.params.cartegory});
        }
    });
});

// EDIT ROUTE
router.get("/:id/account-settings", middleware.checkAccountOwnership, function(req, res){
    User.findById(req.params.id, function(err, foundUser){
        if(err) {
            req.flash("error", "User does not exist");
            res.redirect("back");
        }
        res.render("users/edit", {user: foundUser});
    });
});

// UPDATE ROUTE
router.put("/:id", middleware.checkAccountOwnership, function(req, res){
    // find and update the correct user
    User.findByIdAndUpdate(req.params.id, req.body.user, function(err, updatedUser){
       if(err){
           res.redirect("/measurements");
       } else {
           req.flash("success", "Account updated successfully");
           res.redirect("/measurements");
       }
    });
});

module.exports = router;