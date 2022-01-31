import React from "react";
import { Message } from "semantic-ui-react";
import { useSelector } from "react-redux";

const Notification = () => {
  const notification = useSelector((state) => state.notification);

  if (notification.success || notification.error) {
    const positive = notification.success ? true : false;
    const negative = notification.error ? true : false;

    return (
      <div
        style={{
          margin: "auto",
          marginBottom: "1em",
          textAlign: "center"
        }}>
        <Message positive={positive} negative={negative} compact size="big">
          <Message.Header content={notification.success || notification.error} />
        </Message>
      </div>
    );
  }

  return null;
};

export default Notification;
