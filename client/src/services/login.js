import axios from "axios";
const baseUrl = "/login";

const login = async (loginDetails) => {
  const analyses = await axios.post(baseUrl, loginDetails);
  return analyses.data;
};

const exportObject = {
  login
};

export default exportObject ;