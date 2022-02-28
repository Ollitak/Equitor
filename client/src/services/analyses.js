import axios from "axios";

const BASE_URL = "/api/analyses";
export let token = null;

const setToken = (newToken) => {
  token = `bearer ${newToken}`;
  console.log("New token set: " + token);
};

/** Make GET call to retreive all analyses. */

const getAnalyses = async () => {
  const analyses = await axios.get(BASE_URL);
  return analyses.data;
};

/** Make POST call to save a new analysis to the database.
 *  API endpoint requires a token to be added within headers.
 */

const create = async (newAnalysis) => {
  const config = { headers: { Authorization: token } };
  const response = await axios.post(BASE_URL, newAnalysis, config);
  return response.data;
};

/** Make DELETE call to delete analysis from the database.
 *  API endpoint requires a token to be added within headers.
 */

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
