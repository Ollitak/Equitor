import React from "react";
import {
  Grid,
  Image,
  Header,
  Segment,
  Button
} from "semantic-ui-react";

const placeholder = "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy.";

const HomePage = () => {
  return(
    <div>
      <Segment style={{ padding:"2em" }} vertical>
        <Grid stackable container verticalAlign='middle'>
          <Grid.Row columns={2}>
            <Grid.Column width={7}>
              <Header as="h1" style={{ fontSize:"2.5em" }}> Equiter</Header>
              <p style={{ fontSize:"1.2em" }}>{placeholder}</p>
            </Grid.Column>
            <Grid.Column width={7} floated="right">
              <Image bordered rounded size="large" src="https://images.unsplash.com/photo-1529400971008-f566de0e6dfc?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"></Image>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row columns={1}>
            <Grid.Column verticalAlign="middle center">
              <Button size="massive" color="black">Join now</Button>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row columns={1} style={{ marginTop:"4em" }}>
            <Grid.Column verticalAlign="middle center">
              <Header as="h1" style={{ fontSize:"2.5em", marginBottom:"1em" }}> Happy customers</Header>
              <p style={{ fontSize: "1.2em", fontStyle:"italic" }}>{"' Best site for cathing up with the market '"}</p>
              <p style={{ fontSize: "1.2em", fontWeight:"bold" }}>Matti Meikäläinen, CEO</p>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>
    </div>
  );
};

export default HomePage;
