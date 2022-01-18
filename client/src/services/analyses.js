import axios from "axios";
const baseUrl = "/analyses";

const getAnalyses = async () => {
  return await axios.get(baseUrl);
};

export default {
  getAnalyses
};