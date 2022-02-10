import React from "react";
import FeedItem from "./FeedItem";
import { useSelector } from "react-redux";
import prepareAnalyses from "../utilities/prepareAnalyses";

/* Component to render logged user's analyses. Currently shares the .css file in Feed-component. */
const MyAnalyses = () => {
  const analyses = useSelector((state) => state.analyses);
  const user = useSelector((state) => state.user);

  if (!analyses || !user) return null;

  var myAnalyses = analyses.filter((analysis) => analysis.user.id === user.id);

  /* Extend analysis objects' fields to include how many hours ago it was posted and average
  rating. */
  myAnalyses = prepareAnalyses(myAnalyses);

  return (
    <div className="feed">
      <div className="feed-wrapper">
        <div className="feed-items">
          {myAnalyses.map((analysis) => (
            <FeedItem key={analysis.id} analysis={analysis} myPage={true} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MyAnalyses;
