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
        <Header as="h2" textAlign="center">
          No one has yet commented, log in and be the first!
        </Header>
      );
    } else {
      return (
        <Header as="h2" textAlign="center">
          Log in to leave your comment
        </Header>
      );
    }
  } else if (owner) {
    if (analysis.comments.length === 0) {
      return (
        <Header as="h2" textAlign="center">
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
          <Header as="h2" textAlign="center">
            No one has yet commented, be the first!
          </Header>
          <CommentForm id={id} />
        </div>
      );
    } else {
      return <CommentForm id={id} />;
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
              <Icon name="comment" color="grey"></Icon>
            </Feed.Label>
            <Feed.Content>
              <Feed.Date>X days ago</Feed.Date>
              <Feed.Summary>Commented and rated by {comment.user.username}</Feed.Summary>
              <Rating
                disabled
                size="tiny"
                icon="star"
                defaultRating={comment.rating}
                maxRating="5"
              />
              <Feed.Extra content={comment.content} />
              <Feed.Meta></Feed.Meta>
            </Feed.Content>
          </Feed.Event>
        );
      })}
    </Feed>
  );
};

/* Renders button that opens modal for comments. Modal is constructed with two componets:
CommentWrite renders form for writing comments and second renders the comment feed. */
const CommentSection = ({ analysis, id }) => {
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
            backgroundColor: "white",
            color: "black",
            border: "1px solid black",
            height: "3em",
            width: "100%",
            marginBottom: "1em"
          }}
        />
      }
      size="small"
      centered={false}>
      <Modal.Header>Comments & Ratings</Modal.Header>

      <Modal.Content scrolling>
        <CommentWrite analysis={analysis} id={id} />
        <CommentFeed analysis={analysis} />
      </Modal.Content>

      <Modal.Actions>
        <Button
          onClick={() => setModalOpen(false)}
          style={{ backgroundColor: "red", color: "white" }}>
          <Icon name="remove" />
          Close
        </Button>
      </Modal.Actions>
    </Modal>
  );
};

export default CommentSection;
