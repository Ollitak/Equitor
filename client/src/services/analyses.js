import axios from "axios";
const baseUrl = "/analyses";

let token = null;

const setToken = newToken => {
  token = `bearer ${newToken}`;
  console.log("New token set: " + token);
};

const getAnalyses = async () => {
  const analyses = await axios.get(baseUrl);
  return analyses.data;
};

const create = async (newAnalysis) => {
  const config = { headers: { Authorization: token } };
  const response = await axios.post(baseUrl, newAnalysis, config);
  return response.data;
};

export default {
  getAnalyses,
  create,
  setToken
};