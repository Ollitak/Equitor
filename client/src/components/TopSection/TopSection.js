import React from "react";
import { Segment, Header } from "semantic-ui-react";
import NavigationBar from "./NavigationBar";

const TopSection = () => {
  return (
    <Segment
      inverted
      textAlign="center"
      style={{ borderRadius: 0, minHeight: 300, paddingTop: "1em", marginBottom: "1em" }}>
      <NavigationBar />
      <Header as="h1" content="Equitor" style={{ fontSize: "5em" }} />
      <Header
        as="h2"
        content="keep up with the stock market"
        style={{ fontSize: "2em", paddingBottom: "2em" }}
      />
    </Segment>
  );
};

export default TopSection;
