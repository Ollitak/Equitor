import React from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
//import CommentForm from "./CommentForm";
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

const SummaryInformation = ({ analysis }) => {
  return (
    <Grid.Column width={4} verticalAlign="center">
      <Grid.Row columns={1} style={{ marginBottom:"1.5em" }}>
        <Grid.Column>
          <Segment vertical >
            <Header dividing as="h3" style={{ fontSize:"1.5em" }}>Equity</Header>
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
  );

};
const AnalysisSection = ({ analysis }) => {
  return(
    <Grid.Row>
      <SummaryInformation analysis={analysis} />
      <Grid.Column width={12}>
        <Header as="h1" style={{ fontSize:"2.5em" }}>{analysis.title}</Header>
        <p style={{ fontSize:"1.2em" }}>{analysis.description}</p>
      </Grid.Column>
    </Grid.Row>
  );
};

const CommentSection = ({ analysis }) => {
  return(
    <Feed>
      <Grid.Row columns={1} style={{ marginTop:"2em" }}>
        <Grid.Column>
          <Divider
            as='h4'
            className='header'
            horizontal
            style={{ margin: "3em 0em", textTransform: "uppercase" }}
          >
            <a>Comments</a>
          </Divider>
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
                  <Rating disabled size="tiny" icon="star" defaultRating="2" maxRating="4" />
                  <Feed.Extra>
                    {comment.content}
                  </Feed.Extra>
                  <Feed.Meta>
                  </Feed.Meta>
                </Feed.Content>
              </Feed.Event>
            );
          })}
        </Grid.Column>
      </Grid.Row>
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
        <CommentSection analysis={analysis} />
      </Grid>
    </Segment>
  );
};

export default SingleAnalysisView;