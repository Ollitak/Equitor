const http = require("http");
const app = require("./app.js");

const server = http.createServer(app);


// eslint-disable-next-line no-undef
const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});