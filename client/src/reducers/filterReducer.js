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

/* Used to filter feed by company name. */
export const setCompanyFilter = (filter) => {
  return {
    type: "SET_COMPANY_FILTER",
    filter
  };
};

/* Used to filter feed by keyword. */
export const setKeywordFilter = (filter) => {
  return {
    type: "SET_KEYWORD_FILTER",
    filter
  };
};

/* Used to reset all filters. */
export const resetFilters = () => {
  return {
    type: "RESET_FILTERS"
  };
};

export default reducer;