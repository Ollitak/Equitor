const analysisRouter = require("express").Router();
const Analysis = require("../models/analysis");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const config = require("../utils/config");

analysisRouter.get("/", async (req, res) => {
    const analyses = await Analysis.find({})
        .populate("comments.user", "username id")
        .populate("user", "username id");
        
    res.status(200).json(analyses);
});

/*
analysisRouter.get("/:id", async (req, res, next) => {
    const id = req.params.id;
    try {
        const response =  await Analysis.findById(id);
        res.status(200).json(response);
    } catch(e) {
        next(e);
    }
});
*/

analysisRouter.post("/", async (req, res, next) => {
    const body = req.body;

    try {
        /* Parse user information from the token. */
        const decodedToken = jwt.verify(req.token, config.SECRET);

        if(!decodedToken.id) {
            return res.status(401).json({ error: "missing or invalid token"});
        }

        const user = await User.findById(decodedToken.id);

        console.log(body);
        const analysis = new Analysis({
            ...body,
            user: user._id 
        });
        
    
        const response = await analysis.save();

        /* Add the saved analysis for corresponding user. */
        user.analyses = user.analyses.concat(response._id);
        await user.save();

        /* Analysis needs to be retreived again in order to populate it. */
        const savedAnalysis = await Analysis.findById(response._id)
            .populate("comments.user", "name username id")
            .populate("user", "name username id");

        res.status(201).json(savedAnalysis);
    } catch(e) {
        next(e);
    }
});

analysisRouter.delete("/:id", async (req, res, next) => {
    /* Parse analysis id from the url. */
    const analysisId = req.params.id;

    try {
        /* Parse user information from the token. */
        const decodedToken = jwt.verify(req.token, config.SECRET);

        if(!decodedToken.id) {
            return res.status(401).json({ error: "missing or invalid token"});
        }

        const analysis = await Analysis.findById(analysisId);
        const user = await User.findById(decodedToken.id);
        
        /* Check if user calling the API is owner of the analysis. */
        if(user._id.toString() !== analysis.user.toString()) {
            return res.status(401).json({ error: "trying to delete someone else's analysis"});
        }

        await Analysis.findByIdAndRemove(analysisId);
        
        /* Also delete analysis from user's analyses. */
        user.analyses = user.analyses.filter(a => a._id.toString() !== analysisId.toString());
        await user.save();

        res.status(204).end(); 
    } catch(e) {
        next(e);
    }
});


module.exports = analysisRouter;