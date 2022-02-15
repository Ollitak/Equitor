import axios from "axios";

const BASE_URL = "/api/stockdata";

const getStockData = async (ticker) => {
  const request = axios.get(`${BASE_URL}/${ticker}`);
  return request.then((response) => response.data);
};

const exportObject = {
  getStockData
};

export default exportObject;
