import React from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import CommentForm from "./CommentForm";

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
      <h2>Comments</h2>
      {analysis.comments.map((comment, id) =>
        <div key={id}>
          <p>{comment.content}</p>
          <p>{comment.user.username}</p>
          <p>{comment.rating}</p>
          <br />
        </div>
      )}
      <h2>Write a comment</h2>
      <CommentForm id={id} />
    </div>
  );

};

export default SingleAnalysisView;