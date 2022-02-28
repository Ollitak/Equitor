const initialState = {
  success: "",
  error: ""
};

const NOTIFICATION_TIME = 4000; // Determines how long notification pop-up is visible

const reducer = (state = initialState, action) => {
  switch (action.type) {
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

/** Used to set error notification.
 *  Notification resets based on the static constant named NOTIFICATION_TIME.
 */

export const setError = (notification) => {
  return (dispatch) => {
    dispatch({ type: "SET_ERROR", notification });
    setTimeout(function () {
      dispatch({ type: "RESET_NOTIFICATIONS" });
    }, NOTIFICATION_TIME);
  };
};

/** Used to set success notification.
 *  Notification resets based on the static constant named NOTIFICATION_TIME.
 */

export const setSuccess = (notification) => {
  return (dispatch) => {
    dispatch({ type: "SET_SUCCESS", notification });
    setTimeout(function () {
      dispatch({ type: "RESET_NOTIFICATIONS" });
    }, NOTIFICATION_TIME);
  };
};

export default reducer;
