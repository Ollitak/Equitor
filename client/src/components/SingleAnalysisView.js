import React from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const SingleAnalysisView = () => {
  const { id } = useParams();

  /* retreive analysis that corresponds the id in url path */
  const analysisListForm = useSelector(state =>
    state.analyses.filter(a => a.id === id)
  );
  const analysis = analysisListForm[0];

  /* return null if analysis not defined ie. if page is refreshed
  with this route */
  if(!analysis) return null;

  return (
    <div>
      <Link to={"/"}>
        <button> home page </button>
      </Link>
      <img src={analysis.stockLogoUrl}></img>
      <h1>{analysis.title}</h1>
      <p>{analysis.description}</p>
      {analysis.comments.map((comment, id) =>
        <p key={id}>{comment.content}</p>
      )}
    </div>
  );

};

export default SingleAnalysisView;