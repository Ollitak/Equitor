import React from "react";
import FeedContent from "./FeedContent";
import Buttons from "./Buttons";
import { Feed, Segment } from "semantic-ui-react";

/* Renders two components:
FeedContent to show information about the analysis such as who posted it and
when it was posted, and Buttons, which enables entering single analysis view.  */
const FeedItem = ({ analysis, myPage }) => {
  return (
    <Segment
      style={{
        margin: "auto",
        marginBottom: "1em",
        background: "white",
        maxWidth: 600,
        backgroundColor: "rgb(48, 48, 48)",
        border: "1px solid rgb(88, 88, 88)"
      }}>
      <Feed>
        <Feed.Event>
          <FeedContent analysis={analysis} />
          <Buttons analysis={analysis} myPage={myPage} />
        </Feed.Event>
      </Feed>
    </Segment>
  );
};

export default FeedItem;
