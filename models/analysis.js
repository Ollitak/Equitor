/** Module creates Mongoose schema for equity analyses and exports corresponding Mongoose model. */

const mongoose = require("mongoose");

const analysisSchema = mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  content: {
    summary: {
      type: String,
      required: true
    },
    basicCompanyInformation: {
      type: String
    },
    businessDescription: {
      type: String
    },
    industryOverviewAndCompetitivePositioning: {
      type: String
    },
    investmentSummary: {
      type: String
    },
    financialAnalysis: {
      type: String
    },
    valuation: {
      type: String
    },
    investmentRisks: {
      type: String
    },
    ESGMatters: {
      type: String
    }
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
  keyWords: [
    {
      type: String
    }
  ],
  targetPrice: {
    type: Number
  },
  recommendation: {
    type: String,
    enum: ["BUY", "HOLD", "SELL"],
    required: true
  },
  financialForecasts: {
    revenueForecast: [
      {
        year: {
          type: String
        },
        forecast: {
          type: Number
        }
      }
    ],
    ebitForecast: [
      {
        year: {
          type: String
        },
        forecast: {
          type: Number
        }
      }
    ],
    ebitdaForecast: [
      {
        year: {
          type: String
        },
        forecast: {
          type: Number
        }
      }
    ],
    netIncomeForecast: [
      {
        year: {
          type: String
        },
        forecast: {
          type: Number
        }
      }
    ]
  },
  netIncomeForecast: [
    {
      year: {
        type: String
      },
      forecast: {
        type: Number
      }
    }
  ],
  comments: [
    {
      content: {
        type: String,
        required: true
      },
      date: {
        type: Date,
        default: Date.now
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

/** Serialization logic for MongoDB objects to JSON.
 *  Multiple id fields are deleted if they are not needed.
 */

analysisSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    returnedObject.financialForecasts.revenueForecast.forEach((f) => {
      delete f._id;
    });
    returnedObject.financialForecasts.ebitdaForecast.forEach((f) => {
      delete f._id;
    });
    returnedObject.financialForecasts.ebitForecast.forEach((f) => {
      delete f._id;
    });
    returnedObject.financialForecasts.netIncomeForecast.forEach((f) => {
      delete f._id;
    });
    returnedObject.comments.forEach((c) => {
      delete c._id;
    });
    delete returnedObject._id;
    delete returnedObject.__v;
  }
});

module.exports = mongoose.model("Analysis", analysisSchema);
