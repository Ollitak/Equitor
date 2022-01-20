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


export const login = (user) => {
  return { type: "LOGIN", user: user };
};

export const logout = () => {
  return { type: "LOGOUT" };
};


export default reducer;

