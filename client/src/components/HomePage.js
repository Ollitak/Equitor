import React from "react";
import { useHistory } from "react-router-dom";
import { Grid, Image, Header, Segment, Button, Divider } from "semantic-ui-react";

const placeholder =
  "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy.";

const HomePage = () => {
  const history = useHistory();

  return (
    <div>
      <Segment style={{ padding: "2em" }} vertical>
        <Grid stackable container verticalAlign="middle">
          <Grid.Row columns={2}>
            <Grid.Column width={7}>
              <Header as="h1" style={{ fontSize: "2.5em" }}>
                {"Equitor"}
              </Header>
              <p style={{ fontSize: "1.2em" }}>{placeholder}</p>
            </Grid.Column>
            <Grid.Column width={7} floated="right">
              <Image
                bordered
                rounded
                size="large"
                src="https://images.unsplash.com/photo-1529400971008-f566de0e6dfc?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"></Image>
            </Grid.Column>
          </Grid.Row>

          <Grid.Row columns={1}>
            <Grid.Column textAlign="center">
              <Button
                size="massive"
                color="black"
                content="Join now"
                onClick={() => history.push("/create-account")}
              />
            </Grid.Column>
          </Grid.Row>

          <Divider style={{ marginTop: "6em", marginBottom: "2em" }} />

          <Grid.Row columns={1}>
            <Grid.Column textAlign="center">
              <Header as="h1" style={{ fontSize: "2.5em", marginBottom: "1em" }}>
                Happy users
              </Header>
              <p style={{ fontSize: "1.2em", fontStyle: "italic" }}>
                {"' Best site for cathing up with the market '"}
              </p>
              <p style={{ fontSize: "1.2em", fontWeight: "bold" }}>Matti Meikäläinen</p>
            </Grid.Column>
          </Grid.Row>

          <Grid.Row columns={1} style={{ marginTop: "4em" }}>
            <Grid.Column textAlign="center">
              <p style={{ fontSize: "1.2em", fontStyle: "italic" }}>
                {"' Never seen anything like this '"}
              </p>
              <p style={{ fontSize: "1.2em", fontWeight: "bold" }}>Matti Teikäläinen</p>
            </Grid.Column>
          </Grid.Row>

          <Grid.Row columns={1} style={{ marginTop: "4em" }}>
            <Grid.Column textAlign="center">
              <p style={{ fontSize: "1.2em", fontStyle: "italic" }}>{"' Simply wow '"}</p>
              <p style={{ fontSize: "1.2em", fontWeight: "bold" }}>Matti Reikäläinen</p>
            </Grid.Column>
          </Grid.Row>

          <Divider style={{ marginTop: "5em", marginBottom: "5em" }} />

          <Grid.Row columns={2} style={{ marginBottom: "4em" }}>
            <Grid.Column width={7} floated="left">
              <Image
                bordered
                rounded
                size="large"
                src="https://images.unsplash.com/photo-1633158829585-23ba8f7c8caf?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"></Image>
            </Grid.Column>
            <Grid.Column width={8}>
              <Header as="h1" style={{ fontSize: "2.5em" }}>
                {"TBD"}
              </Header>
              <p style={{ fontSize: "1.2em" }}>{placeholder}</p>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>
      <Segment inverted style={{ borderRadius: 0, minHeight: 50, marginTop: "0" }}></Segment>
    </div>
  );
};

export default HomePage;
