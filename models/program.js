var mongoose = require("mongoose");

var programSchema = new mongoose.Schema({
    name: String,
    cartegory: String,
    createdAt: { type: Date, default: Date.now },
    description: String,
    exercises: [String],
    sets: [Number],
    reps: [String],
    comments: [
      {
         // Reference to a Comment Model ID
         type: mongoose.Schema.Types.ObjectId,
         ref: "Comment"
      }
    ],
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