const express = require("express");
const analysesRouter = require("./controllers/analyses");

const app = express();

app.use(express.json());
app.use("/analyses", analysesRouter);


module.exports = app;