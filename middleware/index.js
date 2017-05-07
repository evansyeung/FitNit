var Measurement     =  require("../models/measurement");
var Program         =  require("../models/program");
var Comment         =  require("../models/comment");
var User            =  require("../models/user");

var middlewareObj = {};

middlewareObj.isLoggedIn = function(req, res, next) {
    if(req.isAuthenticated()) {
        return next();
    }
    req.flash("error", "You need to be logged in to do that");
    res.redirect("/login");
}

middlewareObj.checkAccountOwnership = function(req, res, next) {
    if(req.isAuthenticated()){
        User.findById(req.params.id, function(err, foundUser){
          if(err) {
            req.flash("error", "User not found");
            res.redirect("/workout-programs");
          } else {
              if(foundUser._id.equals(req.user._id)) {
                  next();
              } else {
                  req.flash("error", "You don't have permission to do that!");
                  res.redirect("/workout-programs");
              }
          }
        });
    } else {
        req.flash("error", "You need to be logged in to do that");
        res.redirect("/login");
    }
}


middlewareObj.checkMeasurementOwnership = function(req, res, next) {
    if(req.isAuthenticated()){
        Measurement.findById(req.params.id, function(err, foundMeasurement){
          if(err) {
            req.flash("error", "Measurement not found");
            res.redirect("/measurements");
          } else {
              if(foundMeasurement.author.id.equals(req.user._id)) {
                  next();
              } else {
                  req.flash("error", "You don't have permission to do that");
                  res.redirect("/workout-programs");
              }
          }
        });
    } else {
        req.flash("error", "You need to be logged in to do that");
        res.redirect("/login");
    }
}

middlewareObj.checkProgramOwnership = function(req, res, next) {
    if(req.isAuthenticated()){
        Program.findById(req.params.id, function(err, foundProgram){
          if(err) {
            req.flash("error", "Program not found");
            res.redirect("/workout-programs/" + foundProgram.cartegory);
          } else {
              if(foundProgram.author.id.equals(req.user._id)) {
                  next();
              } else {
                  req.flash("error", "You don't have permission to do that");
                  res.redirect("/workout-programs" + foundProgram.cartegory + "/" + foundProgram._id);
              }
          }
        });
    } else {
        req.flash("error", "You need to be logged in to do that");
        res.redirect("/login");
    }
}

middlewareObj.checkCommentOwnership = function(req, res, next) {
        if(req.isAuthenticated()) {
        Comment.findById(req.params.comment_id, function(err, foundComment){
            if(err) {
                req.flash("error", "Comment not found");
                res.redirect("/workout-programs");
            } else {
                if(foundComment.author.id.equals(req.user._id)) {
                    next();
                } else {
                    req.flash("error", "You don't have permission to do that");
                    res.redirect("/workout-programs");
                }
            }
        });
    } else {
        req.flash("error", "You need to be logged in to do that");
        res.redirect("/login");
    }
}

module.exports = middlewareObj;