var express = require("express");
var router = express.Router();
// var Measurement = require("../models/measurement");

var middleware = require("../middleware");

// INDEX ROUTE
router.get("/", function(req, res){
   res.render("programs/index",{ page: 'workout-programs' }) ;
});

module.exports = router;