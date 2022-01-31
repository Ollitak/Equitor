import axios from "axios";
const BASE_URL = "/users";

const createUser = async (userDetails) => {
  const analyses = await axios.post(BASE_URL, userDetails);
  return analyses.data;
};

const findUser = async (id) => {
  const user = await axios.get(`${BASE_URL}/${id}`);
  return user.data;
};

const exportObject = {
  createUser,
  findUser
};

export default exportObject;
