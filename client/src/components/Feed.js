import React from "react";
import AnalyseItem from "./AnalyseItem";
import FilterBar from "./FilterBar";
import { useSelector } from "react-redux";


const Feed = () => {
  var analyses = useSelector(state => state.analyses);

  const filter = useSelector(state => state.filter);

  if(filter.companyFilter) {
    analyses = analyses.filter(analysis =>
      analysis.stockInformation.name === filter.companyFilter
    );
  }

  if(filter.keywordFilter) {
    analyses = analyses.filter(analysis =>
      analysis.keyWords.includes(filter.keywordFilter)
    );
  }

  return(
    <div>
      <FilterBar />
      {analyses.map(analysis =>
        <AnalyseItem
          key={analysis.id}
          analysis={analysis}
        />
      )}
    </div>
  );
};

export default Feed;
