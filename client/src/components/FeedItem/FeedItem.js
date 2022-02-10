import React from "react";
import { Link } from "react-router-dom";
import { Rating } from "semantic-ui-react";
import Buttons from "./Buttons";
import "./styles/feedItem.css";

/* Conditionally render date in the feed: if analysis posted <1 hour ago, render 'under hour ago',
else render hour amount */
const PostedAgo = ({ postedAgo }) => {
  if (postedAgo < 1) {
    return <h2 className="feed-item-ago">UNDER AN HOUR AGO</h2>;
  } else if (postedAgo <= 24) {
    return <h2 className="feed-item-ago">{Math.trunc(postedAgo)} HOURS AGO</h2>;
  } else {
    const days = parseInt(postedAgo / 24);
    return <h2 className="feed-item-ago">{Math.trunc(days)} DAYS AGO</h2>;
  }
};

/* Renders two components:
FeedContent to show information about the analysis such as who posted it and
when it was posted, and Buttons, which enables entering single analysis view.  */
const FeedItem = ({ analysis, myPage }) => {
  return (
    <div className="feed-item-wrapper">
      <Link to={`analysis/${analysis.id}`}>
        <div className="feed-item-container">
          <h1 className="feed-item-user">{analysis.user.username}</h1>
          <h1 className="feed-item-subline">POSTED A NEW ANALYSIS ON</h1>
          <h1 className="feed-item-stockname">{analysis.stockInformation.name}</h1>
          <PostedAgo postedAgo={analysis.postedAgo} />
          <Rating disabled defaultRating={analysis.averageRating} maxRating={5} />
          <p className="feed-item-rating-text">{`BASED ON ${analysis.comments.length} RATINGS`}</p>
          {/* Keywords are mapped in a grid row. */}
          <div className="feed-item-keywords-container">
            {analysis.keyWords.map((keyWord, id) => {
              return (
                <div key={id} className="feed-item-keyword">
                  <p className="feed-item-keyword-content">{keyWord}</p>
                </div>
              );
            })}
          </div>
        </div>
      </Link>
      {myPage && <Buttons analysis={analysis} />}
    </div>
  );
};

export default FeedItem;
