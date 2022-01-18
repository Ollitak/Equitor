import React from "react";
import AnalyseItem from "./AnalyseItem";

const AnalysesList = ({ analyses }) => {
  return(
    <div>
      {analyses.map(analysis =>
        <AnalyseItem key={analysis.id} analysis={analysis} />
      )}
    </div>
  );

};

export default AnalysesList;