import React from "react";
import { Feed, Rating, Grid } from "semantic-ui-react";

/* Conditionally render date in the feed: if analysis posted <1 hour ago, render 'under hour ago',
else render hour amount */
const PostedAgo = ({ postedAgo }) => {
  if (postedAgo === 0) {
    return <Feed.Date style={{ color: "white" }}>under an hour ago </Feed.Date>;
  } else if (postedAgo <= 24) {
    return <Feed.Date style={{ color: "white" }}>{postedAgo} hours ago </Feed.Date>;
  } else {
    const days = parseInt(postedAgo / 24);
    return <Feed.Date style={{ color: "white" }}>{days} days ago </Feed.Date>;
  }
};

/* Component to render feed information, such as who posted the analysis, when it was posted and
what is the average rating of the analysis. */
const FeedContent = ({ analysis }) => {
  return (
    <Feed.Content>
      <Feed.Summary style={{ color: "white" }}>
        <Feed.User as="p" style={{ color: "rgb(100, 180, 250)" }}>
          {analysis.user.username}
        </Feed.User>
        {` posted a new analysis on ${analysis.stockInformation.name}`}
      </Feed.Summary>
      <Feed.Meta>
        <PostedAgo postedAgo={analysis.postedAgo} />
        <Rating
          style={{ marginLeft: "0em", marginTop: "0.5em" }}
          disabled
          defaultRating={analysis.averageRating}
          maxRating={5}
        />
        {/* Keywords are mapped in a grid row. */}
        <Grid style={{ marginLeft: "0em" }}>
          <Grid.Row>
            {analysis.keyWords.map((keyWord, id) => {
              return (
                <div
                  key={id}
                  style={{
                    backgroundColor: "black",
                    borderRadius: "2em",
                    margin: "0.3em",
                    padding: "0.7em"
                  }}>
                  <p style={{ fontWeight: "bold", color: "white", fontSize: "1em" }}>{keyWord}</p>
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
