import axios from "axios";
import { token } from "./analyses";

const BASE_URL = "/api/messages";

/** Make POST call to post a new chta message.
 *  API endpoint requires a token to be added within headers.
 */

const newMessage = async (receiverId, content) => {
  const config = { headers: { Authorization: token } };
  const response = await axios.post(`${BASE_URL}`, { receiverId, content }, config);
  return response.data;
};

const exportObject = {
  newMessage
};

export default exportObject;
