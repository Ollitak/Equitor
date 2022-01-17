const http = require("http");
const app = require("./app.js");

const server = http.createServer(app);


const PORT = 3001 | process.env.PORT;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});