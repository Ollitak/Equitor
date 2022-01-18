const analysisRouter = require("express").Router();
const Analysis = require("../models/analysis");
const User = require("../models/user");

analysisRouter.get("/", async (req, res) => {
    const analyses = await Analysis.find({});
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

    const user = await User.findById(body.userID);

    const analysis = new Analysis({
        title: body.title,
        content: body.content,
        imageURL: body.imageURL,
        user: user._id 
    });
        
    try {
        const response = await analysis.save();

        /* add the saved analysis for corresponding user */
        user.analyses = user.analyses.concat(response._id);
        await user.save();

        res.status(201).json(response);
    } catch(e) {
        next(e);
    }
});

analysisRouter.delete("/:id", async (req, res, next) => {
    const id = req.params.id;
    try {
        await Analysis.findByIdAndRemove(id);
        res.status(204).json.end(); 
    } catch(e) {
        next(e);
    }
});



module.exports = analysisRouter;