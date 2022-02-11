import React from "react";
import { useHistory } from "react-router-dom";
import { Grid, Image, Divider } from "semantic-ui-react";
import "./styles/homePage.css";

const text1 =
  "Equitor is an application that lets users to create equity analyses on Finnish publicly listed stocks for other users to view, comment and rate.";

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
    <div className="hp">
      <Grid stackable container verticalAlign="middle">
        <Grid.Row columns={2}>
          <Grid.Column width={7}>
            <h1 className="hp-header">Equitor</h1>
            <p className="hp-desc">{text1}</p>
            <p className="hp-desc">{text2}</p>
            <p className="hp-desc">{text3}</p>
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
            <button className="hp-join-button" onClick={() => history.push("/create-account")}>
              JOIN NOW
            </button>
          </Grid.Column>
        </Grid.Row>

        <Divider className="hp-divider" />

        <Grid.Row>
          <Grid.Column width={7} floated="left">
            <Image
              bordered
              rounded
              size="large"
              src="https://images.unsplash.com/photo-1633158829585-23ba8f7c8caf?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"></Image>
          </Grid.Column>
          <Grid.Column width={9}>
            <h1 className="hp-header">About the project</h1>
            <p className="hp-desc">{text4}</p>
            <p className="hp-desc">{text5}</p>
          </Grid.Column>
        </Grid.Row>

        <Divider className="hp-divider" />

        <Grid.Row columns={1}>
          <Grid.Column textAlign="center">
            <h1 className="hp-header">Happy users</h1>
            <Divider hidden className="hp-divider-quotes" />
            <p className="hp-quote">Best site for cathing up with the market</p>
            <p className="hp-quoter">Matti Meikäläinen</p>
          </Grid.Column>
        </Grid.Row>

        <Divider hidden className="hp-divider-quotes" />

        <Grid.Row columns={1}>
          <Grid.Column textAlign="center">
            <p className="hp-quote">Never seen anything like this</p>
            <p className="hp-quoter">Matti Teikäläinen</p>
          </Grid.Column>
        </Grid.Row>

        <Divider hidden className="hp-divider-quotes" />

        <Grid.Row columns={1}>
          <Grid.Column textAlign="center">
            <p className="hp-quote">Simply wow</p>
            <p className="hp-quoter">Matti Reikäläinen</p>
          </Grid.Column>
        </Grid.Row>

        <Divider className="hp-divider" />
      </Grid>
    </div>
  );
};

export default HomePage;
