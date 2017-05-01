var express         = require("express"),
    app             = express(),
    bodyParser      = require("body-parser"),
    mongoose        = require("mongoose"),
    flash           = require("connect-flash"),
    passport        = require("passport"),
    LocalStrategy   = require("passport-local"),
    methodOverride  = require("method-override"),
    User            = require("./models/user");

var indexRoutes     = require("./routes/index"),
    accountRoutes    = require("./routes/accounts");

mongoose.connect("mongodb://localhost/fitnit");

app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride("_method"));
app.use(flash());
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.locals.moment = require('moment');

app.use(indexRoutes);
app.use("/account", accountRoutes);

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("FitNit Server Has Started!");
});