const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: "unknown endpoint" });
};

const errorHandler = (error, req, res, next) => {
    if(error.name === "ValidationError") return res.status(400).json({ error: error.message });
    if(error.name === "CastError") return res.status(400).json({ error: "malformatted id" });
    next(error);
};

module.exports = {
    unknownEndpoint,
    errorHandler
};