import React, { useState, useEffect } from "react";
import analysesService from "./services/analyses";

const App = () => {
  const [analyses, setAnalyses] = useState("");

  useEffect(async() => {
    const result = await analysesService.getAnalyses();
    setAnalyses(result);
  }, []);


  console.log(analyses);

  return (
    <div>
        test
    </div>  );
};


export default App;
