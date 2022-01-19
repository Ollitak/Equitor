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

export default {
  getAnalyses,
  setToken
};