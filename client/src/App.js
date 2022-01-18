import React, { useState, useEffect } from "react";
import analysesService from "./services/analyses";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import FrontPage from "./components/FrontPage";

const App = () => {
  const [analyses, setAnalyses] = useState(null);

  useEffect(async() => {
    const result = await analysesService.getAnalyses();
    setAnalyses(result);
  }, []);

  return (
    <Router>
      <Switch>
        <Route path="/">
          <FrontPage analyses={analyses} />
        </Route>
      </Switch>
    </Router>
  );
};


export default App;
