import axios from "axios";
const BASE_URL = "/users";

const createUser = async (userDetails) => {
  const analyses = await axios.post(BASE_URL, userDetails);
  return analyses.data;
};

const exportObject = {
  createUser
};

export default exportObject;