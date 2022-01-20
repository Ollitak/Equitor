import React, { useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import FrontPage from "./components/FrontPage";
import LoginForm from "./components/LoginForm";
import AnalysisForm from "./components/AnalysisForm";
import MyAnalyses from "./components/MyAnalyses";
import SingleAnalysisView from "./components/SingleAnalysisView";
import { initializeAnalyses } from "./reducers/analysisReducer";
import { initializeUser } from "./reducers/userReducer";
import { useDispatch } from "react-redux";

import "./App.css";

const App = () => {
  const dispatch = useDispatch();

  useEffect(async () => {
    dispatch(initializeAnalyses());
  }, []);

  useEffect(() => {
    const loggedUserJson = window.localStorage.getItem("loggedUser");
    if(loggedUserJson) {
      dispatch(initializeUser(loggedUserJson));
    }
  }, []);

  return (
    <Router>
      <Switch>
        <Route path="/create-analysis">
          <AnalysisForm />
        </Route>
        <Route path="/login">
          <LoginForm />
        </Route>
        <Route path="/my-analyses">
          <MyAnalyses />
        </Route>
        <Route path="/analysis/:id">
          <SingleAnalysisView />
        </Route>
        <Route path="/">
          <FrontPage />
        </Route>
      </Switch>
    </Router>
  );
};


export default App;
