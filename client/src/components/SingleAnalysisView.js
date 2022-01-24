import React from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import CommentForm from "./CommentForm";
import {
  Grid,
  Header,
  Segment,
  Label,
  Image,
  Divider,
  Feed,
  Icon,
  Rating
} from "semantic-ui-react";


/* Presents summary component on the left and analysis header + analysis content
on the right. */
const AnalysisSection = ({ analysis }) => {
  return(
    <Grid.Row>
      <SummarySection analysis={analysis} />
      <TextSection analysis={analysis}/>
    </Grid.Row>
  );
};

/*
1) Summary
2) Basic company information
3) Business description
4) Industry overview and competitive positioning
5) Investment Summary
6) Financial analysis
7) Valuation
8) Investment risks
9) ESG matters
*/
const TextSection = ({ analysis }) => {
  return (
    <Grid.Column width={12}>
      <Header as="h1" style={{ fontSize:"2.5em" }}>{analysis.title}</Header>
      <p style={{ fontSize:"1.2em" }}>{analysis.description}</p>
    </Grid.Column>
  );
};

/* Presents general information on the left side, such as company name, user that
made the analysis, recommendation and target price. Constructed as Semantic UI
column with multiple rows. */
const SummarySection = ({ analysis }) => {
  return (
    <Grid.Column width={4} verticalAlign="center">
      <Grid.Row columns={1} style={{ marginBottom:"1.5em" }}>
        <Grid.Column>
          <Segment vertical>
            <Header dividing as="h3" style={{ fontSize:"1.5em" }}>Equity</Header>
            <Image verticalAlign="middle" size="small" src={analysis.stockInformation.logoUrl}/>
          </Segment>
        </Grid.Column>
      </Grid.Row>
      <Grid.Row columns={1} style={{ marginBottom:"1.5em" }}>
        <Grid.Column>
          <Segment vertical>
            <Header dividing as="h3" style={{ fontSize:"1.5em" }}>Analysis by</Header>
            <Header as="h3" color="blue" style={{ fontSize:"1.5em" }}>{analysis.user.username}</Header>
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
            <Label tag color="black" size="huge"> € {analysis.targetPrice}</Label>
          </Segment>
        </Grid.Column>
      </Grid.Row>
    </Grid.Column>
  );
};

/* Contains structure for comment section. Section is constructed as new grid row
that includes divider, comment form and comment feed */
const CommentSection = ({ analysis ,id }) => {
  return(
    <Grid.Row columns={1} style={{ marginTop:"2em", marginBottom:"4em" }}>
      <Grid.Column>
        <Divider
          as='h4'
          className='header'
          horizontal
          style={{ margin: "3em 0em", textTransform: "uppercase" }}
        >
          <a>Comments</a>
        </Divider>
        <CommentForm id={id} />
        <CommentFeed analysis={analysis} />
      </Grid.Column>
    </Grid.Row>
  );
};

/* Presents comment feed. Constructed as Semantic Ui Feed component. */
const CommentFeed = ({ analysis }) => {
  return (
    <Feed>
      {analysis.comments.map((comment, id) => {
        return (
          <Feed.Event key={id} style={{ marginBottom: "1em" }}>
            <Feed.Label>
              <Icon name="comment" color="grey"></Icon>
            </Feed.Label>
            <Feed.Content>
              <Feed.Date>4 days ago</Feed.Date>
              <Feed.Summary>
                        Commented and rated by <a>{comment.user.username}</a>
              </Feed.Summary>
              <Rating disabled size="tiny" icon="star" defaultRating={comment.rating} maxRating="5" />
              <Feed.Extra>
                {comment.content}
              </Feed.Extra>
              <Feed.Meta>
              </Feed.Meta>
            </Feed.Content>
          </Feed.Event>
        );
      })}
    </Feed>
  );
};

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
        <AnalysisSection analysis={analysis} />
        <CommentSection analysis={analysis} id={id} />
      </Grid>
    </Segment>
  );
};

export default SingleAnalysisView;