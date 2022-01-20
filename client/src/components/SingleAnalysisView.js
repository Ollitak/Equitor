import React from "react";
import { useParams } from "react-router-dom";

const SingleAnalysisView = ({ analyses }) => {
  const { id } = useParams();

  if(!analyses) return <></>;

  /* filter analysis corresponding to id in the url */
  const analysis = analyses.filter(analysis => analysis.id === id);
  console.log(analysis[0]);

  return (
    <div> ADASDASDDDD</div>
  );

};

export default SingleAnalysisView;