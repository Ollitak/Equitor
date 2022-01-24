import React from "react";
import { Menu } from "semantic-ui-react";
import { useHistory } from "react-router-dom";
import { logout } from "../reducers/userReducer";
import { useDispatch } from "react-redux";

const TopMenu = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  return (
    <Menu inverted pagination pointing secondary size="massive" >
      <Menu.Item inverted as="a" active>Home</Menu.Item>
      <Menu.Item  onClick={() => history.push("my-analyses")}>My analyses</Menu.Item>
      <Menu.Item onClick={() => history.push("create-analysis")}>Create analysis</Menu.Item>
      <Menu.Item inverted onClick={() => dispatch(logout())}>Log out</Menu.Item>
    </Menu>
  );
};

export default TopMenu;