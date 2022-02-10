import React from "react";
import FeedItem from "../FeedItem";
import Filter from "./Filter";
import { useSelector } from "react-redux";
import prepareAnalyses from "../../utilities/prepareAnalyses";
import "./styles/feed.css";

/* Component to render analysis feed. It retreives analyses and filters from the
redux store and applies the filters to the analyses. Then, it renders filter component
and analysis feed. */
const Feed = () => {
  var analyses = useSelector((state) => state.analyses);
  const filters = useSelector((state) => state.filter);

  /* Apply filters to analyses. */
  analyses = prepareAnalyses(analyses, filters);

  return (
    <div className="feed">
      <div className="feed-wrapper">
        <Filter />
        {analyses.map((analysis) => (
          <FeedItem key={analysis.id} analysis={analysis} />
        ))}
      </div>
    </div>
  );
};

export default Feed;
