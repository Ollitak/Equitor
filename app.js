const express = require("express");
const analysesRouter = require("./controllers/analyses");
const middleware = require("./utils/middleware"); 

const app = express();

app.use(express.json());
app.use("/analyses", analysesRouter);

app.use(middleware.unknownEndpoint);

module.exports = app;