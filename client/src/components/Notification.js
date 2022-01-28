import React from "react";
import { Message } from "semantic-ui-react";
import { useSelector } from "react-redux";

const Notification = () => {
  const notification = useSelector(state => state.notification);

  if(notification.success || notification.error) {
    return (
      <div style={{
        margin:"auto",
        marginBottom:"1em",
        textAlign:"center"
      }}>
        <Message
          positive={notification.success}
          negative={notification.error}
          compact
          size="big">
          <Message.Header content={notification.success || notification.error}/>
        </Message>
      </div>
    );
  }

  return null;
};

export default Notification;

