import React from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import CommentSectionModal from "./CommentSectionModal";
import { SummarySection, TextSection } from "./AnalysisSection";
import { Grid, Header, Divider, Segment } from "semantic-ui-react";

const SingleAnalysisView = () => {
  const { id } = useParams();

  /* Retreive analysis that corresponds to the id in url path */
  const analysis = useSelector((state) => state.analyses.find((a) => a.id === id));

  /* Return null if analysis is not defined ie. if the page is refreshed
  with current route or incorrect route is used. */
  if (!analysis) return null;

  return (
    <Segment>
      <Grid stackable container style={{ margin: 0, backgroundColor: "rgb(235, 235, 235)" }}>
        <Grid.Row>
          <Header
            as="h1"
            style={{
              fontSize: "3em",
              width: "100%",
              textAlign: "center",
              marginTop: "1em",
              fontWeight: "bold",
              fontFamily: "Courier New"
            }}>
            {analysis.title}
          </Header>
        </Grid.Row>

        <Divider horizontal>report published by {analysis.user.username}</Divider>

        <SummarySection analysis={analysis} />

        <TextSection analysis={analysis} />

        <CommentSectionModal analysis={analysis} id={id} />
      </Grid>
    </Segment>
  );
};

export default SingleAnalysisView;
