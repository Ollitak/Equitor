import React, { useState } from "react";
import CommentForm from "./CommentForm";
import { Modal, Button, Feed, Icon, Rating, Header } from "semantic-ui-react";
import { useSelector } from "react-redux";

/* Form is hidden if either user hasn't logged in or analysis is posted by current user
 (can't comment own posts). */
const CommentWrite = ({ analysis, id }) => {
  const user = useSelector((state) => state.user);

  /* Indicates whether the analysis is posted by currently logged user */
  var owner = false;
  if (user && analysis.user.id === user.id) owner = true;

  /* This ugly if else structure handles all rendering scenarious if based on if the user has or
   hasn't logged in and if the user is the original author of the post. */
  if (!user) {
    if (analysis.comments.length === 0) {
      return (
        <Header as="h2" textAlign="center" style={{ color: "white", fontFamily: "Courier New" }}>
          No one has yet commented, log in and be the first!
        </Header>
      );
    } else {
      return (
        <Header as="h2" textAlign="center" style={{ color: "white", fontFamily: "Courier New" }}>
          Log in to leave your comment
        </Header>
      );
    }
  } else if (owner) {
    if (analysis.comments.length === 0) {
      return (
        <Header as="h2" textAlign="center" style={{ color: "white", fontFamily: "Courier New" }}>
          Your analysis has not yet been commented
        </Header>
      );
    } else {
      return <></>;
    }
  } else {
    if (analysis.comments.length === 0) {
      return (
        <div>
          <Header as="h2" textAlign="center" style={{ color: "white", fontFamily: "Courier New" }}>
            No one has yet commented, be the first!
          </Header>
          <CommentForm id={id} />
        </div>
      );
    } else {
      return (
        <div>
          <Header as="h2" textAlign="center" style={{ color: "white", fontFamily: "Courier New" }}>
            WRITE A COMMENT
          </Header>
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
              <Feed.Summary style={{ color: "white" }}>
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
      trigger={
        <Button
          content="Comments and ratings"
          style={{
            backgroundColor: "rgb(38, 38, 38)",
            color: "white",
            border: "2px inset white",
            height: "3em",
            width: "100%",
            borderRadius: 0,
            margin: "2em"
          }}
        />
      }
      size="small"
      centered={false}>
      <Modal.Header
        style={{
          color: "white",
          backgroundColor: "rgb(18, 18, 18)",
          borderBottom: "1px solid white",
          fontFamily: "Courier New"
        }}>
        Comments & Ratings
      </Modal.Header>

      <Modal.Content scrolling style={{ color: "white", backgroundColor: "rgb(48, 48, 48)" }}>
        <CommentWrite analysis={analysis} id={id} />
        <CommentFeed analysis={analysis} />
      </Modal.Content>

      <Modal.Actions
        style={{
          color: "white",
          backgroundColor: "rgb(18, 18, 18)",
          borderTop: "1px solid white"
        }}>
        <Button
          onClick={() => setModalOpen(false)}
          style={{ backgroundColor: "red", color: "white", fontFamily: "Courier New" }}>
          <Icon name="remove" />
          Close
        </Button>
      </Modal.Actions>
    </Modal>
  );
};

export default CommentSectionModal;
