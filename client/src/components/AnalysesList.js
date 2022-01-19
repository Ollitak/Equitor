import React from "react";
import AnalyseItem from "./AnalyseItem";

const AnalysesList = ({ analyses, setAnalyses, myPage }) => {
  return(
    <div>
      {analyses.map(analysis =>
        <AnalyseItem
          key={analysis.id}
          analysis={analysis}
          analyses={analyses}
          setAnalyses={setAnalyses}
          myPage={myPage}
        />
      )}
    </div>
  );

};

export default AnalysesList;