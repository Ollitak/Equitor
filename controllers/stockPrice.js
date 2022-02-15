const stockPriceRouter = require("express").Router();
const config = require("../utils/config.js");
const axios = require("axios");

/* See Yahoo Finance API documentation for more information on api usage. */
const SEARCH_RANGE = "1y";
const SEARCH_INTERVAL = "1wk";
const API_KEY = config.YAHOO_FINANCE_API_KEY;

stockPriceRouter.get("/:ticker", async (req, res, next) => {
  const ticker = req.params.ticker;
  const API_URL = `https://yfapi.net/v8/finance/chart/${ticker}?range=${SEARCH_RANGE}&interval=${SEARCH_INTERVAL}`;

  const config = { headers: { "x-api-key": API_KEY } };
  try {
    const axiosResponse = await axios.get(API_URL, config);
    /* If ticker does not exists, Yahoo Finance API still return 200. Lets make it so
    that in case of invalid ticker our back-end returns 401. */
    if (!axiosResponse.data.chart.result)
      return res.status(401).json({ error: "Result of Yahoo API request was null" });

    res.status(200).json(axiosResponse.data);
  } catch (e) {
    next(e);
  }
});

module.exports = stockPriceRouter;
