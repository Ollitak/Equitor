const mongoose = require("mongoose");

const analysisSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    stockName: {
        type: String,
        required: true
    },
    stockLogoUrl: {
        type: String
    },
    analysisDescription: {
        type: String,
        required: true
    },
    toolsUsed: [
        {
            type: String,
        }
    ],
    stockPriceEstimate: {
        type: Number
    },
    comments: [
        {
            content: String,
            rating: Number,
            user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User"
            }
        }
    ],
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
});

analysisSchema.set("toJSON", {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
    }
});

module.exports = mongoose.model("Analysis", analysisSchema);