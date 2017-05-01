var mongoose = require("mongoose");

var measurementSchema = new mongoose.Schema({
    height: Number,
    weight: Number,
    chest: Number,
    waist: Number,
    hip: Number,
    createdAt: { type: Date, default: Date.now },
    author:{
        id: {
            // Reference to a User model ID
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String
    } 
});

module.exports = mongoose.model("Measurement", measurementSchema);