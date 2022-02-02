import React from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import CommentSection from "./CommentSection";
import AnalysisSection from "./AnalysisSection";
import { Grid, Segment } from "semantic-ui-react";

const SingleAnalysisView = () => {
  const { id } = useParams();

  /* Retreive analysis that corresponds to the id in url path */
  const analysis = useSelector((state) => state.analyses.find((a) => a.id === id));

  /* Return null if analysis is not defined ie. if the page is refreshed
  with current route or incorrect route is used. */
  if (!analysis) return null;

  return (
    <Segment style={{ padding: "1em" }} vertical>
      <Grid stackable container>
        <CommentSection analysis={analysis} id={id} />
        <AnalysisSection analysis={analysis} />
      </Grid>
    </Segment>
  );
};

export default SingleAnalysisView;
