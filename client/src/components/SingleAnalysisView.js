import React from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

const SingleAnalysisView = () => {
  const { id } = useParams();

  /* retreive analysis that corresponds the id in url path */
  const analysisListForm = useSelector(state =>
    state.analyses.filter(a => a.id === id)
  );
  const analysis = analysisListForm[0];

  console.log(analysis);

  return (
    <div> ADASDASDDDD</div>
  );

};

export default SingleAnalysisView;