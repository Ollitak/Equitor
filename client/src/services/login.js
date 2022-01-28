import axios from "axios";
const BASE_URL = "/login";

const login = async (loginDetails) => {
  const analyses = await axios.post(BASE_URL, loginDetails);
  return analyses.data;
};

const exportObject = {
  login
};

export default exportObject ;