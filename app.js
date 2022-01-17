const express = require("express");
const analysesRouter = require("./controllers/analyses");
const usersRouter = require("./controllers/users");
const middleware = require("./utils/middleware"); 
const config = require("./utils/config.js");
const mongoose = require("mongoose");

const app = express();

console.log(`connecting to ${config.MONGODB_URI}`);
mongoose.connect(config.MONGODB_URI);


app.use(express.json());
app.use("/analyses", analysesRouter);
app.use("/users", usersRouter);


app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;