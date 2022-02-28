const config = require("./utils/config.js");

/**Ensure that correct environment variables are passed before launching the express app. */

if (!config.MONGODB_URI || !config.SECRET || !config.YAHOO_FINANCE_API_KEY) {
  console.log("Please provide valid environment variables. Check README.md for more information.");
} else {
  /**Create express server and run it in the given TCP port (defaults to 3001). */

  const http = require("http");
  const app = require("./app.js");

  const server = http.createServer(app);

  // eslint-disable-next-line no-undef
  const PORT = process.env.PORT || 3001;
  server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}
