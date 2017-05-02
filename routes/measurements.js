var express = require("express");
var router = express.Router();
var Measurement = require("../models/measurements");

// INDEX ROUTE
router.get("/", function(req, res){
    Measurement.find({}, function(err, allMeasurements){
        if(err) {
            console.log(err);
        } else {
            res.render("measurements/index", {measurements: allMeasurements});
        }
    });
});

// CREATE ROUTE
router.post("/", function(req, res) {
    // Get data from form and create new measurement object
    var date = req.body.date;
    var height = req.body.height;
    var weight = req.body.weight;
    var chest = req.body.chest;
    var waist = req.body.waist;
    var hip = req.body.hip;
    
    var newMeasurement = {createdAt: date, height: height, weight: weight, chest: chest, waist: waist, hip: hip};
    
    // Create new measurement to add to DB
    Measurement.create(newMeasurement, function(err, measurement) {
        if(err) {
            console.log(err);
        } else {
            console.log(measurement);
            res.redirect("/measurements");
        }
    });
});

// NEW ROUTE
router.get("/new", function(req, res) {
    res.render("measurements/new");
});

module.exports = router;