var mongoose = require("mongoose");

var CommentSchema = mongoose.Schema({
    text: String,
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

module.exports = mongoose.model("Comment", CommentSchema);