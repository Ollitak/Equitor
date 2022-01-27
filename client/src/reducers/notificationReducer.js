const initialState = {
  success: "",
  error: ""
};

const reducer  = (state = initialState, action) => {
  switch(action.type) {
  case "SET_ERROR":
    return { ...state, error: action.notification };
  case "SET_SUCCESS":
    return { ...state, success: action.notification };
  case "RESET_NOTIFICATIONS":
    return initialState;
  default:
    return state;
  }
};


/* Used to set error notification. */
export const setError = (notification) => {
  return dispatch => {
    dispatch( { type: "SET_ERROR", notification });
    setTimeout(function(){
      dispatch( { type: "RESET_NOTIFICATIONS" });
    }, 4000);
  };
};

/* Used to set succesnotification. */
export const setSuccess = (notification) => {
  return dispatch => {
    dispatch( { type: "SET_SUCCESS", notification });
    setTimeout(function(){
      dispatch( { type: "RESET_NOTIFICATIONS" });
    }, 4000);
  };
};

export default reducer;