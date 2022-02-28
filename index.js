const config = require("./utils/config.js");

/** Before launching the express app, ensure that the correct environment variables are passed. */

if (!config.MONGODB_URI || !config.SECRET || !config.YAHOO_FINANCE_API_KEY) {
  console.log("Please provide valid environment variables. Check README.md for more information.");
} else {
  const http = require("http");
  const app = require("./app.js");

  const server = http.createServer(app);

  // eslint-disable-next-line no-undef
  const PORT = process.env.PORT || 3001;
  server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}
