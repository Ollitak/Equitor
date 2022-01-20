import analysesService from "../services/analyses";

const reducer  = (state = [], action) => {
  switch(action.type) {
  case "INIT":
    return action.data;
  case "ADD":
    return state.concat(action.data);
  case "DELETE":
    return state.filter(analysis => analysis.id !== action.data);
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
      dispatch({ type: "DELETE", data: id });
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

export default reducer;

