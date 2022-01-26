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

/* This ugly function parses the date when analysis was posted and
 returs time difference between that date and today in hours.  */
const getAgo = (unparsedDate) => {
  const dateAndTime = unparsedDate.split(":");
  const postDate = dateAndTime[0];
  const postTime = dateAndTime[1];
  const splittedDate = postDate.split("-");
  const dateAndHours = splittedDate[2].split("T");
  const splittedTime = postTime.split(":");

  const year = splittedDate[0];
  /* JavaScript counts months from 0 to 11 */
  const month = splittedDate[1]-1;
  const day = dateAndHours[0];
  /*Database has times in GMT+0 timezone, whereas Finland is in GMT+2.
  For now, just add +2 hours to dates retreived from database. For sure,
  not a good practice. */
  const hour = parseInt(dateAndHours[1])+2;
  const minute = splittedTime[0];

  const postedOn = new Date(year, month, day, hour, minute);
  const today = new Date();
  /* The subtraction returns the difference between the two dates in milliseconds.
   36e5 is notation for 60*60*1000. */
  return Math.trunc(Math.abs(today - postedOn)/36e5);
};

export default FeedContent;