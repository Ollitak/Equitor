import analysesService from "../services/analyses";
import usersService from "../services/users";
import loginService from "../services/login";
import { setError, setSuccess } from "./notificationReducer";

const reducer = (state = null, action) => {
  switch (action.type) {
    case "LOGIN":
      return action.user;
    case "UPDATE_USER":
      /* On update, token remains the same.*/
      action.user = { token: state.token, ...action.user };
      window.localStorage.setItem("loggedUser", JSON.stringify(action.user));
      console.log(action.user);
      return action.user;
    case "LOGOUT":
      return null;
    default:
      return state;
  }
};

/* Used to store user information to both local storage and redux
user store when client logs in. Login API endpoint only returns user
id and token, but as we also want to access other user information, 
function also does a get request to user API endpoint.  */
export const login = (values) => {
  return async (dispatch) => {
    try {
      const userIdAndToken = await loginService.login(values);
      analysesService.setToken(userIdAndToken.token);

      const user = await usersService.findMyAccount();
      /* Fetching user from backend does not return token => needs to be a */
      user.token = userIdAndToken.token;

      window.localStorage.setItem("loggedUser", JSON.stringify(user));

      dispatch({ type: "LOGIN", user: user });
      dispatch(setSuccess("Login successful, you are now logged in!"));
    } catch (e) {
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

/* Used to update account information via PUT endpoint. Returned user  */
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

/* Used on log out to reset localstorage, redux user state and token. */
export const logout = () => {
  return async (dispatch) => {
    analysesService.setToken(null);
    window.localStorage.clear();
    dispatch({ type: "LOGOUT" });
    dispatch(setSuccess("Successfully logged out!"));
  };
};

export default reducer;
