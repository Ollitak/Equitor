import React from "react";
import FeedContent from "./FeedContent";
import Buttons from "./Buttons";
import { Feed, Segment } from "semantic-ui-react";

const AnalyseItem = ({ analysis, myPage }) => {
  return(
    <Segment style={{ margin: "auto", marginBottom:"1em", background:"white", maxWidth:600 }}>
      <Feed>
        <Feed.Event>
          <FeedContent analysis={analysis} />
          <Buttons analysis={analysis} myPage={myPage} />
        </Feed.Event>
      </Feed>
    </Segment>
  );
};

export default AnalyseItem;