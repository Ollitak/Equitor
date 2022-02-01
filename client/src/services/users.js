import axios from "axios";
import { token } from "./analyses";

const BASE_URL = "/api/users";

const createUser = async (userDetails) => {
  const analyses = await axios.post(BASE_URL, userDetails);
  return analyses.data;
};

const findMyAccount = async () => {
  const config = { headers: { Authorization: token } };
  const user = await axios.get(`${BASE_URL}/myAccount`, config);
  return user.data;
};

const updateMyAccount = async (userDetails) => {
  const config = { headers: { Authorization: token } };
  const updatedUser = await axios.put(`${BASE_URL}/myAccount`, userDetails, config);
  return updatedUser.data;
};

const exportObject = {
  createUser,
  findMyAccount,
  updateMyAccount
};

export default exportObject;
