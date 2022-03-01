import usersService from "../services/users";

const reducer = (state = [], action) => {
  switch (action.type) {
    case "INIT_USERS":
      return action.data;
    default:
      return state;
  }
};

/** Used to retreive and store analyses data from the backend on app launch. */

export const initializeUsers = () => {
  return async (dispatch) => {
    const users = await usersService.getUsers();
    dispatch({ type: "INIT_USERS", data: users });
  };
};

export default reducer;
