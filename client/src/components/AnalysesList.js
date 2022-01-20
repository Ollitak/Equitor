import React from "react";
import AnalyseItem from "./AnalyseItem";

const AnalysesList = ({ analyses, myPage }) => {

  return(
    <div>
      {analyses.map(analysis =>
        <AnalyseItem
          key={analysis.id}
          analysis={analysis}
          myPage={myPage}
        />
      )}
    </div>
  );

};

export default AnalysesList;