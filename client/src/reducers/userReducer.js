import analysesService from "../services/analyses";
import usersService from "../services/users";
import loginService from "../services/login";
import { setError, setSuccess } from "./notificationReducer";

const reducer = (state = null, action) => {
  switch (action.type) {
    case "LOGIN":
      return action.user;
    case "UPDATE_USER":
      return action.user;
    case "LOGOUT":
      return null;
    default:
      return state;
  }
};

/* On login, token is stored in both local storage and token variable in analyses service.
Also, user information is fetched from my-account endpoint and stored in redux store. */
export const login = (values) => {
  return async (dispatch) => {
    try {
      const { token } = await loginService.login(values);
      analysesService.setToken(token);
      window.localStorage.setItem("loggedUser", JSON.stringify(token));

      const user = await usersService.findMyAccount();
      dispatch({ type: "LOGIN", user: user });

      dispatch(setSuccess("Login successful, you are now logged in!"));
    } catch (e) {
      dispatch(setError("Login failed, please check your credentials."));
    }
  };
};

/* Used in useEffect on application launch to set token from local storage to analyses service variable.
Also, user information is fetched from my-account endpoint and stored in redux store. */
export const initializeUser = (userJson) => {
  return async (dispatch) => {
    try {
      const token = JSON.parse(userJson);
      analysesService.setToken(token);

      const user = await usersService.findMyAccount();
      dispatch({ type: "LOGIN", user: user });
    } catch (e) {
      dispatch(setError("Login failed, please check your credentials."));
    }
  };
};

/* Used to update user information; updated information is stored in redux store. Notice that
user update does NOT change token and thus token does not need to be manipulated.  */
export const updateUser = (values) => {
  return async (dispatch) => {
    try {
      const user = await usersService.updateMyAccount(values);
      dispatch({ type: "UPDATE_USER", user: user });
      dispatch(setSuccess("User update successful!"));
    } catch (e) {
      dispatch(setError("User update failed."));
    }
  };
};

/* Used on log out to reset localstorage, redux user state and token in analyses service. */
export const logout = () => {
  return async (dispatch) => {
    analysesService.setToken(null);
    window.localStorage.clear();
    dispatch({ type: "LOGOUT" });
    dispatch(setSuccess("Successfully logged out!"));
  };
};

export default reducer;
