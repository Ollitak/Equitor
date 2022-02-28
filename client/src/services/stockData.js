import axios from "axios";

const BASE_URL = "/api/stockdata";

/** Make GET call to fetch stock price information based on the ticker parameter. */

const getStockData = async (ticker) => {
  const request = axios.get(`${BASE_URL}/${ticker}`);
  return request.then((response) => response.data);
};

const exportObject = {
  getStockData
};

export default exportObject;
