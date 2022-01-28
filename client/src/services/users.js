import axios from "axios";
const baseUrl = "/users";

const createUser = async (userDetails) => {
  const analyses = await axios.post(baseUrl, userDetails);
  return analyses.data;
};

const exportObject = {
  createUser
};

export default exportObject;