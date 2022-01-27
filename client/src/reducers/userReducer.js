import analysesService from "../services/analyses";
import loginService from "../services/login";
import { setError, setSuccess } from "./notificationReducer";

const reducer  = (state = null, action) => {
  switch(action.type) {
  case "LOGIN":
    return action.user;
  case "LOGOUT":
    return null;
  default:
    return state;
  }
};


/* used to store user information to both local storage and redux
user store when client logs in*/
export const login = (values) => {
  return async dispatch => {
    try {
      const user = await loginService.login(values);
      window.localStorage.setItem("loggedUser", JSON.stringify(user));
      analysesService.setToken(user.token);
      dispatch( { type: "LOGIN", user: user });
      dispatch(setSuccess("Login successful, you are now logged in!"));
    } catch(e) {
      dispatch(setError("Login failed, please check your credentials."));
    }
  };
};

/* Used in useEffect on app launch to set user information from local
storage to application's state. */
export const initializeUser = (userJson) => {
  const user = JSON.parse(userJson);
  analysesService.setToken(user.token);
  return { type: "LOGIN", user: user };
};

/* Used on log out to reset localstorage, redux user state and token. */
export const logout = () => {
  return async dispatch => {
    analysesService.setToken(null);
    window.localStorage.clear();
    dispatch({ type: "LOGOUT" });
    dispatch(setSuccess("Successfully logged out!"));
  };
};

export default reducer;

