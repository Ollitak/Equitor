import React from "react";
import { useParams } from "react-router-dom";

const SingleAnalysisView = () => {
  const { id } = useParams();

  console.log("id: " + id);

  return (
    <div> ADASDASDDDD</div>
  );

};

export default SingleAnalysisView;