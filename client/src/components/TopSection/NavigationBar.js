import React from "react";
import { Menu } from "semantic-ui-react";
import { useHistory, useLocation } from "react-router-dom";
import { logout } from "../../reducers/userReducer";
import { useSelector, useDispatch } from "react-redux";

const OnLoggedIn = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  const path = location.pathname;

  return (
    <Menu stackable inverted pagination pointing secondary size="massive" >
      <Menu.Item onClick={() => history.push("/feed")} active={path==="/feed"}>Feed</Menu.Item>
      <Menu.Item onClick={() => history.push("/my-analyses")} active={path==="/my-analyses"}>My analyses</Menu.Item>
      <Menu.Item onClick={() => history.push("/create-analysis")} active={path==="/create-analysis"}>Create analysis</Menu.Item>
      <Menu.Item onClick={() => dispatch(logout())}>Log out</Menu.Item>
    </Menu>
  );
};

const OnLoggedOut = () => {
  const history = useHistory();
  const location = useLocation();
  const path = location.pathname;

  return (
    <Menu stackable inverted pagination pointing secondary size="massive" >
      <Menu.Item onClick={() => history.push("/")} active={path==="/"}>Home</Menu.Item>
      <Menu.Item onClick={() => history.push("/feed")} active={path==="/feed"}>Feed</Menu.Item>
      <Menu.Item onClick={() => history.push("/login")} active={path==="/login"}>Log in</Menu.Item>
      <Menu.Item onClick={() => history.push("/create-account")} active={path==="/create-account"}>Create Account</Menu.Item>
    </Menu>
  );

};

/* Conditionally render navigation bar based on whether user has logged in */
const NavigationBar = () => {
  const user = useSelector(state => state.user);
  return user ? <OnLoggedIn /> : <OnLoggedOut />;
};

export default NavigationBar;