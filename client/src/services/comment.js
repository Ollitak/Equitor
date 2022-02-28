import axios from "axios";
import { token } from "./analyses";

const BASE_URL = "/api/comment";

/** Make POST call to post a new comment for a analysis corresponding to the parameter id.
 *  API endpoint requires a token to be added within headers.
 */

const newComment = async (id, comment) => {
  const config = { headers: { Authorization: token } };
  const response = await axios.post(`${BASE_URL}/${id}`, comment, config);
  return response.data;
};

const exportObject = {
  newComment
};

export default exportObject;
