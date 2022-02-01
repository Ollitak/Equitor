import React, { useState } from "react";
import CommentForm from "./CommentForm";
import { Modal, Button, Feed, Icon, Rating } from "semantic-ui-react";

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
first renders form for writing comments and second renders the comment feed. Form is hidden
if analysis is posted by current user ie. you cannot comment your own posts. Also, form is 
hidden if no user has logged in. */
const CommentSection = ({ analysis, id, owner, user }) => {
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
        {!owner && user ? <CommentForm id={id} /> : null}
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
