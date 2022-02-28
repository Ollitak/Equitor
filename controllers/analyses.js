/** Module defines API endpoints that control equity analyses. */

const analysisRouter = require("express").Router();
const Analysis = require("../models/analysis");
const middleware = require("../utils/middleware");

/** GET endpoint to fetch all equity analyses.
 *  User fields are populated with corresponding user defined in User model.
 */

analysisRouter.get("/", async (req, res) => {
  const analyses = await Analysis.find({})
    .populate("comments.user", "username id")
    .populate("user", "username id");

  res.status(200).json(analyses);
});

/** POST endpoint to save a new equity analyses to database.  */

analysisRouter.post("/", middleware.userExtractor, async (req, res, next) => {
  const body = req.body;
  const user = req.user;

  const analysis = new Analysis({
    ...body,
    user: user._id
  });

  try {
    const response = await analysis.save();

    // Add the saved analysis for corresponding user
    user.analyses = user.analyses.concat(response._id);
    await user.save();

    // Analysis needs to be retreived again in order to populate it
    const savedAnalysis = await Analysis.findById(response._id)
      .populate("comments.user", "name username id")
      .populate("user", "name username id");

    res.status(201).json(savedAnalysis);
  } catch (e) {
    next(e);
  }
});

/** DELETE endpoint to delete equity analysis based on analysis id. */

analysisRouter.delete("/:id", middleware.userExtractor, async (req, res, next) => {
  const analysisId = req.params.id;

  const user = req.user;

  try {
    const analysis = await Analysis.findById(analysisId);

    // Ensure that the user calling the API is the owner of the analysis
    if (user._id.toString() !== analysis.user.toString()) {
      return res.status(401).json({ error: "Trying to delete someone else's analysis" });
    }

    // Remove analysis from database
    await Analysis.findByIdAndRemove(analysisId);

    // Also delete analysis from user's analyses
    user.analyses = user.analyses.filter((a) => a._id.toString() !== analysisId.toString());
    await user.save();

    res.status(204).end();
  } catch (e) {
    next(e);
  }
});

module.exports = analysisRouter;
