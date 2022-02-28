import React from "react";
import FeedItem from "../FeedItem";
import Filter from "./Filter";
import { useSelector } from "react-redux";
import prepareAnalyses from "../../utilities/prepareAnalyses";
import "./styles/feed.css";

/** Component that renders analysis feed. It retreives analyses and filters from the Redux store
 *  and applies the filters to the analyses. Then, it renders Filter component and Feed
 *  component.
 */

const Feed = () => {
  var analyses = useSelector((state) => state.analyses);
  const filters = useSelector((state) => state.filter);

  // Apply filters to analyses
  analyses = prepareAnalyses(analyses, filters);

  return (
    <div className="feed">
      <div className="feed-wrapper">
        <Filter />
        <div className="feed-items">
          {analyses.map((analysis) => (
            <FeedItem key={analysis.id} analysis={analysis} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Feed;
