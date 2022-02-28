import React from "react";
import { Link } from "react-router-dom";
import { Rating } from "semantic-ui-react";
import Buttons from "./Buttons";
import "./styles/feedItem.css";

/** Component to render how long ago the analysis was posted. */

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

/** Component that a single feed item within the Feed page. FeedItem includes information such as
 *  who posted the analysis, what is the analysis name, what is its average rating and how long
 *  ago it was posted. Clicking the single feed item routes the user to the single analysis view.
 *
 *  In addition, the component conditionally renders Button component based on the current route.
 *  If the current route is myPage, only the user's own analyses are visible and buttons allow
 *  user to delete an analysis.
 */

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
