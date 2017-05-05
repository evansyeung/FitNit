var express = require("express");
var router = express.Router();
var Program = require("../models/program");

var middleware = require("../middleware");

// INDEX ROUTE
router.get("/", function(req, res){
   res.render("programs/index",{ page: 'workout-programs' }) ;
});

// INDEX ROUTES for cartegories
router.get("/chest", function(req, res) {
   Program.find({"cartegory": "chest"}, function(err, chestPrograms){
       if(err) {
           console.log(err);
       } else {
           res.render("programs/chest", {chestPrograms: chestPrograms});
       }
   });
});

// CREATE ROUTE
router.post("/", function(req, res){
    var name = req.body.name;
    var cartegory = req.body.cartegory;
    var date = req.body.date;
    var description = req.body.description;
    var text = req.body.text;
    var author = {
        id: req.user._id,
        username: req.user.username
    };
    
    var newProgram = {name: name, cartegory: cartegory, date: date, description: description, text: text, author: author};
    
    Program.create(newProgram, function(err, program){
        if(err) {
            console.log(err);
        } else {
            console.log(program);
            res.redirect("/workout-programs");
        }
    })
});

// NEW ROUTE
router.get("/new", function(req, res){
    res.render("programs/new");
});

// SHOW ROUTE



module.exports = router;