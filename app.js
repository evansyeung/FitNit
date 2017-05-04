var express         = require("express"),
    app             = express(),
    bodyParser      = require("body-parser"),
    mongoose        = require("mongoose"),
    flash           = require("connect-flash"),
    passport        = require("passport"),
    LocalStrategy   = require("passport-local"),
    methodOverride  = require("method-override"),
    Measurement      = require("./models/measurement"),
    User            = require("./models/user");

var indexRoutes             = require("./routes/index"),
    measurementRoutes       = require("./routes/measurements"),
    workOutRoutes           = require("./routes/programs");

mongoose.connect("mongodb://localhost/fitnit");

app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride("_method"));
app.use(flash());
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.locals.moment = require('moment');

// PASSPORT CONFIGURATION
app.use(require("express-session")({
    secret: "Once again Rusty wins cutest dog!",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Every single route we run this middleware function
app.use(function(req, res, next) {
    // Whatever we put in res.locals is what is available in our template
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    // Need this to move onto next function
    next();
});

// ROUTES files
app.use(indexRoutes);
app.use("/measurements", measurementRoutes);
app.use("/workout-programs", workOutRoutes);

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("FitNit Server Has Started!");
});