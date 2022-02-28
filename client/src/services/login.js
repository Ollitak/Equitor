import axios from "axios";

const BASE_URL = "/api/login";

/** Make POST call by sending login details to API endpoint. */

const login = async (loginDetails) => {
  const analyses = await axios.post(BASE_URL, loginDetails);
  return analyses.data;
};

const exportObject = {
  login
};

export default exportObject;
