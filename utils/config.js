/* eslint-disable no-undef */
require("dotenv").config();

const MONGODB_URI = process.env.MONGODB_URI;
const SECRET = process.env.SECRET;
const YAHOO_FINANCE_API_KEY = process.env.YAHOO_FINANCE_API_KEY;

module.exports = {
  MONGODB_URI,
  SECRET,
  YAHOO_FINANCE_API_KEY
};
