import React from "react";
import FeedItem from "./FeedItem";
import { useSelector } from "react-redux";
import prepareAnalyses from "../utilities/prepareAnalyses";

/* Component to render logged user's analyses. */
const MyAnalyses = () => {
  var myAnalyses = useSelector(state => state.analyses.filter(analysis => analysis.user.id === state.user.id));

  /* prepareAnalyses adds fields for every analysis element indicating how many hours ago
  the analysis was posted and what is its average rating */
  myAnalyses = prepareAnalyses(myAnalyses);

  if(!myAnalyses) return <></>;

  return (
    <div>
      {myAnalyses.map(analysis =>
        <FeedItem
          key={analysis.id}
          analysis={analysis}
          myPage={true}
        />
      )}
    </div>
  );
};

export default MyAnalyses;