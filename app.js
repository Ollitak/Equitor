const express = require("express");
const analysesRouter = require("./controllers/analyses");
const usersRouter = require("./controllers/users");
const loginRouter = require("./controllers/login");
const commentRouter = require("./controllers/comments");
const stockPriceRouter = require("./controllers/stockPrice");
const middleware = require("./utils/middleware");
const config = require("./utils/config.js");
const mongoose = require("mongoose");
const fallback = require("express-history-api-fallback");

const app = express();

console.log(`connecting to ${config.MONGODB_URI}`);
mongoose.connect(config.MONGODB_URI);

app.use(express.static("build"));

app.use(express.json());
app.use(middleware.tokenExtractor);

app.use("/api/login", loginRouter);
app.use("/api/analyses", analysesRouter);
app.use("/api/users", usersRouter);
app.use("/api/comment", commentRouter);
app.use("/api/stockdata", stockPriceRouter);

// Fallback to index.html in case of undefined route
app.use(fallback("index.html", { root: "build" }));

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
