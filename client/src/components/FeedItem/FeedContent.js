import React from "react";
import { Feed, Rating, Grid } from "semantic-ui-react";

/* Component to render feed information, such as who posted the analysis, when it was posted and
what is the average rating of the analysis. */
const FeedContent = ({ analysis }) => {
  return (
    <Feed.Content>
      <Feed.Summary>
        <Feed.User>{analysis.user.username}</Feed.User>
        {` posted a new analysis on ${analysis.stockInformation.name}`}
      </Feed.Summary>
      <Feed.Meta>
        {/* Conditionally render date in the feed: if analysis posted <1 hour ago, render 'under hour ago',
              else render hour amount */}
        { analysis.postedAgo === 0
          ?<Feed.Date>under hour ago </Feed.Date>
          :<Feed.Date>{analysis.postedAgo} hours ago </Feed.Date>
        }
        <Rating style={{ marginLeft: "0em", marginTop:"0.5em" }} disabled defaultRating={analysis.averageRating} maxRating={5} />
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

export default FeedContent;