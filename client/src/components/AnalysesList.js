import React from "react";
import AnalyseItem from "./AnalyseItem";

const AnalysesList = ({ analyses, setAnalyses }) => {
  return(
    <div>
      {analyses.map(analysis =>
        <AnalyseItem key={analysis.id} analysis={analysis} analyses={analyses} setAnalyses={setAnalyses} />
      )}
    </div>
  );

};

export default AnalysesList;