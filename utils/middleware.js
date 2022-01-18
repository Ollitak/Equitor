const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: "unknown endpoint" });
};

const errorHandler = (error, req, res, next) => {
    if(error.name === "ValidationError") return res.status(400).json({ error: error.message });
    else if(error.name === "CastError") return res.status(400).json({ error: "malformatted id" });
    else if (error.name === "JsonWebTokenError") return res.status(401).json({ error: "invalid token" });
    next(error);
};


const tokenExtractor = (req, res, next) => {
    const authorization = req.get("authorization");
    if (authorization && authorization.toLowerCase().startsWith("bearer ")) {
        console.log("Token found");
        req.token = authorization.substring(7); 
    }
    next();
};

module.exports = {
    unknownEndpoint,
    errorHandler,
    tokenExtractor
};