import React from "react";
import { Segment, Header } from "semantic-ui-react";
import NavigationBar from "./NavigationBar";

const TopSection = () => {
  return (
    <Segment
      inverted
      textAlign="center"
      style={{
        borderRadius: 0,
        minHeight: 300,
        paddingTop: "1em",
        marginBottom: "1em"
      }}>
      <NavigationBar />
      <Header as="h1" content="EQUITOR" style={{ fontSize: "5em", fontFamily: "Courier New" }} />
      <Header
        as="h2"
        content="< keep up with the stock market >"
        style={{
          fontSize: "1.5em",
          marginTop: 0,
          paddingBottom: "2em",
          fontFamily: "Courier New",
          fontStyle: "italic"
        }}
      />
    </Segment>
  );
};

export default TopSection;
