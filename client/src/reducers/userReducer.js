import analysesService from "../services/analyses";

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
export const login = (user) => {
  window.localStorage.setItem("loggedUser", JSON.stringify(user));
  analysesService.setToken(user.token);
  return { type: "LOGIN", user: user };
};

/* used in useEffect on app launch to set user information from local
storage to application's state. */
export const initializeUser = (userJson) => {
  const user = JSON.parse(userJson);
  analysesService.setToken(user.token);
  return { type: "LOGIN", user: user };
};

/* used on log out to reset localstorage, redux user state and token*/
export const logout = () => {
  analysesService.setToken(null);
  window.localStorage.clear();
  return { type: "LOGOUT" };
};


export default reducer;

