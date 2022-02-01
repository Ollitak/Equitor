import React from "react";
import { useHistory } from "react-router-dom";
import { Grid, Image, Header, Segment, Button, Divider } from "semantic-ui-react";

const text1 =
  "Equitor is an application that allows users to create equity analyses on Finnish publicly listed stocks for other users to view, comment and rate.";

const text2 =
  "When it comes to equity investing, equity research has a key role in making the buy or sell decision of a stock. Generally, equity research is a close study of company's business environment covering areas such as industry overview, market conditions, competitive positioning, financial analysis and valuation. However, despite its importance, external equity research is generally conducted by large corporations and is hardly available for regular stock investors due to the price tags.  ";

const text3 =
  "Equitor aims to be the platform that gathers individual investors together to share knowledge and help eachother to make more informed investment decisions. Anyone can participate by either sharing their own research or commenting and rating analyses made by others.";

const text4 =
  "Application is built as a project work for fullstackopen course (fullstackopen.com). Course is an extensive introduction to modern JavaScript based web development. Some of the key technologies covered in the course include React, Redux, Node.js, MongoDB, GraphQL and TypeScript. In the project, student is adviced to create an application of his/her choice with the tools covered in the course content. The chosen topic relates to my previous profession as an investment banker.";

const text5 = "Application front-end is built with React and back-end with Node.";

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
              <p style={{ fontSize: "1.2em" }}>{text1}</p>
              <p style={{ fontSize: "1.2em" }}>{text2}</p>
              <p style={{ fontSize: "1.2em" }}>{text3}</p>
            </Grid.Column>
            <Grid.Column width={8} floated="right">
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
                style={{
                  width: "10em",
                  height: "3em",
                  marginTop: "2em",
                  backgroundColor: "rgb(10, 40, 230)",
                  color: "white"
                }}
                size="massive"
                content="Join now"
                onClick={() => history.push("/create-account")}
              />
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
            <Grid.Column width={9}>
              <Header as="h1" style={{ fontSize: "2.5em" }}>
                {"About the project"}
              </Header>
              <p style={{ fontSize: "1.2em" }}>{text4}</p>
              <p style={{ fontSize: "1.2em" }}>{text5}</p>
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

          <Grid.Row columns={1} style={{ marginTop: "4em", marginBottom: "10em" }}>
            <Grid.Column textAlign="center">
              <p style={{ fontSize: "1.2em", fontStyle: "italic" }}>{"' Simply wow '"}</p>
              <p style={{ fontSize: "1.2em", fontWeight: "bold" }}>Matti Reikäläinen</p>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>
      <Segment inverted style={{ borderRadius: 0, minHeight: 50, marginTop: "0" }}></Segment>
    </div>
  );
};

export default HomePage;
