var express = require("express");
var router = express.Router();
var Program = require("../models/program");

var middleware = require("../middleware");

// INDEX ROUTE
router.get("/", function(req, res){
   res.render("programs/index",{ page: 'workout-programs' }) ;
});

// INDEX ROUTES for each category
router.get("/:category", function(req, res) {
    Program.find({"category": req.params.category}, function(err, foundPrograms){
       if(err) {
           console.log(err);
       } else {
           res.render("programs/" + req.params.category, {programs: foundPrograms, category: req.params.category});
       }
   });
});

// CREATE ROUTE
router.post("/",  middleware.isLoggedIn, function(req, res){
    var name = req.body.name;
    var category = req.body.category;
    var date = req.body.date;
    var description = req.body.description;
    var exercises = req.body.exercises;
    var sets = req.body.sets;
    var reps = req.body.reps;
    var author = {
        id: req.user._id,
        username: req.user.username
    };
    
    var newProgram = {name: name, category: category, date: date, description: description, exercises: exercises, sets: sets, reps: reps, author: author};
    
    Program.create(newProgram, function(err, program){
        if(err) {
            console.log(err);
        } else {
            // console.log(program);
            res.redirect("/workout-programs");
        }
    })
});

// NEW ROUTE
router.get("/:category/new", middleware.isLoggedIn, function(req, res){
    res.render("programs/new", { category: req.params.category});
});

// SHOW ROUTE - 6 for each category
router.get("/chest/:id", function(req, res) {
    Program.findById(req.params.id).populate("comments").exec(function(err, foundProgram){
        if(err) {
            console.log(err);
        } else {
            res.render("programs/show", {program: foundProgram})
        }
    })
});

router.get("/legs/:id", function(req, res) {
    Program.findById(req.params.id).populate("comments").exec(function(err, foundProgram){
        if(err) {
            console.log(err);
        } else {
            res.render("programs/show", {program: foundProgram})
        }
    })
});

router.get("/back/:id", function(req, res) {
    Program.findById(req.params.id).populate("comments").exec(function(err, foundProgram){
        if(err) {
            console.log(err);
        } else {
            res.render("programs/show", {program: foundProgram})
        }
    })
});

router.get("/shoulder/:id", function(req, res) {
    Program.findById(req.params.id).populate("comments").exec(function(err, foundProgram){
        if(err) {
            console.log(err);
        } else {
            res.render("programs/show", {program: foundProgram})
        }
    })
});

router.get("/arms/:id", function(req, res) {
    Program.findById(req.params.id).populate("comments").exec(function(err, foundProgram){
        if(err) {
            console.log(err);
        } else {
            res.render("programs/show", {program: foundProgram})
        }
    })
});

router.get("/other/:id", function(req, res) {
    Program.findById(req.params.id).populate("comments").exec(function(err, foundProgram){
        if(err) {
            console.log(err);
        } else {
            res.render("programs/show", {program: foundProgram})
        }
    })
});

// EDIT ROUTE
router.get("/:id/edit", middleware.checkProgramOwnership, function(req, res){
    // If we get to this point, that means we've already checked ownership and made it through
    Program.findById(req.params.id, function(err, foundProgram){
        if(err) {
            req.flash("error", "Program does not exist");
            res.redirect("back");
        }
        res.render("programs/edit", {program: foundProgram});
    });
});

// UPDATE CAMPGROUND ROUTE
router.put("/:id", middleware.checkProgramOwnership, function(req, res){
    // find and update the correct campground
    Program.findByIdAndUpdate(req.params.id, req.body.program, function(err, updatedProgram){
       if(err){
           res.redirect("/workout-programs");
       } else {
           req.flash("success", "Successfully edited measurement");
           res.redirect("/workout-programs/" + req.body.program.category + "/" + req.params.id);
       }
    });
});

// DESTROY ROUTE
router.delete("/:id", middleware.checkProgramOwnership, function(req, res){
    Program.findByIdAndRemove(req.params.id, function(err){
        if(err) {
            req.flash("error", "Something went wrong");
            res.redirect("/workout-programs");
        } else {
            req.flash("success", "Successfully deleted program");
            res.redirect("/workout-programs");
        }
    });
});

module.exports = router;