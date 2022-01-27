import React from "react";
import { Feed, Rating, Grid } from "semantic-ui-react";

/* Component to render feed information, such as who posted the analysis, when it was posted and
what is the average rating of the analysis. */
const FeedContent = ({ analysis }) => {
  /* Determine how many hours ago the analysis was posted */
  const postedAgo = getAgo(analysis.date);

  /* Determine the average of given ratings. */
  const averageRating = getAverageRating(analysis.comments);

  return (
    <Feed.Content>
      <Feed.Summary>
        <Feed.User>{analysis.user.username}</Feed.User>
        {` posted a new analysis on ${analysis.stockInformation.name}`}
      </Feed.Summary>
      <Feed.Meta>
        {/* Conditionally render date in the feed: if analysis posted <1 hour ago, render 'under hour ago',
              else render hour amount */}
        { postedAgo === 0
          ?<Feed.Date>under hour ago </Feed.Date>
          :<Feed.Date>{postedAgo} hours ago </Feed.Date>
        }
        <Rating style={{ marginLeft: "0em", marginTop:"0.5em" }} disabled defaultRating={averageRating} maxRating={5} />
        {/* keywords are mapped in a grid row */}
        <Grid style={{ marginLeft: "0em" }}>
          <Grid.Row>
            {analysis.keyWords.map((keyWord, id) => {
              return (
                <div key={id} style={{ backgroundColor:"black", borderRadius:"2em",  margin:"0.3em", padding:"0.7em" }}>
                  <p style={{ fontWeight:"bold", color:"white", fontSize:"1em" }}>{keyWord}</p>
                </div>
              );
            })}
          </Grid.Row>
        </Grid>
      </Feed.Meta>
    </Feed.Content>
  );
};

const getAverageRating = (comments) => {
  if(!comments || comments.length===0) return 0;
  const average = comments.reduce((acc, comment) => acc + comment.rating, 0) / comments.length;
  return average;
};

/* Function to return hour difference between post date and date now */
const getAgo = (unparsedDate) => {
  const postedOn = new Date(unparsedDate);
  const today = new Date();
  /* The subtraction returns the difference between the two dates in milliseconds.
   36e5 is notation for 60*60*1000. */
  return Math.trunc(Math.abs(today - postedOn)/36e5);
};

export default FeedContent;