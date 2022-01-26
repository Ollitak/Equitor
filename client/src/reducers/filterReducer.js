const initialState = {
  companyFilter: ""
};

const reducer  = (state = initialState, action) => {
  switch(action.type) {
  case "SET_COMPANY_FILTER":
    return { companyFilter: action.filter, ...state };
  default:
    return state;
  }
};


export const changeCompanyFilter = (filter) => {
  return {
    type: "SET_COMPANY_FILTER",
    filter
  };
} ;

export default reducer;