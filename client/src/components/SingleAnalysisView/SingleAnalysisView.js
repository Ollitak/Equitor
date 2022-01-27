import React from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import CommentSection from "./CommentSection";
import AnalysisSection from "./AnalysisSection";
import {
  Grid,
  Segment,
} from "semantic-ui-react";


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
    <Segment style={{ padding:"1em" }} vertical>
      <Grid stackable container>
        <CommentSection analysis={analysis} id={id} />
        <AnalysisSection analysis={analysis} />
      </Grid>
    </Segment>
  );
};

export default SingleAnalysisView;