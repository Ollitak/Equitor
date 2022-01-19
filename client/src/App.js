import React, { useState, useEffect } from "react";
import analysesService from "./services/analyses";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import FrontPage from "./components/FrontPage";
import LoginForm from "./components/LoginForm";
import AnalysisForm from "./components/AnalysisForm";
import "./App.css";

const App = () => {
  const [analyses, setAnalyses] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(async() => {
    const result = await analysesService.getAnalyses();
    setAnalyses(result);
  }, []);

  return (
    <Router>
      <Switch>
        <Route path="/create-analysis">
          <AnalysisForm
          />
        </Route>
        <Route path="/login">
          <LoginForm
            setUser={setUser}
          />
        </Route>
        <Route path="/">
          <FrontPage
            analyses={analyses}
            user={user}
          />
        </Route>
      </Switch>
    </Router>
  );
};


export default App;
