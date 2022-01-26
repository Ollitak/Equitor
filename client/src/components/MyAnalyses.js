import React from "react";
import AnalyseItem from "./AnalyseItem";
import { useSelector } from "react-redux";


const MyAnalyses = () => {
  const myAnalyses = useSelector(state => state.analyses.filter(analysis => analysis.user.id === state.user.id));

  if(!myAnalyses) return <></>;

  return (
    <div>
      {myAnalyses.map(analysis =>
        <AnalyseItem
          key={analysis.id}
          analysis={analysis}
          myPage={true}
        />
      )}
    </div>
  );

};

export default MyAnalyses;