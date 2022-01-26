import React from "react";
import AnalyseItem from "./AnalyseItem";
import { useSelector } from "react-redux";

/* component selects all analyses from redux state and passes them to
AnalyseList component for rendering*/
const Feed = () => {
  const analyses = useSelector(state => state.analyses);

  /* myPage is used to indicate if route is set to myPage, which in this
  case is false as this component renders front page */
  return(
    <div>
      {analyses.map(analysis =>
        <AnalyseItem
          key={analysis.id}
          analysis={analysis}
          myPage={false}
        />
      )}
    </div>
  );
};

export default Feed;
