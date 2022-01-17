const analysisRouter = require("express").Router();
const { v4: uuidv4 } = require("uuid");

let analyses = [
    {
        id: "asd123",
        name: "Kalle",
        username: "K123",
        passwordHash: "ad(/SA(FYSIDHUGFG/&S&FD(/SYDHFN",
        ownAnalyses: ["ID1", "ID2", "ID3", "ID4"]
    },
    {
        id: "asd1234",
        name: "Seppo",
        username: "Sepo",
        passwordHash: "ad(/SA(FYSIDHUGFG/&S&FD(/SYDHFN",
        ownAnalyses: ["ID1", "ID2", "ID3", "ID4"]
    },
    {
        id: "asd12345",
        name: "Jaakko",
        username: "JJJ",
        passwordHash: "ad(/SA(FYSIDHUGFG/&S&FD(/SYDHFN",
        ownAnalyses: ["ID1", "ID2", "ID3", "ID4"]
    }
];


analysisRouter.get("/", (req, res) => {
    res.send(analyses);
});

analysisRouter.get("/:id", (req, res) => {
    const id = req.params.id;
    res.json(analyses.find(analyse => analyse.id === id));
});

analysisRouter.post("/", (req, res) => {
    const analysis = { ...req.body, id: uuidv4() };
    analyses = analyses.concat(analysis);
    res.json(analysis);
});

module.exports = analysisRouter;