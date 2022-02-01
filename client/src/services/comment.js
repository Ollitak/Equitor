import axios from "axios";
import { token } from "./analyses";

const BASE_URL = "/api/comment";

const newComment = async (id, comment) => {
  const config = { headers: { Authorization: token } };
  const response = await axios.post(`${BASE_URL}/${id}`, comment, config);
  return response.data;
};

const exportObject = {
  newComment
};

export default exportObject;
