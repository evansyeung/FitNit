var express = require("express");
var router = express.Router();
var Program = require("../models/program");

var middleware = require("../middleware");

// INDEX ROUTE
router.get("/", function(req, res){
   res.render("programs/index",{ page: 'workout-programs' }) ;
});

// INDEX ROUTES for each cartegory
router.get("/chest", function(req, res) {
   Program.find({"cartegory": "chest"}, function(err, chestPrograms){
       if(err) {
           console.log(err);
       } else {
           res.render("programs/chest", {chestPrograms: chestPrograms});
       }
   });
});

router.get("/legs", function(req, res) {
   Program.find({"cartegory": "legs"}, function(err, legsPrograms){
       if(err) {
           console.log(err);
       } else {
           res.render("programs/legs", {legsPrograms: legsPrograms});
       }
   });
});

router.get("/back", function(req, res) {
   Program.find({"cartegory": "back"}, function(err, backPrograms){
       if(err) {
           console.log(err);
       } else {
           res.render("programs/back", {backPrograms: backPrograms});
       }
   });
});

router.get("/shoulder", function(req, res) {
   Program.find({"cartegory": "shoulder"}, function(err, shoulderPrograms){
       if(err) {
           console.log(err);
       } else {
           res.render("programs/shoulder", {shoulderPrograms: shoulderPrograms});
       }
   });
});

router.get("/arms", function(req, res) {
   Program.find({"cartegory": "arms"}, function(err, armsPrograms){
       if(err) {
           console.log(err);
       } else {
           res.render("programs/arms", {armsPrograms: armsPrograms});
       }
   });
});

router.get("/other", function(req, res) {
   Program.find({"cartegory": "other"}, function(err, otherPrograms){
       if(err) {
           console.log(err);
       } else {
           res.render("programs/other", {otherPrograms: otherPrograms});
       }
   });
});

// CREATE ROUTE
router.post("/",  middleware.isLoggedIn, function(req, res){
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
router.get("/new", middleware.isLoggedIn, function(req, res){
    res.render("programs/new");
});

// SHOW ROUTE - 6 for each cartegory
router.get("/chest/:id", function(req, res) {
    Program.findById(req.params.id, function(err, foundProgram){
        if(err) {
            console.log(err);
        } else {
            res.render("programs/show", {program: foundProgram})
        }
    })
});

router.get("/legs/:id", function(req, res) {
    Program.findById(req.params.id, function(err, foundProgram){
        if(err) {
            console.log(err);
        } else {
            res.render("programs/show", {program: foundProgram})
        }
    })
});

router.get("/back/:id", function(req, res) {
    Program.findById(req.params.id, function(err, foundProgram){
        if(err) {
            console.log(err);
        } else {
            res.render("programs/show", {program: foundProgram})
        }
    })
});

router.get("/shoulder/:id", function(req, res) {
    Program.findById(req.params.id, function(err, foundProgram){
        if(err) {
            console.log(err);
        } else {
            res.render("programs/show", {program: foundProgram})
        }
    })
});

router.get("/arms/:id", function(req, res) {
    Program.findById(req.params.id, function(err, foundProgram){
        if(err) {
            console.log(err);
        } else {
            res.render("programs/show", {program: foundProgram})
        }
    })
});

router.get("/other/:id", function(req, res) {
    Program.findById(req.params.id, function(err, foundProgram){
        if(err) {
            console.log(err);
        } else {
            res.render("programs/show", {program: foundProgram})
        }
    })
});


module.exports = router;