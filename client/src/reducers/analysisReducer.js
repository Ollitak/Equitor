import analysesService from "../services/analyses";

const reducer  = (state = [], action) => {
  switch(action.type) {
  case "INIT":
    return action.data;
  case "ADD":
    return state.concat(action.data);
  case "UPDATE":
    // eslint-disable-next-line no-case-declarations
    const updatedState = state.filter(analysis => analysis.id !== action.data.id);
    return updatedState.concat(action.data);
  case "DELETE":
    return state.filter(analysis => analysis.id !== action.id);
  default:
    return state;
  }
};

/* used to retreive and store analyses data from the backend on
app launch */
export const initializeAnalyses = () => {
  return async dispatch => {
    const analyses = await analysesService.getAnalyses();
    dispatch( { type: "INIT", data: analyses } );
  };
};

/* used to delete analysis from backend and from store */
export const deleteAnalysis = (id) => {
  return async dispatch => {
    try {
      await analysesService.deleteAnalyse(id);
      dispatch({ type: "DELETE", id: id });
    } catch(e) {
      console.log(e.response.data);
    }
  };
};

/* used to store analysis to backend and to store */
export const addAnalysis = (values) => {
  return async dispatch => {
    try {
      const analysis = await analysesService.create(values);
      dispatch({ type: "ADD", data: analysis });
    } catch(e) {
      console.log(e.response.data);
    }
  };
};

/* used to add new comment to an analysis - backend responds with an
updated analysis that is then saved to the store */
export const addComment = (id, values) => {
  return async dispatch => {
    try {
      const analysis = await analysesService.newComment(id, values);
      dispatch({ type: "UPDATE", data: analysis });
    } catch(e) {
      console.log(e.response.data);
    }
  };
};

export default reducer;

