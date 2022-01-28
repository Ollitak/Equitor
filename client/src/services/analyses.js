import axios from "axios";
const BASE_URL = "/analyses";

let token = null;

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

const newComment = async (id, comment) => {
  const config = { headers: { Authorization: token } };
  const response = await axios.post(`${BASE_URL}/${id}/comment`, comment, config);
  return response.data;
};

const exportObject = {
  getAnalyses,
  create,
  deleteAnalyse,
  newComment,
  setToken
};

export default exportObject;
