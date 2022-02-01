import React from "react";
import FeedItem from "./FeedItem";
import { useSelector } from "react-redux";

/* Component to render logged user's analyses. */
const MyAnalyses = () => {
  var myAnalyses = useSelector((state) => {
    /* Retreiving user is asyncronous, thus on page refrest state.user can be null */
    if (!state.user) return null;

    return state.analyses.filter((analysis) => analysis.user.id === state.user.id);
  });

  if (!myAnalyses) return null;

  return (
    <div>
      {myAnalyses.map((analysis) => (
        <FeedItem key={analysis.id} analysis={analysis} myPage={true} />
      ))}
    </div>
  );
};

export default MyAnalyses;
