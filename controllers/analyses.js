const analysisRouter = require("express").Router();
const Analysis = require("../models/analysis");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const config = require("../utils/config");

analysisRouter.get("/", async (req, res) => {
    const analyses = await Analysis.find({})
        .populate("comments.user", "name username id")
        .populate("user", "name username id");
        
    res.status(200).json(analyses);
});

analysisRouter.get("/:id", async (req, res, next) => {
    const id = req.params.id;
    try {
        const response =  await Analysis.findById(id);
        res.status(200).json(response);
    } catch(e) {
        next(e);
    }
});

analysisRouter.post("/", async (req, res, next) => {
    const body = req.body;

    try {
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

        /* add the saved analysis for corresponding user */
        user.analyses = user.analyses.concat(response._id);
        await user.save();

        /* Analysis needs to be retreived again in order to populate it */
        const savedAnalysis = await Analysis.findById(response._id)
            .populate("comments.user", "name username id")
            .populate("user", "name username id");

        res.status(201).json(savedAnalysis);
    } catch(e) {
        next(e);
    }
});


analysisRouter.post("/:id/comment", async (req, res, next) => {
    const body = req.body;
    const id = req.params.id;

    try {
        const decodedToken = jwt.verify(req.token, config.SECRET);

        if(!decodedToken.id) {
            return res.status(401).json({ error: "missing or invalid token"});
        }

        const user = await User.findById(decodedToken.id);
        const analysis = await Analysis.findById(id);

        analysis.comments = analysis.comments.concat({
            ...body,
            user: user._id
        });
    
        await analysis.save();

        /* Analysis needs to be retreived again in order to populate it */
        const savedAnalysis = await Analysis.findById(id)
            .populate("comments.user", "name username id")
            .populate("user", "name username id");

        res.status(201).json(savedAnalysis);
    } catch(e) {
        next(e);
    }
});


analysisRouter.delete("/:id", async (req, res, next) => {
    const id = req.params.id;
    try {
        await Analysis.findByIdAndRemove(id);
        res.status(204).end(); 
    } catch(e) {
        next(e);
    }
});



module.exports = analysisRouter;