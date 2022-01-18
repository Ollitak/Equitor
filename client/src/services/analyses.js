import axios from "axios";
const baseUrl = "/analyses";

const getAnalyses = async () => {
  const analyses = await axios.get(baseUrl);
  return analyses.data;
};

export default {
  getAnalyses
};