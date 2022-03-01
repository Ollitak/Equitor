import axios from "axios";
import { token } from "./analyses";

const BASE_URL = "/api/users";

/** Make GET call to fetch all users. */

const getUsers = async () => {
  const config = { headers: { Authorization: token } };
  const users = await axios.get(BASE_URL, config);
  return users.data;
};

/** Make POST call to create a new user based on user detais provided as function parameter. */

const createUser = async (userDetails) => {
  const analyses = await axios.post(BASE_URL, userDetails);
  return analyses.data;
};

/** Make GET call to fetch current users account based on the currently saved token. */

const findMyAccount = async () => {
  const config = { headers: { Authorization: token } };
  const user = await axios.get(`${BASE_URL}/myAccount`, config);
  return user.data;
};

/** Make PUT call to update current user's user information based on user details
 *  provided as function parameter.
 */

const updateMyAccount = async (userDetails) => {
  const config = { headers: { Authorization: token } };
  const updatedUser = await axios.put(`${BASE_URL}/myAccount`, userDetails, config);
  return updatedUser.data;
};

const exportObject = {
  getUsers,
  createUser,
  findMyAccount,
  updateMyAccount
};

export default exportObject;
