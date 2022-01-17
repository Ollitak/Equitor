const analysisRouter = require("express").Router();
const Analysis = require("../models/analysis");

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
    const analysis = new Analysis(req.body);
    try {
        const response = await analysis.save();
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