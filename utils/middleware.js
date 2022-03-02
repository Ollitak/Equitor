/** Module all Express middlewares used in the application. */

const jwt = require("jsonwebtoken");
const config = require("../utils/config");
const User = require("../models/user");

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};

const errorHandler = (error, req, res, next) => {
  if (error.name === "ValidationError") return res.status(400).json({ error: error.message });
  else if (error.name === "CastError") return res.status(400).json({ error: "malformatted id" });
  else if (error.name === "JsonWebTokenError")
    return res.status(401).json({ error: "invalid token" });
  next(error);
};

/** Extract token from the HTTP headers and add it as a part of request. */

const tokenExtractor = (req, res, next) => {
  const authorization = req.get("authorization");
  if (authorization && authorization.toLowerCase().startsWith("bearer ")) {
    console.log("Token found");
    req.token = authorization.substring(7);
  }
  next();
};

/** Extract user information from the token and add it as a part of request. */

const userExtractor = async (req, res, next) => {
  try {
    const decodedToken = jwt.verify(req.token, config.SECRET);

    if (!decodedToken.id) {
      return res.status(401).json({ error: "missing or invalid token" });
    }

    req.user = await User.findById(decodedToken.id)
      .populate("chat.receiver", "username id")
      .populate("chat.messages.sender", "username id");
    req.userId = decodedToken.id;
    console.log("User extracted successfully");

    next();
  } catch (e) {
    next(e);
  }
};

module.exports = {
  unknownEndpoint,
  errorHandler,
  tokenExtractor,
  userExtractor
};
