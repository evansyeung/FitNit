var express = require("express");
var mongoose = require('mongoose');
var router = express.Router();
var Measurement = require("../models/measurement");

var middleware = require("../middleware");

// INDEX ROUTE
router.get("/", middleware.isLoggedIn, function(req, res){
    var id = mongoose.Types.ObjectId(req.user._id);
    var username = req.user.username;
    Measurement.find({"author" : { "id" : id, "username" : username }}, function(err, allMeasurements){
        if(err) {
            console.log(err);
        } else {
            res.render("measurements/index", {measurements: allMeasurements});
        }
    });
});

// CREATE ROUTE
router.post("/", middleware.isLoggedIn, function(req, res) {
    // Get data from form and create new measurement object
    var date = req.body.date;
    var height = req.body.height;
    var weight = req.body.weight;
    var chest = req.body.chest;
    var waist = req.body.waist;
    var hip = req.body.hip;
    var author = {
        id: req.user._id,
        username: req.user.username
    };
    
    var newMeasurement = {createdAt: date, height: height, weight: weight, chest: chest, waist: waist, hip: hip, author:author};
    
    // Create new measurement to add to DB
    Measurement.create(newMeasurement, function(err, measurement) {
        if(err) {
            console.log(err);
        } else {
            // console.log(measurement);
            res.redirect("/measurements");
        }
    });
});

// NEW ROUTE
router.get("/new", middleware.isLoggedIn, function(req, res) {
    res.render("measurements/new");
});

// SHOW ROUTE
router.get("/:id", middleware.isLoggedIn, function(req, res) {
    Measurement.findById(req.params.id, function(err, foundMeasurement){
        if(err) {
            console.log(err);
        } else {
            res.render("measurements/show", {measurement: foundMeasurement})
        }
    })
});

// EDIT ROUTE
router.get("/:id/edit", middleware.checkMeasurementOwnership, function(req, res){
    // If we get to this point, that means we've already checked ownership and made it through
    Measurement.findById(req.params.id, function(err, foundMeasurement){
        if(err) {
            req.flash("error", "Measurement does not exist");
            res.redirect("back");
        }
        res.render("measurements/edit", {measurement: foundMeasurement});
    });
});

// UPDATE CAMPGROUND ROUTE
router.put("/:id", middleware.checkMeasurementOwnership, function(req, res){
    // find and update the correct measurement
    Measurement.findByIdAndUpdate(req.params.id, req.body.measurement, function(err, updatedMeasurement){
       if(err){
           res.redirect("/measurements");
       } else {
           req.flash("success", "Successfully edited measurement");
           res.redirect("/measurements/" + req.params.id);
       }
    });
});

// DESTROY ROUTE
router.delete("/:id", middleware.checkMeasurementOwnership, function(req, res){
    Measurement.findByIdAndRemove(req.params.id, function(err){
        if(err) {
            req.flash("error", "Something went wrong");
            res.redirect("/measurements");
        } else {
            req.flash("success", "Successfully deleted measurement");
            res.redirect("/measurements");
        }
    });
});

module.exports = router;