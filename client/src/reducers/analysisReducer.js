import analysesService from "../services/analyses";
import commentService from "../services/comment";
import { setError, setSuccess } from "./notificationReducer";

const reducer = (state = [], action) => {
  switch (action.type) {
    case "INIT":
      return action.data;
    case "ADD":
      return state.concat(action.data);
    case "UPDATE":
      // eslint-disable-next-line no-case-declarations
      const updatedState = state.filter((analysis) => analysis.id !== action.data.id);
      return updatedState.concat(action.data);
    case "DELETE":
      return state.filter((analysis) => analysis.id !== action.id);
    default:
      return state;
  }
};

/* Used to retreive and store analyses data from the backend on
app launch. */
export const initializeAnalyses = () => {
  return async (dispatch) => {
    const analyses = await analysesService.getAnalyses();
    dispatch({ type: "INIT", data: analyses });
  };
};

/* Used to delete analysis from backend and from store. */
export const deleteAnalysis = (id) => {
  return async (dispatch) => {
    try {
      await analysesService.deleteAnalyse(id);
      dispatch({ type: "DELETE", id: id });
      dispatch(setSuccess("Analysis deleted succesfully!"));
    } catch (e) {
      dispatch(setError(e.response.data));
    }
  };
};

/* Used to store analysis to backend and to store. */
export const addAnalysis = (values) => {
  return async (dispatch) => {
    try {
      const analysis = await analysesService.create(values);
      dispatch({ type: "ADD", data: analysis });
      dispatch(setSuccess("Analysis added succesfully!"));
    } catch (e) {
      dispatch(setError(e.response.data));
    }
  };
};

/* Used to add new comment to an analysis - backend responds with an
updated analysis that is then saved to the store. */
export const addComment = (id, values) => {
  return async (dispatch) => {
    try {
      const analysis = await commentService.newComment(id, values);
      dispatch({ type: "UPDATE", data: analysis });
      dispatch(setSuccess("Comment added succesfully!"));
    } catch (e) {
      console.log(e.response.data);
      dispatch(setError(e.response.data));
    }
  };
};

export default reducer;
