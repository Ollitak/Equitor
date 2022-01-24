import React from "react";
import "./TopSection.css";
import { Segment, Header } from "semantic-ui-react";

import NavigationBar from "./NavigatioBar";

/*
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
*/

const TopSection = () => {
  return(
    <Segment
      inverted
      textAlign="center"
      style={{ minHeight: 300, paddingTop: "1em" }}
    >
      <NavigationBar />
      <Header
        as="h1"
        content="Equiter"
        style={{ fontSize: "5em" }}
      />
      <Header
        as="h2"
        content="all you need to know about equities"
        style={{ fontSize: "2em", paddingTop: "1em", paddingBottom: "2em" }}
      />
    </Segment>
  );

};

export default TopSection;