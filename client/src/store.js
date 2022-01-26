import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

import analysisReducer from "./reducers/analysisReducer";
import userReducer from "./reducers/userReducer";
import filterReducer from "./reducers/filterReducer";


const reducer = combineReducers({
  analyses: analysisReducer,
  user: userReducer,
  filter: filterReducer
});

const store = createStore(
  reducer,
  composeWithDevTools(
    applyMiddleware(thunk)
  )
);

export default store;