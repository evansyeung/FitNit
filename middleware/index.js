var Measurement     =  require("../models/measurement");
var Program     =  require("../models/program");
var User            =  require("../models/user");

var middlewareObj = {};

middlewareObj.isLoggedIn = function(req, res, next) {
    if(req.isAuthenticated()) {
        return next();
    }
    req.flash("error", "You need to be logged in to do that");
    res.redirect("/login");
}


middlewareObj.checkMeasurementOwnership = function(req, res, next) {
    if(req.isAuthenticated()){
        Measurement.findById(req.params.id, function(err, foundMeasurement){
          if(err) {
            req.flash("error", "Measurement not found");
            res.redirect("back");
          } else {
              if(foundMeasurement.author.id.equals(req.user._id)) {
                  next();
              } else {
                  req.flash("error", "You don't have permission to do that");
                  res.redirect("back");
              }
          }
        });
    } else {
        req.flash("error", "You need to be logged in to do that");
        res.redirect("back");
    }
}

middlewareObj.checkProgramOwnership = function(req, res, next) {
    if(req.isAuthenticated()){
        Program.findById(req.params.id, function(err, foundProgram){
          if(err) {
            req.flash("error", "Program not found");
            res.redirect("back");
          } else {
              if(foundProgram.author.id.equals(req.user._id)) {
                  next();
              } else {
                  req.flash("error", "You don't have permission to do that");
                  res.redirect("back");
              }
          }
        });
    } else {
        req.flash("error", "You need to be logged in to do that");
        res.redirect("back");
    }
}

module.exports = middlewareObj;