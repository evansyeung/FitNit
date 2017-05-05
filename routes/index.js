var express = require("express");
var router = express.Router();
var passport = require("passport");
var User = require("../models/user");

// ROOT ROUTE
router.get("/", function(req, res) {
    res.render("landing");
});

// ==================
// AUTH ROUTES
// ==================

// SHOW ROUTE - registration form
router.get("/register", function(req, res){
    res.render("register", {page: 'register'}); 
});

router.post("/register", function(req, res){
    var newUser = User({username: req.body.username,
                        fName: req.body.fName,
                        lName: req.body.lName,
                        gender: req.body.gender
    });
    
    User.register(newUser, req.body.password, function(err, user){
       if(err) {
           console.log(err);
           req.flash("error", err.message);
           return res.redirect("register");
       }
       
       passport.authenticate("local")(req, res, function(){
            req.flash("success", "Welcome to FitNit " + user.username)
            res.redirect("/workout-programs");
       });
    });
});
// CREATE ROUTE

// ==================
// LOGIN ROUTES
// ==================

// SHOW ROUTE - login form
router.get("/login", function(req, res){
   res.render("login", {page: 'login'}); 
});

// handling login logic
router.post("/login", passport.authenticate("local", 
    {
        successRedirect: "/workout-programs",
        failureRedirect: "/login",
        failureFlash: true,
        successFlash: 'Welcome to FitNit!'
    }), function(req, res){
});

// logout route
router.get("/logout", function(req, res){
   req.logout();
   req.flash("success", "Logged you out!");
   res.redirect("/login");
});

module.exports = router;