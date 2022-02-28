/** Module defines API endpoint to fetch stock price information. */

const stockPriceRouter = require("express").Router();
const config = require("../utils/config.js");
const axios = require("axios");

const SEARCH_RANGE = "1y";
const SEARCH_INTERVAL = "1wk";
const API_KEY = config.YAHOO_FINANCE_API_KEY;

/** GET endpoint to fetch stock price data based on the provided equity ticker.
 *  Uses Axios to fetch data from Yahoo Finance Endpoint.
 *
 *  !See Yahoo Finance API documentation for more information on API usage.
 */

stockPriceRouter.get("/:ticker", async (req, res, next) => {
  const ticker = req.params.ticker;
  const API_URL = `https://yfapi.net/v8/finance/chart/${ticker}?range=${SEARCH_RANGE}&interval=${SEARCH_INTERVAL}`;

  // API KEY will be passed within http headers
  const config = { headers: { "x-api-key": API_KEY } };

  try {
    const axiosResponse = await axios.get(API_URL, config);

    /** Yahoo Finance API returns 200 even if ticker does not exist.
     *  However, we want to return 200 only if Yahoo Finance API returns data (i.e. ticker is correct)
     *  Thus, in case Yahoo response does not return data, our API responses 401.
     */

    if (!axiosResponse.data.chart.result) {
      return res.status(401).json({ error: "Result of Yahoo API request was null" });
    }

    res.status(200).json(axiosResponse.data);
  } catch (e) {
    next(e);
  }
});

module.exports = stockPriceRouter;
