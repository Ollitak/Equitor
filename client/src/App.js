import React, { useState, useEffect } from "react";
import analysesService from "./services/analyses";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import FrontPage from "./components/FrontPage";
import LoginForm from "./components/LoginForm";
import AnalysisForm from "./components/AnalysisForm";
import MyAnalyses from "./components/MyAnalyses";
import SingleAnalysisView from "./components/SingleAnalysisView";

import "./App.css";

const App = () => {
  const [analyses, setAnalyses] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(async() => {
    const result = await analysesService.getAnalyses();
    setAnalyses(result);
  }, []);

  useEffect(() => {
    const loggedUserJson = window.localStorage.getItem("loggedUser");
    if(loggedUserJson) {
      const loggedUser = JSON.parse(loggedUserJson);
      setUser(loggedUser);
      analysesService.setToken(loggedUser.token);
    }
  }, []);

  return (
    <Router>
      <Switch>
        <Route path="/create-analysis">
          <AnalysisForm
            analyses={analyses}
            setAnalyses={setAnalyses}
          />
        </Route>
        <Route path="/login">
          <LoginForm
            setUser={setUser}
          />
        </Route>
        <Route path="/my-analyses">
          <MyAnalyses
            user={user}
            analyses={analyses}
            setAnalyses={setAnalyses}
          />
        </Route>
        <Route path="/analysis/:id">
          <SingleAnalysisView
            analyses={analyses}
          />
        </Route>
        <Route path="/">
          <FrontPage
            analyses={analyses}
            setAnalyses={setAnalyses}
            user={user}
            setUser={setUser}
          />
        </Route>
      </Switch>
    </Router>
  );
};


export default App;
