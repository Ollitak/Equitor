import React from "react";
import { Message } from "semantic-ui-react";
import { useSelector } from "react-redux";

const Notification = () => {
  const notification = useSelector(state => state.notification);

  if(notification.success) {
    return (
      <div style={{
        margin:"auto",
        marginBottom:"1em",
        textAlign:"center"
      }}>
        <Message positive compact size="big">
          <Message.Header content={notification.success}/>
        </Message>
      </div>
    );
  }
  if(notification.error){
    return (
      <div style={{
        margin:"auto",
        marginBottom:"1em",
        textAlign:"center"
      }}>
        <Message negative compact size="big">
          <Message.Header content={notification.error}/>
        </Message>
      </div>
    );
  }

  return null;
};

export default Notification;

