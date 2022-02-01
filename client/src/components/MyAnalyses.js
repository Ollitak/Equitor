import React from "react";
import FeedItem from "./FeedItem";
import { useSelector } from "react-redux";
import prepareAnalyses from "../utilities/prepareAnalyses";

/* Component to render logged user's analyses. */
const MyAnalyses = () => {
  /* Retreiving user is asyncronous, thus on page refrest state.user can be null */
  var myAnalyses = useSelector((state) => {
    if (!state.user) return null;
    return state.analyses.filter((analysis) => analysis.user.id === state.user.id);
  });

  if (!myAnalyses) return null;

  /* Extend analysis objects' fields to include how many hours ago it was posted and average
  rating. */
  myAnalyses = prepareAnalyses(myAnalyses);

  return (
    <div>
      {myAnalyses.map((analysis) => (
        <FeedItem key={analysis.id} analysis={analysis} myPage={true} />
      ))}
    </div>
  );
};

export default MyAnalyses;
