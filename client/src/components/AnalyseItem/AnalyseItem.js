import React from "react";
import { useHistory } from "react-router-dom";
import { deleteAnalysis } from "../../reducers/analysisReducer";
import { useDispatch } from "react-redux";
import FeedContent from "./FeedContent";
import Buttons from "./Buttons";
import { Feed, Segment } from "semantic-ui-react";

const AnalyseItem = ({ analysis, myPage }) => {
  const history = useHistory();
  const dispatch = useDispatch();


  /* Determine how many hours ago the analysis was posted */
  const postedAgo = getAgo(analysis.date);

  /* Determine the average of given ratings */
  const averageRating = getAverageRating(analysis.comments);


  const removeItem = async (id) => {
    dispatch(deleteAnalysis(id));
  };

  const moveToSingleView = () => {
    history.push(`analysis/${analysis.id}`);
  };

  return(
    <Segment style={{ margin: "auto", marginBottom:"1em", background:"white", maxWidth:600 }}>
      <Feed>
        <Feed.Event>
          <FeedContent analysis={analysis} postedAgo={postedAgo} averageRating={averageRating} />
          <Buttons moveToSingleView={moveToSingleView} removeItem={removeItem} myPage={myPage} />
        </Feed.Event>
      </Feed>
    </Segment>
  );
};

const getAverageRating = (comments) => {
  if(!comments || comments.length===0) return 0;
  const average = comments.reduce((acc, comment) => acc + comment.rating, 0) / comments.length;
  return average;
};

/* This ugly function parses the date when analysis was posted and
 returs time difference between that date and today in hours  */
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
   36e5 is notation for 60*60*1000 */
  return Math.trunc(Math.abs(today - postedOn)/36e5);
};



export default AnalyseItem;