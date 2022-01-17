const mongoose = require("mongoose");

const analysisSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    imageURL: {
        type: String
    }
});

module.exports = mongoose.model("Analysis", analysisSchema);