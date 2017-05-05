var mongoose = require("mongoose");

var programSchema = new mongoose.Schema({
    name: String,
    cartegory: String,
    createdAt: { type: Date, default: Date.now },
    description: String,
    text: String,
    author:{
        id: {
            // Reference to a User model ID
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String
    } 
});

module.exports = mongoose.model("Program", programSchema);