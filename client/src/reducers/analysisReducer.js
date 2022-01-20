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

export const initializeAnalyses = (analyses) => {
  return { type: "INIT", data: analyses };
};

export const deleteAnalysis = (id) => {
  return { type: "DELETE", data: id };
};

export const addAnalysis = (analysis) => {
  return { type: "ADD", data: analysis };
};

export default reducer;

