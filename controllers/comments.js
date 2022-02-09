const commentRouter = require("express").Router();
const Analysis = require("../models/analysis");
const middleware = require("../utils/middleware");

commentRouter.post("/:id", middleware.userExtractor, async (req, res, next) => {
  const body = req.body;
  const user = req.user;
  const analysisId = req.params.id;

  try {
    const analysis = await Analysis.findById(analysisId);

    analysis.comments = analysis.comments.concat({
      ...body,
      user: user._id
    });

    await analysis.save();

    /* Analysis needs to be retreived again in order to populate it */
    const savedAnalysis = await Analysis.findById(analysisId)
      .populate("comments.user", "name username id")
      .populate("user", "name username id");

    res.status(201).json(savedAnalysis);
  } catch (e) {
    next(e);
  }
});

module.exports = commentRouter;
