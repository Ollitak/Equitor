import axios from "axios";

const BASE_URL = "/api/analyses";
export let token = null;

const setToken = (newToken) => {
  token = `bearer ${newToken}`;
  console.log("New token set: " + token);
};

const getAnalyses = async () => {
  const analyses = await axios.get(BASE_URL);
  return analyses.data;
};

const create = async (newAnalysis) => {
  const config = { headers: { Authorization: token } };
  const response = await axios.post(BASE_URL, newAnalysis, config);
  return response.data;
};

const deleteAnalyse = async (id) => {
  const config = { headers: { Authorization: token } };
  const response = await axios.delete(`${BASE_URL}/${id}`, config);
  return response.data;
};

const exportObject = {
  getAnalyses,
  create,
  deleteAnalyse,
  setToken
};

export default exportObject;
