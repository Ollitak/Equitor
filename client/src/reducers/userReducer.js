import analysesService from "../services/analyses";
import usersService from "../services/users";
import messageService from "../services/messages";
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

/** Handles user login logic:
 *  1) Uses login API endpoint to send user information and fetches the token from the API response
 *  2) Token is stored in both local storage and token variable in analyses service
 *  3) User information is fetched from my-account endpoint based on the token and stored in redux store
 */

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

/** Function is used in useEffect on application launch:
 *  1) Set token from the local storage to token variable in analyses service
 *  3) User information is fetched from my-account endpoint based on the token and stored in redux store
 */

export const initializeUser = (userJson) => {
  return async (dispatch) => {
    try {
      const token = JSON.parse(userJson);
      analysesService.setToken(token);

      const user = await usersService.findMyAccount();
      dispatch({ type: "LOGIN", user: user });
    } catch (e) {
      dispatch(setError("User initialization failed"));
    }
  };
};

/** Used to update user information and store the updated information in redux store.
 *  Notice that user update does NOT change token and thus token does not need to be manipulated.
 */

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

/** Used to add new message to the database and then update user information with that added message.
 *  Notice that user update does NOT change token and thus token does not need to be manipulated.
 */

export const addMessage = (receiverId, content) => {
  return async (dispatch) => {
    try {
      const updatedUser = await messageService.newMessage(receiverId, content);
      dispatch({ type: "UPDATE_USER", user: updatedUser });
    } catch (e) {
      dispatch(setError("Error in sending a message"));
    }
  };
};

/** Used on log out. Resets localstorage, redux user state and token in analyses service. */
export const logout = () => {
  return async (dispatch) => {
    analysesService.setToken(null);
    window.localStorage.clear();
    dispatch({ type: "LOGOUT" });
    dispatch(setSuccess("Successfully logged out!"));
  };
};

export default reducer;
