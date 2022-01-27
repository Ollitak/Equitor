const initialState = {
  success: "",
  error: ""
};

const reducer  = (state = initialState, action) => {
  switch(action.type) {
  case "SET_ERROR":
    return { ...state, error: action.notification };
  case "SET_SUCCESS":
    return { ...state, error: action.notification };
  default:
    return state;
  }
};


/* Used to set error notification. */
export const setError = (notification) => {
  return {
    type: "SET_ERROR",
    notification
  };
};

/* Used to set succesnotification. */
export const setSuccess = (notification) => {
  return {
    type: "SET_SUCCESS",
    notification
  };
};

export default reducer;