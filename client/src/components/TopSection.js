import React from "react";
import "./TopSection.css";
import { useSelector, useDispatch } from "react-redux";
import { Segment, Button, Icon, Header } from "semantic-ui-react";
import { logout } from "../reducers/userReducer";
import { useHistory } from "react-router-dom";
import TopMenu from "./TopMenu";

const OnLoggedIn = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  return(
    <Button.Group vertical compact size='huge'>
      <Button color="olive" inverted onClick={() => history.push("create-analysis")}>
        Create analysis
      </Button>
      <Button color="olive" inverted onClick={() => history.push("my-analyses")}>
        My analyses
      </Button>
      <Button color="olive" inverted onClick={() => dispatch(logout())}>
         Log out
      </Button>
    </Button.Group>
  );
};

const OnLoggedOut = () => {
  const history = useHistory();

  return(
    <Button.Group vertical compact size='huge'>
      <Button color="olive" inverted onClick={() => history.push("login")}>
        Log in
        <Icon name="right arrow" />
      </Button>
      <Button color="olive" inverted onClick={() => history.push("login")}>
        Create account
      </Button>
    </Button.Group>
  );
};


const TopSection = () => {
  const user = useSelector(state => state.user);

  return(
    <Segment
      inverted
      textAlign="center"
      style={{ minHeight: 500, paddingBottom: "4em" }}
    >
      <TopMenu />
      <Header
        as="h1"
        content="Equiter"
        style={{ fontSize: "5em" }}
      />
      <Header
        as="h2"
        content="all you need to know about equities"
        style={{ fontSize: "2em", paddingTop: "2em", paddingBottom: "2em" }}
      />
      {user ? <OnLoggedIn/> : <OnLoggedOut />}
    </Segment>

  /*<div className={"image-container"}>
      <div className={"content-container"}>
        <div className={"top-text-container"}>
          <p>{text}</p>
        </div>
        {user ? <OnLoggedIn/> : <OnLoggedOut />}
      </div>
    </div>*/
  );

};

export default TopSection;