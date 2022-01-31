
const commentRouter = require("express").Router();
const Analysis = require("../models/analysis");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const config = require("../utils/config");


commentRouter.post("/:id", async (req, res, next) => {
    const body = req.body;
    /* Parse analysis id from the url */
    const analysisId = req.params.id;

    try {
        /* Parse user information from the token */
        const decodedToken = jwt.verify(req.token, config.SECRET);

        if(!decodedToken.id) {
            return res.status(401).json({ error: "missing or invalid token"});
        }

        const user = await User.findById(decodedToken.id);
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
    } catch(e) {
        next(e);
    }
});

module.exports = commentRouter;