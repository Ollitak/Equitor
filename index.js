const { response } = require("express");
const { v4: uuidv4 } = require("uuid");

const express = require("express");

const app = express();
// eslint-disable-next-line no-undef
const PORT = 3001 | process.env.PORT;


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

app.use(express.json());

app.get("/", (req, res) => {
    res.send(analyses);
});

app.get("/:id", (req, res) => {
    const id = req.params.id;
    res.json(analyses.find(analyse => analyse.id === id));
});

app.post("/", (req, res) => {
    const analysis = { ...req.body, id: uuidv4() };
    analyses = analyses.concat(analysis);
    res.json(analysis);
});



app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});