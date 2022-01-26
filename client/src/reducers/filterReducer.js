const initialState = {
  companyFilter: "",
  keywordFilter: ""
};

const reducer  = (state = initialState, action) => {
  switch(action.type) {
  case "SET_COMPANY_FILTER":
    return { ...state, companyFilter: action.filter };
  case "SET_KEYWORD_FILTER":
    return { ...state, keywordFilter: action.filter };
  case "RESET_FILTERS":
    return initialState;
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

export const setKeywordFilter = (filter) => {
  return {
    type: "SET_KEYWORD_FILTER",
    filter
  };
};

export const resetFilters = () => {
  return {
    type: "RESET_FILTERS"
  };
};

export default reducer;