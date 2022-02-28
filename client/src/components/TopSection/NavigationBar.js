import React from "react";
import { Menu } from "semantic-ui-react";
import { useHistory, useLocation } from "react-router-dom";
import { logout } from "../../reducers/userReducer";
import { useSelector, useDispatch } from "react-redux";

/** Component to render navigation bar if user is logged in.
 *  Navigation bar currently has options for the following routes:
 * - About page (general app information)
 * - Feed page
 * - My analyses page (shows analyses of currently logged user)
 * - Create analysis page
 * - User information page
 */

const OnLoggedIn = ({ user }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  const path = location.pathname;

  const logOut = () => {
    if (window.confirm("Are you sure you want to log out?")) {
      history.push("/home");
      dispatch(logout());
    }
  };

  return (
    <Menu stackable inverted pointing secondary size="massive">
      <Menu.Item onClick={() => history.push("/")} active={path === "/"}>
        About Equitor
      </Menu.Item>
      <Menu.Item onClick={() => history.push("/feed")} active={path === "/feed"}>
        Feed
      </Menu.Item>
      <Menu.Item onClick={() => history.push("/my-analyses")} active={path === "/my-analyses"}>
        My analyses
      </Menu.Item>
      <Menu.Item
        onClick={() => history.push("/create-analysis")}
        active={path === "/create-analysis"}>
        Create analysis
      </Menu.Item>
      <Menu.Item onClick={() => history.push("/my-account")} active={path === "/my-account"}>
        {user.username}
      </Menu.Item>
      <Menu.Item onClick={logOut}>Log out</Menu.Item>
    </Menu>
  );
};

/** Component to render navigation bar if user is logged out.
 *  Navigation bar currently has options for the following routes:
 * - About page (general app information)
 * - Feed page
 * - Login page
 * - Create accounnt page
 */

const OnLoggedOut = () => {
  const history = useHistory();
  const location = useLocation();
  const path = location.pathname;

  return (
    <Menu stackable inverted pointing secondary size="massive">
      <Menu.Item onClick={() => history.push("/")} active={path === "/"}>
        About Equitor
      </Menu.Item>
      <Menu.Item onClick={() => history.push("/feed")} active={path === "/feed"}>
        Feed
      </Menu.Item>
      <Menu.Item onClick={() => history.push("/login")} active={path === "/login"}>
        Log in
      </Menu.Item>
      <Menu.Item
        onClick={() => history.push("/create-account")}
        active={path === "/create-account"}>
        Create Account
      </Menu.Item>
    </Menu>
  );
};

/** Component renders navigation bar conditionally based on whether user has logged in. */

const NavigationBar = () => {
  const user = useSelector((state) => state.user);
  return user ? <OnLoggedIn user={user} /> : <OnLoggedOut />;
};

export default NavigationBar;
