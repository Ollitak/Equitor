import React from "react";
import CommentForm from "./CommentForm";
import {
  Grid,
  Divider,
  Feed,
  Icon,
  Rating
} from "semantic-ui-react";

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

export default CommentSection;