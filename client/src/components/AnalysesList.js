import React from "react";
import AnalyseItem from "./AnalyseItem";

/* utility component to pass individual analysis and myPage (true if route
is set to my-page) to AnalyseItem component to render each analysis*/
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