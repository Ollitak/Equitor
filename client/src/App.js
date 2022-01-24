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


import "./App.css";

const App = () => {
  const dispatch = useDispatch();

  /* fetch all analyses on first launch */
  useEffect(async () => {
    dispatch(initializeAnalyses());
  }, []);

  /* if user is found from local storage, save the user to redux store */
  useEffect(() => {
    const loggedUserJson = window.localStorage.getItem("loggedUser");
    if(loggedUserJson) {
      dispatch(initializeUser(loggedUserJson));
    }
  }, []);

  return (
    <Router>
      <TopSection />
      <Switch>
        <Route path="/feed">
          <Feed />
        </Route>
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
          <HomePage />
        </Route>
      </Switch>
    </Router>
  );
};


export default App;
