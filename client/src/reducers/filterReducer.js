const initialState = {
  companyFilter: ""
};

const reducer  = (state = initialState, action) => {
  switch(action.type) {
  case "SET_COMPANY_FILTER":
    return { ...state, companyFilter: action.filter };
  default:
    return state;
  }
};


export const setCompanyFilter = (filter) => {
  return {
    type: "SET_COMPANY_FILTER",
    filter
  };
};

export default reducer;