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

const updateUser = async (id, userDetails) => {
  const updatedUser = await axios.put(`${BASE_URL}/${id}`, userDetails);
  return updatedUser.data;
};

const exportObject = {
  createUser,
  findUser,
  updateUser
};

export default exportObject;
