var express         = require("express"),
    app             = express(),
    bodyParser      = require("body-parser"),
    mongoose        = require("mongoose"),
    flash           = require("connect-flash"),
    passport        = require("passport"),
    LocalStrategy   = require("passport-local"),
    methodOverride  = require("method-override"),
    Measurement     = require("./models/measurement"),
    Program         = require("./models/program"),
    Comment         = require("./models/comment"),
    User            = require("./models/user");

var indexRoutes             = require("./routes/index"),
    measurementRoutes       = require("./routes/measurements"),
    commentRoutes           = require("./routes/comments"),
    workOutProgramRoutes    = require("./routes/programs"),
    userRoutes              = require("./routes/users");

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
    // Whatever we put in res.locals is what is available in our templates
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    // Need this to move onto next function
    next();
});

// ROUTES files
app.use(indexRoutes);
app.use("/measurements", measurementRoutes);
app.use("/account", userRoutes);
app.use("/workout-programs", workOutProgramRoutes);
app.use("/workout-programs/:id/comments", commentRoutes);

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("FitNit Server Has Started!");
});