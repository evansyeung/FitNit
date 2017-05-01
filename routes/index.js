var express = require("express");
var router = express.Router();
var passport = require("passport");

// ROOT ROUTE
router.get("/", function(req, res) {
    res.render("landing");
});

// ==================
// LOGIN ROUTES
// ==================

// show login form
router.get("/login", function(req, res){
   res.render("login", {page: 'login'}); 
});

module.exports = router;