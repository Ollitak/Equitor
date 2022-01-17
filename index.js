const express = require("express");

const app = express();
// eslint-disable-next-line no-undef
const PORT = 3001 | process.env.PORT;


app.get("/", (req, res) => {
    res.send("test");
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});