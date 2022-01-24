import React from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
//import CommentForm from "./CommentForm";
import {
  Grid,
  Header,
  Segment,
  Label,
  Image
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


        <Grid.Column width={4} verticalAlign="center">
          <Grid.Row columns={1} style={{ marginBottom:"1.5em" }}>
            <Grid.Column>
              <Segment vertical >
                <Header dividing as="h3" style={{ fontSize:"1.5em" }}>Equity name</Header>
                <Image verticalAlign="middle" size="small" src={analysis.stockInformation.logoUrl}/>
              </Segment>
            </Grid.Column>
          </Grid.Row>

          <Grid.Row columns={1} style={{ marginBottom:"1.5em" }}>
            <Grid.Column>
              <Segment vertical>
                <Header dividing as="h3" style={{ fontSize:"1.5em" }}>Analysis by</Header>
                <Header as="h3" color="blue" style={{ fontSize:"1.5em" }}>StockWizard</Header>
              </Segment>
            </Grid.Column>
          </Grid.Row>

          <Grid.Row columns={1} style={{ marginBottom:"1.5em" }}>
            <Grid.Column>
              <Segment vertical>
                <Header dividing as="h3" style={{ fontSize:"1.5em" }}>Recommendation</Header>
                <Label color="green" size="huge">BUY</Label>
              </Segment>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row columns={1}>
            <Grid.Column>
              <Segment vertical>
                <Header dividing as="h3" style={{ fontSize:"1.5em" }}>Target price</Header>
                <Label tag color="black" size="huge"> € {analysis.stockPriceEstimate}</Label>
              </Segment>
            </Grid.Column>
          </Grid.Row>
        </Grid.Column>


        <Grid.Column width={12}>
          <Header as="h1" style={{ fontSize:"2.5em" }}>{analysis.title}</Header>
          <p style={{ fontSize:"1.2em" }}>{analysis.description}</p>
        </Grid.Column>





      </Grid>
    </Segment>
  );

};

export default SingleAnalysisView;