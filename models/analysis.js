const mongoose = require("mongoose");

const analysisSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    stockInformation: {
        name: {
            type: String,
            required: true
        },
        logoUrl: {
            type: String,
            required: true
        },
        ticker: {
            type: String,
            required: true
        }
    },
    date: {
        type: Date,
        default: Date.now
    },
    description: {
        type: String,
        required: true
    },
    keyWords: [
        {
            type: String,
        }
    ],
    targetPrice: {
        type: Number
    },
    comments: [
        {
            content: {
                type: String,
                required: true
            },
            rating: {
                type: Number,
                min: 0,
                max: 5,
                required: true
            },
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