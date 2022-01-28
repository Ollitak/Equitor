import React, { useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import HomePage from "./components/HomePage";
import LoginForm from "./components/LoginForm";
import AnalysisForm from "./components/AnalysisForm";
import MyAnalyses from "./components/MyAnalyses";
import Feed from "./components/Feed";
import SingleAnalysisView from "./components/SingleAnalysisView";
import { initializeAnalyses } from "./reducers/analysisReducer";
import { initializeUser } from "./reducers/userReducer";
import { useDispatch } from "react-redux";
import TopSection from "./components/TopSection";
import CreateAccountForm from "./components/CreateAccountForm";
import Notification from "./components/Notification";

import "./App.css";

const App = () => {
  const dispatch = useDispatch();

  /* Fetch all analyses on first launch. */
  useEffect(() => {
    dispatch(initializeAnalyses());
  }, [dispatch]);

  /* If user is found from local storage, save the user to redux store */
  useEffect(() => {
    const loggedUserJson = window.localStorage.getItem("loggedUser");
    if (loggedUserJson) {
      dispatch(initializeUser(loggedUserJson));
    }
  }, [dispatch]);

  return (
    <Router>
      <TopSection />
      <Notification />
      <Switch>
        <Route path="/feed" component={Feed} />
        <Route path="/create-analysis" component={AnalysisForm} />
        <Route path="/create-account" component={CreateAccountForm} />
        <Route path="/login" component={LoginForm} />
        <Route path="/my-analyses" component={MyAnalyses} />
        <Route path="/analysis/:id" component={SingleAnalysisView} />
        <Route path="/" component={HomePage} />
      </Switch>
    </Router>
  );
};

export default App;
