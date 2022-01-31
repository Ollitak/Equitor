import axios from "axios";
const BASE_URL_ANALYSES = "/analyses";
const BASE_URL_COMMENT = "/comment";

let token = null;

const setToken = (newToken) => {
  token = `bearer ${newToken}`;
  console.log("New token set: " + token);
};

const getAnalyses = async () => {
  const analyses = await axios.get(BASE_URL_ANALYSES);
  return analyses.data;
};

const create = async (newAnalysis) => {
  const config = { headers: { Authorization: token } };
  const response = await axios.post(BASE_URL_ANALYSES, newAnalysis, config);
  return response.data;
};

const deleteAnalyse = async (id) => {
  const config = { headers: { Authorization: token } };
  const response = await axios.delete(`${BASE_URL_ANALYSES}/${id}`, config);
  return response.data;
};

const newComment = async (id, comment) => {
  const config = { headers: { Authorization: token } };
  const response = await axios.post(`${BASE_URL_COMMENT}/${id}`, comment, config);
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
