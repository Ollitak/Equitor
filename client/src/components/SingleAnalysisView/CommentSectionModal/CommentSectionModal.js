import React, { useState } from "react";
import CommentForm from "./CommentForm";
import { Modal, Feed, Icon, Rating } from "semantic-ui-react";
import { useSelector } from "react-redux";

import "./styles/commentSectionModal.css";

/* Form is hidden if either user hasn't logged in or analysis is posted by current user
 (can't comment own posts). */
const DisplayCommentForm = ({ analysis, id }) => {
  const user = useSelector((state) => state.user);

  /* Indicates whether the analysis is posted by currently logged user */
  var owner = false;
  if (user && analysis.user.id === user.id) owner = true;

  /* This ugly if else structure handles all rendering scenarious if based on if the user has or
   hasn't logged in and if the user is the original author of the post. */
  if (!user) {
    if (analysis.comments.length === 0) {
      return (
        <h1 className="cs-form-header cs-form-header-centered">
          No comments yet. Log in and leave the first comment!
        </h1>
      );
    } else {
      return (
        <h1 className="cs-form-header cs-form-header-centered">Log in and leave your comment!</h1>
      );
    }
  } else if (owner) {
    if (analysis.comments.length === 0) {
      return (
        <h1 className="cs-form-header cs-form-header-centered">
          Your analysis has not yet been commented!
        </h1>
      );
    } else {
      return <></>;
    }
  } else {
    if (analysis.comments.length === 0) {
      return (
        <div className="cs-form-container">
          <h1 className="cs-form-header">No comments yet. You can be the first one to comment!</h1>
          <CommentForm id={id} />
        </div>
      );
    } else {
      return (
        <div className="cs-form-container">
          <h1 className="cs-form-header">WRITE A NEW COMMENT</h1>
          <CommentForm id={id} />
        </div>
      );
    }
  }
};

/* Presents comment feed. Constructed with Semantic Ui Feed component. */
const CommentFeed = ({ analysis }) => {
  return (
    <Feed>
      {analysis.comments.map((comment, id) => {
        return (
          <Feed.Event key={id} style={{ marginBottom: "1em" }}>
            <Feed.Label>
              <Icon name="comment" style={{ color: "white" }}></Icon>
            </Feed.Label>
            <Feed.Content>
              <Feed.Summary style={{ color: "white", marginBottom: "5px" }}>
                Commented and rated by {comment.user.username}
              </Feed.Summary>
              <Rating
                disabled
                size="tiny"
                icon="star"
                defaultRating={comment.rating}
                maxRating="5"
              />
              <Feed.Extra content={comment.content} style={{ color: "white" }} />
            </Feed.Content>
          </Feed.Event>
        );
      })}
    </Feed>
  );
};

/* Renders button that opens modal for comments. Modal is constructed with two componets:
CommentWrite renders form for writing comments and second renders the comment feed. */
const CommentSectionModal = ({ analysis, id }) => {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <Modal
      open={modalOpen}
      onOpen={() => setModalOpen(true)}
      onClose={() => setModalOpen(false)}
      trigger={<button className="sav-left-button">COMMENTS & RATINGS</button>}
      size="large">
      <div className="cs">
        <div className="cs-wrapper">
          <div className="cs-header"> COMMENTS & RATINGS</div>
          <DisplayCommentForm analysis={analysis} id={id} />
          <Modal.Content scrolling>
            <CommentFeed analysis={analysis} />
          </Modal.Content>
        </div>
      </div>
    </Modal>
  );
};

export default CommentSectionModal;
